import React,{useState} from 'react'
import { Money } from '@shopify/hydrogen'
import { Link } from 'react-router-dom'
import { json } from '@shopify/remix-oxygen'
import {ExistingAddresses} from "../routes/account.subscriptions"

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
  subscription,
  currentcustomer,
  shopCurrency = 'USD',
}) {
  if (!subscription?.id) return null
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
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
          <a onClick={() => setIsNavOpen((prev) => !prev)} class="bg-custombgGreen text-white py-2 px-4 rounded cursor-pointer">EDIT</a>
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
    <div className={isNavOpen ? "block absolute w-full  md:w-[20%] border-[#B2B2B2] border-l h-screen top-0 right-0 bg-white z-10 flex flex-col" : "hidden"}>
            <div
              className="w-full border-[#B2B2B2] border-b px-4 pt-4 pb-2 "
            >
                <div className='flex items-center justify-between '>
                <h1 className='text-[20px] font-bold'>Edit Shipping Address</h1>
                <svg
                className="h-8 w-8 text-gray cursor-pointer"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                onClick={() => setIsNavOpen(false)}
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
                </div>
             
            </div>
            <div className="px-4 py-4">
          
            <ExistingAddresses/>


            </div>
    </div>
    </>
  )
}

