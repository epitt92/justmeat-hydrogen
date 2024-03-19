import React from 'react';
import {Form, NavLink, Outlet, useLoaderData} from '@remix-run/react';
const AccountOrderHistory = () => {
  return (
        <div className='w-[95%] md:w-[80%] mx-auto'>
           <div className='flex flex-col md:flex-row items-center border-gray-500 border-b-2 py-4 my-4'>
                <NavLink to="/account/orders" className="capitalize border-solid border-2 border-gray-500 px-2 py-1">
                    Back to Account
                </NavLink>
                <h3 className='text-[28px] ml-0 md:ml-[30%] font-medium'>Your Order History</h3>
           </div>
           <div className='bg-[#EEEEEE] rounded-md py-8 px-6 mb-8'>
                <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-[30px] w-full">
                <div className='basis-2/12'>
                    text-1
                </div>
                <div className='basis-6/12'>
                text-1
                </div>
                <div className='basis-2/12'>
                    <div className=''>
                        <h5 className='capitalize text-[18px] font-bold '>Shipping to</h5>
                        <p className='capitalize font-normal leading-8 text-[16px]'>61 Aruba drive</p>
                        <p className='capitalize font-normal leading-8 text-[16px]'>utah, 84404</p>
                        <p className='capitalize font-normal leading-8 text-[16px]'>United States</p>
                    </div>
                </div>
                <div className='basis-2/12'>
                    <p>Success
                        <span className='ml-2'>#5265596256665</span>
                    </p>
                </div>
                </div>
           </div>
        </div>
  )
}

export default AccountOrderHistory