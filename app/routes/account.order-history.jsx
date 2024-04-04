import React from 'react'
import { json } from '@shopify/remix-oxygen'
import { NavLink, useLoaderData } from '@remix-run/react'

import { listSubscriptions, listOrders } from '@rechargeapps/storefront-client'
import { SubscriptionCard } from '~/components/SubscriptionCard'
import { rechargeQueryWrapper } from '~/lib/rechargeUtils'
import OrderHistory from '~/containers/Account/Order/OrderHistory'

export async function loader({ context }) {
  const subscriptionsResponse = await rechargeQueryWrapper(
    (session) =>
      listSubscriptions(session, {
        limit: 25,
        status: 'active',
      }),
    context,
  )
  const listOrdersResponse = await rechargeQueryWrapper(
    (session) =>
      listOrders(session, {
        limit: 25,
        sort_by: 'id-asc',
      }),
    context,
  )
  return json({
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Set-Cookie': await context.session.commit(),
    },
    subscriptionsResponse,
    listOrdersResponse,
  })
}

const AccountOrderHistory = () => {
  const { subscriptionsResponse, listOrdersResponse } = useLoaderData()
  return (
    <div className="bg-sublistbgGray py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center border-gray-500 border-b-2 py-4 my-4">
          <NavLink
            to="/account/subscriptions"
            className="capitalize bg-[#fff] border-solid border-2 border-gray-500 px-8 text-[22px] py-1"
          >
            Back to Account
          </NavLink>
          <h3 className="text-[28px] md:text-[36px] font-bold ml-0 md:ml-[30%]">
            Your Order History
          </h3>
        </div>
        <div className="bg-[#fff] rounded-md py-8 px-6 mb-8">
          {listOrdersResponse.orders && (
            <AccountOrders orders={listOrdersResponse.orders} />
          )}
        </div>
      </div>
    </div>
  )
}

export default AccountOrderHistory
function AccountOrders({ orders }) {
  return (
    <div className="">
      {orders?.length ? <Orders orders={orders} /> : <EmptyOrders />}
    </div>
  )
}
const EmptyOrders = () => {
  return (
    <div>
      <h3>No order found.</h3>
    </div>
  )
}
function Orders({ orders }) {
  return (
    <>
      {orders.map((order) => (
        <OrderHistory order={order} key={order.id} />
      ))}
    </>
  )
}
