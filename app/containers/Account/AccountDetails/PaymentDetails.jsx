import React, { useState } from 'react'

const PaymentDetails = ({ paymentMethod }) => {
  const { payment_details, billing_address } = paymentMethod
  const [isNavOpen, setIsNavOpen] = useState(false)
  return (
    <>
      <div className="border border-black px-5 py-4 my-5">
        <div className="border-gray-500 border-b py-4 mb-4">
          <h3 className="text-[24px] text-start font-normal uppercase">
            {payment_details.brand}
          </h3>
        </div>
        <div className="text-start">
          <h5 className="capitalize text-[16px] leading-[21px] font-bold py-4">
            Billing Address
          </h5>
          {billing_address ? (
            <>
              <p className="capitalize font-normal leading-6 text-[16px]">
                {billing_address.first_name} {billing_address.last_name}
              </p>
              <p className="capitalize font-normal leading-6 text-[16px]">
                {billing_address.address1}
              </p>
              <p className="capitalize font-normal leading-6 text-[16px]">
                {billing_address.city} , {billing_address.zip}
              </p>
              <p className="capitalize font-normal leading-6 text-[16px] mb-4">
                {billing_address.country}
              </p>
            </>
          ) : (
            'Billing Address Not Found.'
          )}
          <button
            onClick={() => setIsNavOpen((prev) => !prev)}
            className="basis-2/12 text-center text-lg capitalize px-5 py-1 border-solid border-[3px] border-gray-700 hover:text-white hover:bg-gray-800"
          >
            Edit Payment Method
          </button>
        </div>
      </div>
      <div
        className={
          isNavOpen
            ? 'block  w-full  md:w-[20%] border-[#B2B2B2] border-l fixed overflow-y-auto md:overflow-y-hidden h-screen top-0 right-0 bg-white z-10 flex flex-col'
            : 'hidden'
        }
      >
        <div className="w-full border-b border-gray-700 border-b-2 px-4 py-4 ">
          <div className="flex items-center justify-between ">
            <h1 className="text-[20px] font-bold py-1 px-5">
              Edit Payment Method
            </h1>
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
          <h3 className="uppercase text-[18px] font-medium">Payment Method</h3>
          <h5 className="  font-normal text-[20px] mt-4">
            {payment_details.brand}
          </h5>
          <p className="italic mt-4 text-[16px]">
            Any updates to this payment method must be completed via{' '}
            {payment_details.brand}
          </p>
        </div>
      </div>
    </>
  )
}

export default PaymentDetails
