import React from 'react'

import { listOrders } from '@rechargeapps/storefront-client'
import { NavLink, useLoaderData } from '@remix-run/react'
import { json } from '@shopify/remix-oxygen'

import OrderHistory from '~/containers/Account/Order/OrderHistory'
import { rechargeQueryWrapper } from '~/lib/rechargeUtils'

export async function loader({ context }) {
  const listOrdersResponse = await rechargeQueryWrapper((session) => {
    if (session.customerId) {
      return listOrders(session, {
        limit: 25,
        sort_by: 'id-asc',
      })
    }
    return { orders: [] }
  }, context)

  return json({
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Set-Cookie': await context.session.commit(),
    },
    listOrdersResponse,
  })
}

export default function AccountOrderHistory() {
  const { listOrdersResponse } = useLoaderData()

  return (
    <div className="bg-sublistbgGray py-0 md:py-8">
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
