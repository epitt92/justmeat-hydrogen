import React,{useState} from 'react'
import { Money } from '@shopify/hydrogen'
import { Link } from 'react-router-dom'
import { json } from '@shopify/remix-oxygen'

export async function loader({ context }) {
  await context.customerAccount.handleAuthStatus()

  return json(
    {},
    {
      headers: {
        'Set-Cookie': await context.session.commit(),
      },
    },
  )
}

export function SubscriptionCard({
  addressId,
  setIsNavOpen,
  subscription,
  currentcustomer,
  shopCurrency = 'USD',
}) {
  if (!subscription?.id) return null
  const handleClick = (id) => {
    setIsNavOpen((prev) => !prev, id);
  };
  
  
  console.log("addressId",addressId);
  return (
    <li className="grid text-center border rounded">
      <div className="grid items-center gap-4 p-4 md:gap-6 md:p-6 md:grid-cols-3">
        <div className="flex-col justify-center text-center md:text-left">
          <h1 className="text-[22px] font-bold">Personal Information</h1>
        </div>
        <div className="">
          <p>
            <h2>
              {currentcustomer.firstName} {currentcustomer.lastName}
            </h2>
          </p>
          <p>
            <h2>{currentcustomer.defaultAddress.address1}</h2>
          </p>
        </div>
        <div className="text-center md:text-right">
          <a onClick={() => handleClick(addressId)} className="bg-custombgGreen text-white py-3 px-4 rounded cursor-pointer">EDIT</a>
        </div>
      </div>
      <div className="self-end border-t-2 border-custombgGreen">
        <div className="block md:flex">
          <div className="p-[25px] ">
            <img
              className="mx-auto md:ml-0"
              src="https://cdn.shopify.com/s/files/1/0555/1751/1961/products/custom-bundle-623742_100x100.png?v=1697650046"
              alt="Custom Bundle"
            />
          </div>
          <div className="p-[25px]">
            <h2 className="font-bold text-lead text-[22px]">
              {subscription.product_title}
            </h2>
            <h2 className="text-lead text-[16px] mb-5 text-custombgGreen">
              Ships every {subscription.charge_interval_frequency}{' '}
              {subscription.order_interval_unit}
            </h2>
            <Link
              to={`/subscriptions/${subscription.id}`}
              className="border border-2 font-bold text-lead text-[20px] border-custombgGreen px-4 py-2 text-lg block text-center"
              prefetch="intent"
            >
              Edit Selection
            </Link>
          </div>
        </div>
      </div>
    </li>
  )
}

