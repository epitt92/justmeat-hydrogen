import { useContext, useEffect } from 'react'

import {
  cancelSubscription,
  getSubscription,
  listBundleSelections,
  listCharges,
  processCharge,
  sendCustomerNotification,
  updateBundleSelection,
  updateSubscriptionChargeDate,
} from '@rechargeapps/storefront-client'
import { useLoaderData } from '@remix-run/react'
import { json, redirect } from '@shopify/remix-oxygen'

import { SubscriptionEditLayout } from '~/containers/Account/Subscriptions/Edit/Layout'
import { CustomBundle } from '~/containers/CustomBundle'
import { RootContext } from '~/contexts'
import { rechargeQueryWrapper } from '~/lib/rechargeUtils'
import { getBundle } from '~/lib/storefront'
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

export const loader = async ({ request, context, params }) =>
  await rechargeQueryWrapper(async (rechargeSession) => {
    if (!params.id) {
      return redirect(params?.locale ? `${params.locale}/account` : '/account')
    }

    const discountCode = context.session.get('discountCode')
    const discountCodes = discountCode ? [discountCode] : []

    const bundleData = getBundle({
      request,
      context,
    })

    const rechargeSubscriptionData = getSubscription(
      rechargeSession,
      params.id,
      {
        include: ['address'],
      },
    )

    const bundleSelectionsData = listBundleSelections(
      rechargeSession,
      params.id,
    )

    const [
      { products, allProducts, freeProduct, bonusProduct },
      subscription,
      { bundle_selections },
    ] = await Promise.all([
      bundleData,
      rechargeSubscriptionData,
      bundleSelectionsData,
    ])

    const bundle = bundle_selections.find(
      (el) => el.purchase_item_id === Number(params.id),
    )

    if (!bundle) {
      throw new Response('Not a bundle subscription', { status: 404 })
    }

    if (!subscription) {
      throw new Response('Subscription not found', { status: 404 })
    }

    const bundleId = bundle.id
    const purchase_item_id = bundle.purchase_item_id
    const bundleItems = bundle.items

    const { charges } = await listCharges(rechargeSession, {
      limit: 10,
      purchase_item_id,
      customer_id: rechargeSession.customerId,
      scheduled_at_min: new Date().toISOString(),
      sort_by: 'scheduled_at-desc',
      status: ['queued', 'skipped', 'error'],
    })

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
        if (
          el.handle !== context.env.PUBLIC_FREE_PRODUCT_HANDLE &&
          el.handle !== context.env.PUBLIC_BONUS_PRODUCT_HANDLE
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
      (el) => getFullId(el.external_product_id, 'Product') === bonusProduct.id,
    )
    const bonusItemVariantId = getFullId(
      bonusItemInBundle?.external_variant_id,
      'ProductVariant',
    )
    const subscriptionBonusVariant = bonusItemInBundle
      ? bonusProduct.variants.nodes.find((el) => el.id === bonusItemVariantId)
      : null

    subscriptionProducts = subscriptionProducts.filter(
      (product) => Number(product.priceRange.minVariantPrice.amount) !== 0,
    )

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
  }, context)

export async function action({ request, context, params }) {
  const form = await request.formData()
  const body = JSON.parse(form.get('body'))

  const { api, ...data } = body

  switch (api) {
    case 'update-bundle':
      const bundleId = data.bundleId
      const purchase_item_id = data.purchase_item_id
      const products = data.products

      const { collection } = await getBundle({ request, context })

      const bundleCollectionId = getPureId(collection.id, 'Collection')

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

    case 'send-update-payment-email':
      const { address_id, payment_method_id } = data

      await rechargeQueryWrapper(
        (session) =>
          sendCustomerNotification(session, 'SHOPIFY_UPDATE_PAYMENT_INFO', {
            address_id,
            payment_method_id,
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
