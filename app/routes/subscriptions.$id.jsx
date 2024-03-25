// import clsx from 'clsx';
import { json, redirect } from '@shopify/remix-oxygen'
import { useLoaderData } from '@remix-run/react'
import { Money, getPaginationVariables } from '@shopify/hydrogen'
import {
  getActiveChurnLandingPageURL,
  getSubscription,
} from '@rechargeapps/storefront-client'

// import { Link, Heading, PageHeader, Text, Button } from '~/components';
import Link from '../components/Link'
import Heading from '../components/Heading'
import Text from '~/components/Text'
import Button from '~/components/Button'
import CustomCollection from '~/components/OrderComponents/CustomCollection'

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
  const { data, subscription, product, cancelUrl, shopCurrency } = useLoaderData()
  const address = subscription.include?.address
  console.log(data);
  // const customCollectionProducts = data.collection.products
  console.log("-+-+-+-");
  console.log(subscription);
  return (
    <div className='w-full flex flex-col justify-center items-center'>
          <div className="custom-collection-wrap">
            {/* <CustomCollection col={customCollectionProducts} /> */}
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

      <div className='w-full flex justify-center items-center bg-[#eeeeee]'>
        <div className='w-11/12 mt-[75px] md:w-[80%] flex flex-col justify-center bg-[#eeeeee]'>
          <div className='w-full block md:flex text-center  justify-start pb-[20px] items-start border-b-2 border-slate-600'>
            <button className='text-base border-solid mb-1 border-2 border-lime-900 py-1 px-8 bg-white'>Back To Account</button>
            <h1 className='text-3xl font-semibold pb-3 text-[#252525] md:ml-[20%]'>Customize Your Order</h1>
          </div>
          <div className='w-full md:w-1/3 sm:mt-7 mb-6 block md:flex float-start items-start'>
            <button className='w-full md:w-1/2 mt-2 text-base mr-3 border-solid border-2 border-lime-900  bg-white py-2'>Process Now</button>
            <button className='w-full md:w-1/2 mt-2 text-base border-solid border-2 border-lime-900  bg-white py-2'>1 Week Delay</button>
          </div>

          <div className='w-full mb-10 block lg:flex'>
            <div className='w-[100%]  bg-white lg:w-[65%] flex flex-col justify-around border-solid border-2 border-lime-950 '>
              <div className='flex mt-3 '>
                <div className='w-1/3 flex p-2 flex-col items-center'>
                  <img className='w-[240px]' src="https://cdn.shopify.com/s/files/1/0555/1751/1961/products/hawaiian-shredded-pork-332683.png?v=1707508435" alt="" />
                  <h1 className='text-[27px] my-2 font-semibold'>$22.50</h1>
                  <button className='text-base flex items-center  font-semibold mb-3 py-2 px-4 text-white bg-[#862e1b]'>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm' >-</span>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm'>0</span>
                    <span className='px-1 sm:px-3 bg-white text-black rounded-sm'>+</span>
                  </button>
                </div>

                <div className='w-1/3 flex p-2 flex-col items-center'>
                  <img className='w-[240px]' src="https://cdn.shopify.com/s/files/1/0555/1751/1961/products/hawaiian-shredded-pork-332683.png?v=1707508435" alt="" />
                  <h1 className='text-[27px] my-2 font-semibold'>$22.50</h1>
                  <button className='text-base flex items-center  font-semibold mb-3 py-2 px-4 text-white bg-[#862e1b]'>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm' >-</span>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm'>0</span>
                    <span className='px-1 sm:px-3 bg-white text-black rounded-sm'>+</span>
                  </button>
                </div>

                <div className='w-1/3 flex p-2 flex-col items-center'>
                  <img className='w-[240px]' src="https://cdn.shopify.com/s/files/1/0555/1751/1961/products/hawaiian-shredded-pork-332683.png?v=1707508435" alt="" />
                  <h1 className='text-[27px] my-2 font-semibold'>$22.50</h1>
                  <button className='text-base flex items-center  font-semibold mb-3 py-2 px-4 text-white bg-[#862e1b]'>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm' >-</span>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm'>0</span>
                    <span className='px-1 sm:px-3 bg-white text-black rounded-sm'>+</span>
                  </button>
                </div>
              </div>

              <div className='flex mt-3'>
                <div className='w-1/3 flex p-2 flex-col items-center'>
                  <img className='w-[240px]' src="https://cdn.shopify.com/s/files/1/0555/1751/1961/products/hawaiian-shredded-pork-332683.png?v=1707508435" alt="" />
                  <h1 className='text-[27px] my-2 font-semibold'>$22.50</h1>
                  <button className='text-base flex items-center  font-semibold mb-3 py-2 px-4 text-white bg-[#862e1b]'>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm' >-</span>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm'>0</span>
                    <span className='px-1 sm:px-3 bg-white text-black rounded-sm'>+</span>
                  </button>
                </div>

                <div className='w-1/3 flex p-2 flex-col items-center'>
                  <img className='w-[240px]' src="https://cdn.shopify.com/s/files/1/0555/1751/1961/products/hawaiian-shredded-pork-332683.png?v=1707508435" alt="" />
                  <h1 className='text-[27px] my-2 font-semibold'>$22.50</h1>
                  <button className='text-base flex items-center  font-semibold mb-3 py-2 px-4 text-white bg-[#862e1b]'>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm' >-</span>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm'>0</span>
                    <span className='px-1 sm:px-3 bg-white text-black rounded-sm'>+</span>
                  </button>
                </div>

                <div className='w-1/3 flex p-2 flex-col items-center'>
                  <img className='w-[240px]' src="https://cdn.shopify.com/s/files/1/0555/1751/1961/products/hawaiian-shredded-pork-332683.png?v=1707508435" alt="" />
                  <h1 className='text-[27px] my-2 font-semibold'>$22.50</h1>
                  <button className='text-base flex items-center  font-semibold mb-3 py-2 px-4 text-white bg-[#862e1b]'>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm' >-</span>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm'>0</span>
                    <span className='px-1 sm:px-3 bg-white text-black rounded-sm'>+</span>
                  </button>
                </div>
              </div>

              <div className='flex mt-3'>
                <div className='w-1/3 flex p-2 flex-col items-center'>
                  <img className='w-[240px]' src="https://cdn.shopify.com/s/files/1/0555/1751/1961/products/hawaiian-shredded-pork-332683.png?v=1707508435" alt="" />
                  <h1 className='text-[27px] my-2 font-semibold'>$22.50</h1>
                  <button className='text-base flex items-center  font-semibold mb-3 py-2 px-4 text-white bg-[#862e1b]'>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm' >-</span>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm'>0</span>
                    <span className='px-1 sm:px-3 bg-white text-black rounded-sm'>+</span>
                  </button>
                </div>

                <div className='w-1/3 flex p-2 flex-col items-center'>
                  <img className='w-[240px]' src="https://cdn.shopify.com/s/files/1/0555/1751/1961/products/hawaiian-shredded-pork-332683.png?v=1707508435" alt="" />
                  <h1 className='text-[27px] my-2 font-semibold'>$22.50</h1>
                  <button className='text-base flex items-center  font-semibold mb-3 py-2 px-4 text-white bg-[#862e1b]'>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm' >-</span>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm'>0</span>
                    <span className='px-1 sm:px-3 bg-white text-black rounded-sm'>+</span>
                  </button>
                </div>

                <div className='w-1/3 flex p-2 flex-col items-center'>
                  <img className='w-[240px]' src="https://cdn.shopify.com/s/files/1/0555/1751/1961/products/hawaiian-shredded-pork-332683.png?v=1707508435" alt="" />
                  <h1 className='text-[27px] my-2 font-semibold'>$22.50</h1>
                  <button className='text-base flex items-center  font-semibold mb-3 py-2 px-4 text-white bg-[#862e1b]'>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm' >-</span>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm'>0</span>
                    <span className='px-1 sm:px-3 bg-white text-black rounded-sm'>+</span>
                  </button>
                </div>
              </div>

              <div className='flex mt-3'>
                <div className='w-1/3 flex p-2 flex-col items-center'>
                  <img className='w-[240px]' src="https://cdn.shopify.com/s/files/1/0555/1751/1961/products/hawaiian-shredded-pork-332683.png?v=1707508435" alt="" />
                  <h1 className='text-[27px] my-2 font-semibold'>$22.50</h1>
                  <button className='text-base flex items-center  font-semibold mb-3 py-2 px-4 text-white bg-[#862e1b]'>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm' >-</span>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm'>0</span>
                    <span className='px-1 sm:px-3 bg-white text-black rounded-sm'>+</span>
                  </button>
                </div>

                <div className='w-1/3 flex p-2 flex-col items-center'>
                  <img className='w-[240px]' src="https://cdn.shopify.com/s/files/1/0555/1751/1961/products/hawaiian-shredded-pork-332683.png?v=1707508435" alt="" />
                  <h1 className='text-[27px] my-2 font-semibold'>$22.50</h1>
                  <button className='text-base flex items-center  font-semibold mb-3 py-2 px-4 text-white bg-[#862e1b]'>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm' >-</span>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm'>0</span>
                    <span className='px-1 sm:px-3 bg-white text-black rounded-sm'>+</span>
                  </button>
                </div>

                <div className='w-1/3 flex p-2 flex-col items-center'>
                  <img className='w-[240px]' src="https://cdn.shopify.com/s/files/1/0555/1751/1961/products/hawaiian-shredded-pork-332683.png?v=1707508435" alt="" />
                  <h1 className='text-[27px] my-2 font-semibold'>$22.50</h1>
                  <button className='text-base flex items-center  font-semibold mb-3 py-2 px-4 text-white bg-[#862e1b]'>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm' >-</span>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm'>0</span>
                    <span className='px-1 sm:px-3 bg-white text-black rounded-sm'>+</span>
                  </button>
                </div>
              </div>

              <div className='flex mt-3'>
                <div className='w-1/3 flex p-2 flex-col items-center'>
                  <img className='w-[240px]' src="https://cdn.shopify.com/s/files/1/0555/1751/1961/products/hawaiian-shredded-pork-332683.png?v=1707508435" alt="" />
                  <h1 className='text-[27px] my-2 font-semibold'>$22.50</h1>
                  <button className='text-base flex items-center  font-semibold mb-3 py-2 px-4 text-white bg-[#862e1b]'>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm' >-</span>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm'>0</span>
                    <span className='px-1 sm:px-3 bg-white text-black rounded-sm'>+</span>
                  </button>
                </div>

                <div className='w-1/3 flex p-2 flex-col items-center'>
                  <img className='w-[240px]' src="https://cdn.shopify.com/s/files/1/0555/1751/1961/products/hawaiian-shredded-pork-332683.png?v=1707508435" alt="" />
                  <h1 className='text-[27px] my-2 font-semibold'>$22.50</h1>
                  <button className='text-base flex items-center  font-semibold mb-3 py-2 px-4 text-white bg-[#862e1b]'>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm' >-</span>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm'>0</span>
                    <span className='px-1 sm:px-3 bg-white text-black rounded-sm'>+</span>
                  </button>
                </div>

                <div className='w-1/3 flex p-2 flex-col items-center'>
                  <img className='w-[240px]' src="https://cdn.shopify.com/s/files/1/0555/1751/1961/products/hawaiian-shredded-pork-332683.png?v=1707508435" alt="" />
                  <h1 className='text-[27px] my-2 font-semibold'>$22.50</h1>
                  <button className='text-base flex items-center  font-semibold mb-3 py-2 px-4 text-white bg-[#862e1b]'>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm' >-</span>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm'>0</span>
                    <span className='px-1 sm:px-3 bg-white text-black rounded-sm'>+</span>
                  </button>
                </div>
              </div>

              <div className='flex mt-3'>
                <div className='w-1/3 flex p-2 flex-col items-center'>
                  <img className='w-[240px]' src="https://cdn.shopify.com/s/files/1/0555/1751/1961/products/hawaiian-shredded-pork-332683.png?v=1707508435" alt="" />
                  <h1 className='text-[27px] my-2 font-semibold'>$22.50</h1>
                  <button className='text-base flex items-center  font-semibold mb-3 py-2 px-4 text-white bg-[#862e1b]'>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm' >-</span>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm'>0</span>
                    <span className='px-1 sm:px-3 bg-white text-black rounded-sm'>+</span>
                  </button>
                </div>

                <div className='w-1/3 flex p-2 flex-col items-center'>
                  <img className='w-[240px]' src="https://cdn.shopify.com/s/files/1/0555/1751/1961/products/hawaiian-shredded-pork-332683.png?v=1707508435" alt="" />
                  <h1 className='text-[27px] my-2 font-semibold'>$22.50</h1>
                  <button className='text-base flex items-center  font-semibold mb-3 py-2 px-4 text-white bg-[#862e1b]'>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm' >-</span>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm'>0</span>
                    <span className='px-1 sm:px-3 bg-white text-black rounded-sm'>+</span>
                  </button>
                </div>

                <div className='w-1/3 flex p-2 flex-col items-center'>
                  <img className='w-[240px]' src="https://cdn.shopify.com/s/files/1/0555/1751/1961/products/hawaiian-shredded-pork-332683.png?v=1707508435" alt="" />
                  <h1 className='text-[27px] my-2 font-semibold'>$22.50</h1>
                  <button className='text-base flex items-center  font-semibold mb-3 py-2 px-4 text-white bg-[#862e1b]'>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm' >-</span>
                    <span className='mr-1 sm:mr-3 px-1 sm:px-3 bg-white text-black rounded-sm'>0</span>
                    <span className='px-1 sm:px-3 bg-white text-black rounded-sm'>+</span>
                  </button>
                </div>
              </div>
            </div>

            <div className='lg:w-[35%] mt-[35px]  bg-white lg:mt-0 md:block lg:ml-[20px] border-solid w-full flex flex-col   border-2 border-lime-950 md:h-auto lg:h-[800px] xl:h-[810px]'>
              <div className='bg-black text-center'>
                <h2 className='text-white py-5'>YOUR SUBSCRIPTION</h2>
              </div>
              <div>
                <div className="progress-bar ">
                  <div className="py-4 px-10 flex justify-center">
                    <div aria-valuemax="100" aria-valuemin="0" role="progressbar" data-state="indeterminate" data-max="100" className="relative h-2 overflow-hidden rounded-full bg-primary/20 w-[100%] min-h-3 border border-[#000]">
                      <div data-state="indeterminate" data-max="100" className="h-full w-full flex-1 bg-[#1c7084bf] transition-all content-[hellow]"></div>
                    </div>
                  </div>
                  <div className="flex flex-column justify-end gap-2  px-7 ">
                    <p className="text-center text-base flex flex-col mr-3 relative">
                      <span className="w-[10px] h-[10px] bg-black rounded-[100%] absolute top-[-27px] left-[50%] translate-x-[-50%]"></span>
                      <span className="text-[16px] uppercase leading-normal">$75</span>
                    </p>
                    <p className="text-base text-center flex flex-col mr-5 relative">
                      <span className="w-[10px] h-[10px] bg-black rounded-[100%] absolute top-[-27px] left-[50%] translate-x-[-50%]"></span>
                      <span className="text-[16px] leading-normal">$125</span>
                      <span className="text-[11px] uppercase leading-normal">Free Meat</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full h-auto mt-5">
                <img className='w-full' src="https://cdn.shopify.com/s/files/1/0672/4776/7778/files/Cranapple_Bundler_Image.jpg?v=1711001822" alt="No-Image" />
              </div>

              <div className='w-full flex justify-center items-center'>
                <div className='w-11/12 mt-3 flex justify-between items-center'>
                  <div className='flex items-center'>
                    <div>
                      <img className='w-16' src="https://cdn.shopify.com/s/files/1/0555/1751/1961/products/jamaican-jerk-beef-758700.png?v=1707508911" alt="" />
                    </div>
                    <div className='pl-2'>
                      <p className='text-sm font-semibold'>Jamaican Jerk Beef</p>
                      <h1 className='text-[28px] font-semibold'>$19.95</h1>
                    </div>
                  </div>
                  <div>
                    <button className='text-base flex items-center  font-semibold  py-1 px-2 text-white bg-[#862e1b]'>
                      <span className='mr-2 px-2 bg-white text-black rounded-sm'>-</span>
                      <span className='mr-2 px-2 bg-white text-black rounded-sm'>0</span>
                      <span className='px-2 bg-white text-black rounded-sm'>+</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className='w-full flex justify-center items-center'>
                <div className='w-11/12 mt-3 flex justify-between items-center'>
                  <div className='flex items-center'>
                    <div>
                      <img className='w-16' src="https://cdn.shopify.com/s/files/1/0555/1751/1961/products/jamaican-jerk-beef-758700.png?v=1707508911" alt="" />
                    </div>
                    <div className='pl-2'>
                      <p className='text-sm font-semibold'>Jamaican Jerk Beef</p>
                      <h1 className='text-[28px] font-semibold'>$19.95</h1>
                    </div>
                  </div>
                  <div>
                    <button className='text-base flex items-center  font-semibold  py-1 px-2 text-white bg-[#862e1b]'>
                      <span className='mr-2 px-2 bg-white text-black rounded-sm'>-</span>
                      <span className='mr-2 px-2 bg-white text-black rounded-sm'>0</span>
                      <span className='px-2 bg-white text-black rounded-sm'>+</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className='w-full flex justify-center items-center'>
                <div className='w-11/12 mt-3 flex justify-between items-center'>
                  <div className='flex items-center'>
                    <div>
                      <img className='w-16' src="https://cdn.shopify.com/s/files/1/0555/1751/1961/products/jamaican-jerk-beef-758700.png?v=1707508911" alt="" />
                    </div>
                    <div className='pl-2'>
                      <p className='text-sm font-semibold'>Jamaican Jerk Beef</p>
                      <h1 className='text-[28px] font-semibold'>$19.95</h1>
                    </div>
                  </div>
                  <div>
                    <button className='text-base flex items-center  font-semibold  py-1 px-2 text-white bg-[#862e1b]'>
                      <span className='mr-2 px-2 bg-white text-black rounded-sm'>-</span>
                      <span className='mr-2 px-2 bg-white text-black rounded-sm'>0</span>
                      <span className='px-2 bg-white text-black rounded-sm'>+</span>
                    </button>
                  </div>
                </div>
              </div>


              <div className='w-full flex  justify-center'>
                <div className='w-11/12 flex items-end border-b-4 border-lime-800  justify-between'>
                  <button className='text-sm md:text-xl font-semibold py-4 my-3 px-6 md:px-12 text-white bg-[#862e1b]'>Update Changes</button>
                  <h1 className='my-3 text-xl'>Total: $0.00</h1>
                </div>
              </div>

              <div className='flex w-full items-center flex-end justify-end'>
                <div className='flex w-11/12 items-center justify-center'>
                  <div className=" p-3 rounded-lg ">
                    <h2 className="text-xs font-bold mb-2">Free Meat (unlocked at $125)</h2>
                    <select className="block w-full text-sm border border-gray-300 rounded-md  ">
                      <option className='text-xs' value="Roasted Chicken Breast">Roasted Chicken Breast</option>
                      <option className='text-xs' value="Buffalo Chicken">Buffalo Chicken</option>
                      <option className='text-xs' value="Teriyaki Chicken">Teriyaki Chicken</option>
                      <option className='text-xs' value="Texas Rub Chicken Thigh">Texas Rub Chicken Thigh</option>
                      <option className='text-xs' value="Braised Pork Kalua">Braised Pork Kalua</option>
                      <option className='text-xs' value="Slow Cooked Pulled Pork">Slow Cooked Pulled Pork</option>
                      <option className='text-xs' value="Pollo Asado">Pollo Asado</option>
                    </select>
                  </div>
                  <div>
                    <img className='w-20' src="https://cdn.shopify.com/s/files/1/0672/4776/7778/files/free-meat-unlocked-at-125-536967_medium_d6071a01-575e-4b92-99c9-67caead4140f.png?v=1710540091" alt="" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

const PRODUCT_QUERYTT = `#graphql
  query getProductById($id: ID!) {
    product(id: $id) {
      id
      handle
    }
  }
`

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
