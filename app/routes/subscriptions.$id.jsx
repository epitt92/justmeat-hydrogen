// import clsx from 'clsx';
import { json, redirect } from '@shopify/remix-oxygen'
import { NavLink, useLoaderData } from '@remix-run/react'
import { Money, getPaginationVariables } from '@shopify/hydrogen'
import {
  getActiveChurnLandingPageURL,
  getSubscription,
  listBundleSelections,
  skipCharge,
  skipSubscriptionCharge,
} from '@rechargeapps/storefront-client'

import CustomCollection from '~/containers/Order/CustomCollection'
import { rechargeQueryWrapper } from '~/lib/rechargeUtils'
import SubscriptionCollection from '~/containers/Order/SubscriptionCollection'

export const meta = ({ data }) => {
  return [
    {
      title: `Subscription ${data?.subscription?.product_title}${data?.subscription?.variant_title
        ? ` (${data?.subscription?.variant_title})`
        : ''
        }`,
    },
  ]
} 

export async function loader({ request, context, params }) {
  const handle = 'all-products'
  const { storefront } = context
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 15,
  })

  if (!handle) {
    return redirect('/collections')
  }

  const { collection } = await storefront.query(COLLECTION_QUERY, {
    variables: { handle, ...paginationVariables },
  })

  const {
    collection: { products: bonuses },
  } = await storefront.query(COLLECTION_QUERY, {
    variables: { handle: 'free-bonus-meat', ...paginationVariables },
  })

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    })
  }

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

  const { product } = await storefront.query(PRODUCT_QUERYTT, {
    variables: {
      id: `gid://shopify/Product/${subscription.external_variant_id.ecommerce}`,
    },
  })

  return json(
    {
      collection,
      subscription,
      product,
      bonuses,
      cancelUrl,
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


const Navigation = () => {
  return(
    <div className='w-full flex justify-center py-5 bg-white'>
      <NavLink end prefetch="intent" className="px-[20px] " to="/account">Subscriptions</NavLink>
      <NavLink end prefetch="intent" className="px-[20px] " to="/account">Order History</NavLink>
      <NavLink end prefetch="intent" className="px-[20px] " to="/account">Account Details</NavLink>
      <NavLink end prefetch="intent" className="px-[20px] " to="/account">Logout</NavLink>
    </div>
  )
}

const Heading = () => {
  return (
    <div className='flex items-center my-5'>
      <NavLink end prefetch="intent" className="py-[12px] px-[20px] border border-black border-solid bg-white" to="/account">Back to Account</NavLink>
      <h3>Customize Your Order</h3>
    </div>
  )
}

const Timeframe = () => {
  return(
    <div className='flex my-5'>
      <NavLink end prefetch="intent" className="py-[12px] px-[20px]  border border-black border-solid bg-white mr-2" to="">Process Now</NavLink>
      <NavLink end prefetch="intent" className="py-[12px] px-[20px]  border border-black border-solid bg-white mr-2" to="">1 Week Delay</NavLink>
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
    skipshipment,
    collection,
    subscriptionProducts,
  } = useLoaderData()
  const address = subscription.include?.address
  const customCollectionProducts = collection.products
  console.log("skipshipment")
  console.log(skipshipment);

  console.log('customCollectionProducts++')
  return (
    <div className='w-full flex flex-col justify-center items-center bg-[#eeeeee]'>
      <Navigation />
      <div className="max-w-[1200px] w-[100%] custom-collection-wrap mb-10">
        {/* <CustomCollection
          col={customCollectionProducts}
          subproduct={subscriptionProducts}
        /> */}
        <Heading />
        <hr className='border border-black border-solid' />
        <Timeframe />
        <SubscriptionCollection />
        <div className='my-5'>
          {subscription.status === 'active' && (
            <div className='mt-10 mb-10'>
              <a className='text-[12px] text-[#FF0000] font-semibold uppercase py-2 w-fit px-5 border border-[#949494] ' target="_self" href={cancelUrl} rel="noreferrer">
                Cancel Subscription
              </a>
              <a className='text-[12px] text-[#FF0000] font-semibold uppercase py-2 w-fit px-5 border border-[#949494] ' target="_self" href={skipshipment} rel="noreferrer">
                Skip Subscription
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
`

const PRODUCT_QUERYTT = `#graphql
  query getProductById($id: ID!) {
    product(id: $id) {
      id
      handle
    }
  }
`

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    options {
      name
      values
    }
    selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    variants(first: 1) {
      nodes {
        ...ProductVariant
      }
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
`

const PRODUCT_VARIANTS_FRAGMENT = `#graphql
  fragment ProductVariants on Product {
    variants(first: 250) {
      nodes {
        ...ProductVariant
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`

const VARIANTS_QUERY = `#graphql
  ${PRODUCT_VARIANTS_FRAGMENT}
  query ProductVariants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...ProductVariants
    }
  }
`

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('@remix-run/react').FetcherWithComponents} FetcherWithComponents */
/** @typedef {import('storefrontapi.generated').ProductFragment} ProductFragment */
/** @typedef {import('storefrontapi.generated').ProductVariantsQuery} ProductVariantsQuery */
/** @typedef {import('storefrontapi.generated').ProductVariantFragment} ProductVariantFragment */
/** @typedef {import('@shopify/hydrogen').VariantOption} VariantOption */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').CartLineInput} CartLineInput */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').SelectedOption} SelectedOption */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */

// custom collection qusery

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    description
    images(first: 100) {
      nodes {
        altText
        height
        url
        width
      }
    }
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    variants(first: 1) {
      nodes {
        id
        selectedOptions {
          name
          value
        }
      }
    }
  }
`

const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
`

const METAFIELDS_QUERY = `#graphql
  query Metafields($productId: ID!) {
    node(id: $productId) {
      ... on Product {
        metafields(first: 10) {
          edges {
            node {
              namespace
              key
              value
            }
          }
        }
      }
    }
  }
`
