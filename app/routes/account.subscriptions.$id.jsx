import { useContext, useEffect } from 'react'

import {
  cancelSubscription,
  getSubscription,
  listBundleSelections,
  listCharges,
  processCharge,
  updateBundleSelection,
  updateSubscriptionChargeDate,
} from '@rechargeapps/storefront-client'
import { useLoaderData } from '@remix-run/react'
import { getPaginationVariables } from '@shopify/hydrogen'
import { json, redirect } from '@shopify/remix-oxygen'

import { SubscriptionEditLayout } from '~/containers/Account/Subscriptions/Edit/Layout'
import { CustomBundle } from '~/containers/CustomBundle'
import { RootContext } from '~/contexts'
import { COLLECTION_QUERY } from '~/graphql/Collection'
import { rechargeQueryWrapper } from '~/lib/rechargeUtils'
import {
  bonusProductHandle,
  bundleCollectionHandle,
  freeProductHandle,
  getBundle,
} from '~/lib/storefront'
import { getFullId, getPureId } from '~/lib/utils'

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
  const discountCode = context.session.get('discountCode')
  const discountCodes = discountCode ? [discountCode] : []

  const { products, allProducts, freeProduct, bonusProduct } = await getBundle({
    storefront,
    request,
  })

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
    const subscriptionId = getFullId(el.external_product_id, 'Product')
    idsSubscriptions.push(subscriptionId)
    subscriptionData[subscriptionId] = el.quantity
  }

  for (const el of allProducts) {
    if (idsSubscriptions.includes(el.id)) {
      if (el.handle !== freeProductHandle && el.handle !== bonusProductHandle) {
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
    (el) => getFullId(el.external_product_id, 'Product') === bonusProduct.id,
  )
  const bonusItemVariantId = getFullId(
    bonusItemInBundle?.external_variant_id,
    'ProductVariant',
  )
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
      discountCodes,
    },
    {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Set-Cookie': await context.rechargeSession.commit(),
      },
    },
  )
}

export async function action({ request, context, params }) {
  const storefront = context.storefront
  const form = await request.formData()
  const data = JSON.parse(form.get('body'))

  const api = data.api

  switch (api) {
    case 'update-bundle':
      const bundleId = data.bundleId
      const purchase_item_id = data.purchase_item_id
      const products = data.products
      const variables = getPaginationVariables(request, { pageBy: 1 })

      const { collection: bundleCollection } = await storefront.query(
        COLLECTION_QUERY,
        {
          variables: {
            ...variables,
            handle: bundleCollectionHandle,
            country: storefront.i18n.country,
            language: storefront.i18n.language,
          },
        },
      )

      const bundleCollectionId = getPureId(bundleCollection.id, 'Collection')

      const items = products.map((product) => ({
        collection_id: bundleCollectionId,
        collection_source: 'shopify',
        external_product_id: getPureId(product.id, 'Product'),
        external_variant_id: getPureId(
          product.variants.nodes[0].id,
          'ProductVariant',
        ),
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

      await rechargeQueryWrapper(
        (session) =>
          updateSubscriptionChargeDate(session, Number(params.id), date),
        context,
      )

      return json({ msg: 'ok' })

    case 'cancel-subscription':
      await rechargeQueryWrapper(
        (session) =>
          cancelSubscription(session, Number(params.id), {
            cancellation_reason: 'Do not want it anymore.',
            send_email: true,
          }),
        context,
      )

      return json({ msg: 'ok' })

    default:
      break
  }
}

export default function SubscriptionRoute() {
  const { setSubscriptionProducts, setSubscriptionBonusVariant } =
    useContext(RootContext)
  const { subscriptionProducts, subscriptionBonusVariant } = useLoaderData()

  useEffect(() => {
    setSubscriptionProducts(subscriptionProducts)
    setSubscriptionBonusVariant(subscriptionBonusVariant)
  }, [])

  return (
    <SubscriptionEditLayout>
      <CustomBundle />
    </SubscriptionEditLayout>
  )
}
