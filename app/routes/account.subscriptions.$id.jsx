import { json, redirect } from '@shopify/remix-oxygen'
import { NavLink, useLoaderData, Form } from '@remix-run/react'
import { Money, getPaginationVariables } from '@shopify/hydrogen'
import {
  getActiveChurnLandingPageURL,
  getSubscription,
  listBundleSelections,
  skipCharge,
  skipSubscriptionCharge,
} from '@rechargeapps/storefront-client'

import { CustomBundle } from '~/containers/CustomBundle'
import { rechargeQueryWrapper } from '~/lib/rechargeUtils'
import { ALL_PRODUCTS_QUERY, PRODUCT_QUERYTT } from '~/graphql/Product'

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

  const products = allProducts.filter((product) =>
    product.collections.edges.some(
      (collection) => collection.node.handle === allProductsHandler,
    ),
  )

  const freeProduct = allProducts.find(
    (product) => product.handle === freeProductHandler,
  )
  const bonusProduct = allProducts.find(
    (product) => product.handle === bonusProductHandler,
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

  const subscriptionProducts = await rechargeQueryWrapper(
    (session) => listBundleSelections(session, params.id),
    context,
  )

  if (!subscription) {
    throw new Response('Subscription not found', { status: 404 })
  }

  const cancelUrl = await rechargeQueryWrapper(
    (session) => getActiveChurnLandingPageURL(session, params.id, request.url),
    context,
  )

  // const skipshipment = await rechargeQueryWrapper(
  //   (session) => skipSubscriptionCharge(session, params.id, '2024-04-29'),
  //   context,
  // )

  const { product } = await storefront.query(PRODUCT_QUERYTT, {
    variables: {
      id: `gid://shopify/Product/${subscription.external_variant_id.ecommerce}`,
    },
  })

  return json(
    {
      subscription,
      product,
      products,
      bonusProduct,
      freeProduct,
      cancelUrl,
      // skipshipment,
      subscriptionProducts,
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

const Heading = () => {
  return (
    <div className="relative flex justify-center items-center mt-[36px] mb-[30px]">
      <NavLink
        end
        prefetch="intent"
        className="absolute left-0 py-[5px] px-[30px] border-2 border-[#425B34] border-solid bg-white"
        to="/account"
      >
        Back to Account
      </NavLink>
      <h3 className="text-4xl font-bold">Customize Your Order</h3>
    </div>
  )
}

const Timeframe = () => {
  return (
    <div className="flex gap-2 my-5">
      <NavLink
        end
        prefetch="intent"
        className="py-[5px] px-[30px] border-2 border-[#425B34] border-solid bg-white"
        to=""
      >
        Process Now
      </NavLink>
      <NavLink
        end
        prefetch="intent"
        className="py-[5px] px-[30px] border-2 border-[#425B34] border-solid bg-white"
        to=""
      >
        1 Week Delay
      </NavLink>
    </div>
  )
}

export default function SubscriptionRoute() {
  const {
    subscription,
    product,
    cancelUrl,
    shopCurrency,
    bonuses,
    collection,
    subscriptionProducts,
  } = useLoaderData()

  return (
    <div className="w-full flex flex-col justify-center items-center bg-[#eeeeee]">
      <div className="container mb-10 custom-collection-wrap">
        <Heading />
        <hr className="border border-black border-solid" />
        <Timeframe />
        <CustomBundle />
        <div className="my-5">
          {subscription.status === 'active' && (
            <div className="mt-10 mb-10">
              <a
                className="py-[12px] px-[20px] border border-black border-solid bg-white"
                target="_self"
                href={cancelUrl}
                rel="noreferrer"
              >
                Cancel Subscription
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
