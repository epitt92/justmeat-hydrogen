import { useState } from 'react'
import { json, redirect } from '@shopify/remix-oxygen'
import { useLoaderData } from '@remix-run/react'
import { getPaginationVariables } from '@shopify/hydrogen'
import {
  getSubscription,
  listBundleSelections,
  updateBundleSelection,
  listCharges,
  processCharge,
  updateSubscriptionChargeDate,
} from '@rechargeapps/storefront-client'

import { CustomBundle } from '~/containers/CustomBundle'
import { CustomBundleContext } from '~/contexts'
import { rechargeQueryWrapper } from '~/lib/rechargeUtils'
import { ALL_PRODUCTS_QUERY } from '~/graphql/Product'
import { SubscriptionEditLayout } from '~/containers/Account/Subscriptions/Edit/Layout'

export const meta = ({ data }) => {
  return [
    {
      title: `Subscription ${data?.subscription?.product_title}${
        data?.subscription?.variant_title
          ? ` (${data?.subscription?.variant_title})`
          : ''
      }`,
    },
  ]
}

export async function loader({ request, context, params }) {
  const { storefront } = context

  const allProductsHandler = 'all-products'
  const freeProductHandler = 'raspberry-bbq-chicken-breast'
  const bonusProductHandler = 'free-meat-unlocked-at-125'

  const variables = getPaginationVariables(request, { pageBy: 50 })

  const {
    products: { nodes: allProducts },
  } = await storefront.query(ALL_PRODUCTS_QUERY, {
    variables: {
      ...variables,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  })

  const freeProduct = allProducts.find(
    (product) => product.handle === freeProductHandler,
  )
  const bonusProduct = allProducts.find(
    (product) => product.handle === bonusProductHandler,
  )

  const products = allProducts
    .filter((product) =>
      product.collections.edges.some(
        (collection) => collection.node.handle === allProductsHandler,
      ),
    )
    .filter(
      (product) => Number(product.priceRange.minVariantPrice.amount) !== 0,
    )

  if (!params.id) {
    return redirect(params?.locale ? `${params.locale}/account` : '/account')
  }

  const subscription = await rechargeQueryWrapper(
    (session) =>
      getSubscription(session, params.id, {
        include: ['address'],
      }),
    context,
  )

  const { bundle_selections } = await rechargeQueryWrapper(
    (session) => listBundleSelections(session, params.id),
    context,
  )

  const bundle = bundle_selections.find(
    (el) => el.purchase_item_id === Number(params.id),
  )

  const bundleId = bundle.id
  const purchase_item_id = bundle.purchase_item_id
  const bundleItems = bundle.items

  const { charges } = await rechargeQueryWrapper(
    (session) =>
      listCharges(session, {
        limit: 10,
        purchase_item_id,
        customer_id: subscription.customer_id,
        scheduled_at_min: new Date().toISOString(),
        sort_by: 'scheduled_at-desc',
        status: ['queued', 'skipped', 'error'],
      }),
    context,
  )

  const upcomingChargeId = charges[0]?.id

  const idsSubscriptions = []
  const subscriptionData = {}

  let subscriptionProducts = []

  for (const el of bundleItems) {
    const idsSubscriptionItems = el.external_product_id
    const subscriptionId = `gid://shopify/Product/${idsSubscriptionItems}`
    idsSubscriptions.push(subscriptionId)
    subscriptionData[subscriptionId] = el.quantity
  }

  for (const el of allProducts) {
    if (idsSubscriptions.includes(el.id)) {
      if (
        el.handle !== freeProductHandler &&
        el.handle !== bonusProductHandler
      ) {
        const quantity = subscriptionData[el.id]

        const amount = el.priceRange?.maxVariantPrice?.amount
        const totalAmount = (amount * quantity).toFixed(2)

        const bindQuantityObject = {
          ...el,
          quantity,
          amount,
          totalAmount,
        }
        subscriptionProducts.push(bindQuantityObject)
      }
    }
  }

  const bonusItemInBundle = bundleItems.find(
    (el) =>
      `gid://shopify/Product/${el.external_product_id}` === bonusProduct.id,
  )
  const bonusItemVariantId = `gid://shopify/ProductVariant/${bonusItemInBundle?.external_variant_id}`
  const subscriptionBonusVariant = bonusItemInBundle
    ? bonusProduct.variants.nodes.find((el) => el.id === bonusItemVariantId)
    : null

  if (!subscription) {
    throw new Response('Subscription not found', { status: 404 })
  }

  return json(
    {
      id: params.id,
      bundleId,
      purchase_item_id,
      products,
      bonusProduct,
      subscription,
      charges,
      freeProduct,
      subscriptionProducts,
      subscriptionBonusVariant,
      upcomingChargeId,
      shopCurrency: 'USD',
    },
    {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Set-Cookie': await context.rechargeSession.commit(),
      },
    },
  )
}

export async function action({ request, context }) {
  const form = await request.formData()
  const data = JSON.parse(form.get('body'))

  const api = data.api

  switch (api) {
    case 'update-bundle':
      const bundleId = data.bundleId
      const purchase_item_id = data.purchase_item_id
      const products = data.products

      const items = products.map((product) => ({
        collection_id: '424769257698',
        collection_source: 'shopify',
        external_product_id: product.id.split('gid://shopify/Product/')[1],
        external_variant_id: product.variants.nodes[0].id.split(
          'gid://shopify/ProductVariant/',
        )[1],
        quantity: product.quantity,
      }))

      await rechargeQueryWrapper(
        (session) =>
          updateBundleSelection(session, bundleId, {
            purchase_item_id,
            items,
          }),
        context,
      )

      return json({ msg: 'ok' })

    case 'process-charge':
      const chargeId = data.chargeId

      await rechargeQueryWrapper(
        (session) => processCharge(session, chargeId),
        context,
      )

      return json({ msg: 'ok' })

    case 'delay-subscription':
      const date = data.date
      const subscriptionId = data.subscriptionId

      await rechargeQueryWrapper(
        (session) =>
          updateSubscriptionChargeDate(session, subscriptionId, date),
        context,
      )

      return json({ msg: 'ok' })

    default:
      break
  }
}

export default function SubscriptionRoute() {
  const { subscriptionProducts, subscriptionBonusVariant } = useLoaderData()

  const [selectedProducts, setSelectedProducts] = useState(subscriptionProducts)
  const [bonusVariant, setBonusVariant] = useState(subscriptionBonusVariant)
  const [sellingPlan, setSellingPlan] = useState('')
  const [sellingPlanFrequency, setSellingPlanFrequency] = useState('')

  const totalCost = selectedProducts.reduce(
    (acc, curr) => acc + parseFloat(curr.totalAmount),
    0,
  )

  return (
    <CustomBundleContext.Provider
      value={{
        fromOrder: false,
        sellingPlan,
        setSellingPlan,
        selectedProducts,
        setSelectedProducts,
        sellingPlanFrequency,
        setSellingPlanFrequency,
        bonusVariant,
        setBonusVariant,
        totalCost,
      }}
    >
      <SubscriptionEditLayout>
        <CustomBundle />
      </SubscriptionEditLayout>
    </CustomBundleContext.Provider>
  )
}
