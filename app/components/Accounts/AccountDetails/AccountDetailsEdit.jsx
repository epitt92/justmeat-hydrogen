import React from 'react'

const AccountDetailsEdit = ({getCustomerResponse}) => {
    console.log("getCustomerResponse",getCustomerResponse);
  return (
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
  )
}

export default AccountDetailsEdit