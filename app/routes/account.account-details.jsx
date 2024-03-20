import React, { useState } from 'react';
import { NavLink, useLoaderData } from '@remix-run/react';

const AccountDetails = () => {
  const [showAccountDetails, setShowAccountDetails] = useState(true);

  const toggleView = () => {
    setShowAccountDetails(!showAccountDetails);
  };

  return (
    <div className='bg-sublistbgGray py-6'>
      <div className='w-[95%] md:w-[80%] mx-auto'>
        <div className='flex flex-col md:flex-row gap-2 md:gap-14 items-center border-gray-500 border-b-2 py-4 my-4'>
          <NavLink to="/account/orders" className="basis-2/12 text-center capitalize border-solid border-2 border-gray-500 px-2 py-1">
            Back to Account
          </NavLink>

          <button className={`basis-5/12 text-[28px] font-medium ${showAccountDetails ? 'text-black' : 'text-gray-500'}`} onClick={() => toggleView()}>
            Account Details
          </button>
          <button className={`basis-5/12 text-[28px] font-medium ${showAccountDetails ? 'text-gray-500' : 'text-black'}`} onClick={() => toggleView()}>
            Payment Methods
          </button>
        </div>

        {showAccountDetails && (
          <div className='bg-[#FFF] rounded-sm py-8 px-6 mb-8 border border-black '>
            <div className='border-gray-500 border-b py-4 mb-4'>
              <h3 className='text-[22px] text-center font-normal '>Account Details</h3>
            </div>
            <div class=" grid grid-cols-1 gap-x-16 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-3">
                    <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">First name</label>
                    <div class="mt-2">
                        <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                    </div>

                    <div class="sm:col-span-3">
                    <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                    <div class="mt-2">
                        <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                    </div>
                    <div class="sm:col-span-3">
                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div class="mt-2">
                            <input id="email" name="email" type="email" autocomplete="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="phone" class="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                        <div class="mt-2">
                            <input type="text" name="phone" id="phone" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <div class="sm:col-span-3">
                        <button type="" class="rounded-sm px-6 py-1 text-sm font-semibold text-black shadow-sm border-2 border-black">Save</button>
                    </div>
                </div>
          </div>
        )}

        {!showAccountDetails && (
          <div className='bg-[#FFF] rounded-sm py-8 px-6 mb-8 border border-black '>
              <div className='border border-black px-5 py-4'>
                <div className='border-gray-500 border-b py-4 mb-4'>
                    <h3 className='text-[22px] text-start font-normal uppercase'>Paypal</h3>
                </div>
                <div className='text-start'>
                    <h5 className='capitalize text-[18px] leading-8 font-medium '>Billing Address</h5>
                    <p className='capitalize font-normal leading-6 text-[16px]'>Brandon Barclay</p>
                    <p className='capitalize font-normal leading-6 text-[16px]'>61 Aruba Drive</p>
                    <p className='capitalize font-normal leading-6 text-[16px] mb-4'>Utah 840574</p>
                    <NavLink to="/account/orders" className="basis-2/12 text-center capitalize border-solid border-2 border-gray-500 px-2 py-1">
                        Edit Payment Method
                    </NavLink>
                </div>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountDetails;
