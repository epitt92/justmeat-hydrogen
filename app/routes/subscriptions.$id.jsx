// import clsx from 'clsx';
import { json, redirect } from '@shopify/remix-oxygen'
import { useLoaderData } from '@remix-run/react'
import { Money, getPaginationVariables } from '@shopify/hydrogen'
import {
  getActiveChurnLandingPageURL,
  getSubscription,
  listBundleSelections,
} from '@rechargeapps/storefront-client'

// import { Link, Heading, PageHeader, Text, Button } from '~/components';
import Link from '../components/Link'
import Heading from '../components/Heading'
import Text from '~/components/Text'
import Button from '~/components/Button'
import CustomCollection from '~/containers/Order/CustomCollection'

import { rechargeQueryWrapper } from '~/lib/rechargeUtils'
// import { CACHE_NONE } from '~/data/cache';

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
    (session) =>
    listBundleSelections(session, params.id),
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

export default function SubscriptionRoute() {
  const { subscription, product, cancelUrl, shopCurrency, collection, subscriptionProducts } = useLoaderData()
  const address = subscription.include?.address
  const customCollectionProducts = collection.products
  console.log(customCollectionProducts);
  console.log("customCollectionProducts");
  return (
    <div className='w-full flex flex-col justify-center items-center'>
          <div className="max-w-[1440px] w-[100%] custom-collection-wrap">
            <CustomCollection col={customCollectionProducts} subproduct={subscriptionProducts} />
          </div>
      <div className='hidden'>
        <div heading="Subscription detail">
          <Link to="/account">
            <Text color="subtle">Return to Account Overview</Text>
          </Link>
        </div>
        <div className="w-full p-6 sm:grid-cols-1 md:p-8 lg:p-12 lg:py-6">
          <div>
            <Text as="h3" size="lead">
              Subscription No. {subscription.id}
            </Text>
            <Text className="mt-2" as="p">
              Placed on {new Date(subscription.created_at).toDateString()}
            </Text>
            <div className="grid items-start gap-12 sm:grid-cols-1 md:grid-cols-4 md:gap-16 sm:divide-y sm:divide-gray-200">
              <table className="min-w-full my-8 divide-y divide-gray-300 md:col-span-3">
                <thead>
                  <tr className="align-baseline ">
                    <th scope="col" className="pb-4 pl-0 pr-3 font-semibold text-left">
                      Product
                    </th>
                    <th scope="col" className="hidden px-4 pb-4 font-semibold text-right sm:table-cell md:table-cell">
                      Price
                    </th>
                    <th scope="col" className="hidden px-4 pb-4 font-semibold text-right sm:table-cell md:table-cell">
                      Quantity
                    </th>
                    <th scope="col" className="px-4 pb-4 font-semibold text-right">
                      Frequency
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="w-full py-4 pl-0 pr-3 align-top sm:align-middle max-w-0 sm:w-auto sm:max-w-none">
                      <div className="flex gap-6">
                        <Link to={`/products/${product?.handle}`}>View Product</Link>
                        <div className="flex-col justify-center hidden lg:flex">
                          <Text as="p">{subscription.product_title}</Text>
                          {subscription.variant_title && (
                            <Text size="fine" className="mt-1" as="p">
                              {subscription.variant_title}
                            </Text>
                          )}
                        </div>
                        <dl className="grid">
                          <dt className="sr-only">Product</dt>
                          <dd className="truncate lg:hidden">
                            <Heading size="copy" format as="h3">
                              {subscription.product_title}
                            </Heading>
                            {subscription.variant_title && (
                              <Text size="fine" className="mt-1">
                                {subscription.variant_title}
                              </Text>
                            )}
                          </dd>
                          <dt className="sr-only">Price</dt>
                          <dd className="truncate sm:hidden">
                            <Text size="fine" className="mt-4">
                              <Money
                                data={{
                                  amount: subscription.price,
                                  currencyCode: subscription.presentment_currency ?? shopCurrency,
                                }}
                              />
                            </Text>
                          </dd>
                          <dt className="sr-only">Quantity</dt>
                          <dd className="truncate sm:hidden">
                            <Text className="mt-1" size="fine">
                              Qty: {subscription.quantity}
                            </Text>
                          </dd>
                        </dl>
                      </div>
                    </td>
                    <td className="hidden px-3 py-4 text-right align-top sm:align-middle sm:table-cell">
                      <Money
                        data={{
                          amount: subscription.price,
                          currencyCode: subscription.presentment_currency ?? shopCurrency,
                        }}
                      />
                    </td>
                    <td className="hidden px-3 py-4 text-right align-top sm:align-middle sm:table-cell">
                      {subscription.quantity}
                    </td>
                    <td className="px-3 py-4 text-right align-top sm:align-middle sm:table-cell">
                      <Text>
                        {`Every ${subscription.order_interval_frequency} ${subscription.order_interval_unit}(s)`}
                      </Text>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="sticky border-none top-nav md:my-8">
                <Heading size="copy" className="font-semibold" as="h3">
                  Address
                </Heading>
                {address ? (
                  <ul className="mt-6">
                    <li>
                      <Text>
                        {address.first_name && address.first_name + ' '}
                        {address.last_name}
                      </Text>
                    </li>
                    {address ? (
                      <>
                        <li>
                          <Text>{address.address1}</Text>
                        </li>
                        {address.address2 && (
                          <li>
                            <Text>{address.address2}</Text>
                          </li>
                        )}
                        <li>
                          <Text>
                            {address.city} {address.province} {address.zip} {address.country_code}
                          </Text>
                        </li>
                      </>
                    ) : (
                      <></>
                    )}
                  </ul>
                ) : (
                  <p className="mt-3">No address defined</p>
                )}
                <Heading size="copy" className="mt-8 font-semibold" as="h3">
                  Status
                </Heading>
                <div
                  className="mt-3 px-3 py-1 text-xs font-medium rounded-full inline-block w-auto bg-green-100 text-green-800">
                  <Text size="fine" className="uppercase">
                    {subscription.status}
                  </Text>
                </div>
              </div>
            </div>
          </div>
          {subscription.status === 'active' && (
            <Button as={Link} variant="secondary" to={cancelUrl}>
              Cancel Subscription
            </Button>
          )}
        </div>
      </div>

      <div className='hidden w-full flex justify-center items-center bg-[#eeeeee]'>
        <div className='w-11/12 mt-[75px] md:w-[80%] flex flex-col justify-center bg-[#eeeeee]'>
          <div className='w-full block md:flex text-center  justify-start pb-[20px] items-start border-b-2 border-slate-600'>
            <button className='text-base border-solid mb-1 border-2 border-lime-900 py-1 px-8 bg-white'>Back To Account</button>
            <h1 className='text-3xl font-semibold pb-3 text-[#252525] md:ml-[20%]'>Customize Your Order</h1>
          </div>
          <div className='w-full md:w-1/3 sm:mt-7 mb-6 block md:flex float-start items-start'>
            <button className='w-full md:w-1/2 mt-2 text-base mr-3 border-solid border-2 border-lime-900  bg-white py-2'>Process Now</button>
            <button className='w-full md:w-1/2 mt-2 text-base border-solid border-2 border-lime-900  bg-white py-2'>1 Week Delay</button>
          </div>
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
