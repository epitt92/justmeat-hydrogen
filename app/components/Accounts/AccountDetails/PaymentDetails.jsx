import React from 'react'
import { NavLink } from '@remix-run/react';
const PaymentDetails = ({paymentMethod}) => {
    const {payment_details,billing_address} = paymentMethod;
  return (
    <div className='border border-black px-5 py-4 my-5'>
    <div className='border-gray-500 border-b py-4 mb-4'>
        <h3 className='text-[22px] text-start font-normal uppercase'>{payment_details.brand}</h3>
    </div>
    <div className='text-start'>
        <h5 className='capitalize text-[18px] leading-8 font-medium '>Billing Address</h5>
            { billing_address ? 
            <>
                <p className='capitalize font-normal leading-6 text-[16px]'>{billing_address.first_name} {billing_address.last_name}</p>
                <p className='capitalize font-normal leading-6 text-[16px]'>{billing_address.address1}</p>
                <p className='capitalize font-normal leading-6 text-[16px]'>{billing_address.city} , {billing_address.zip}</p>
                <p className='capitalize font-normal leading-6 text-[16px] mb-4'>{billing_address.country}</p>
            </> 
            : 
            "Billing Address Not Found."}
        <NavLink to="/account/orders" className="basis-2/12 text-center capitalize border-solid border-2 border-gray-500 px-2 py-1">
            Edit Payment Method
        </NavLink>
    </div>
  </div>
  )
}

export default PaymentDetails;