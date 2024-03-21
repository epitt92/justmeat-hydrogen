import React, { useState } from 'react';
import { NavLink, useLoaderData } from '@remix-run/react';
import { json } from '@shopify/remix-oxygen'
import { listPaymentMethods,getCustomer   } from '@rechargeapps/storefront-client'
import { rechargeQueryWrapper } from '~/lib/rechargeUtils'
import PaymentDetails from '~/components/Accounts/AccountDetails/PaymentDetails'
import AccountDetailsEdit from '~/components/Accounts/AccountDetails/AccountDetailsEdit'


export async function loader({ context }) {
  const  getCustomerResponse = await rechargeQueryWrapper(
      (session) =>
      getCustomer(session, {
          include: ['addresses']
        }),
      context,
    )
  
  const  listPaymentResponse = await rechargeQueryWrapper(
    (session) =>
    listPaymentMethods(session, {
        limit: 25,
      }),
    context,
  )
  return json({
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Set-Cookie': await context.session.commit(),
    },
    getCustomerResponse,
    listPaymentResponse,
  })
}

const AccountDetails = () => {
  const [showAccountDetails, setShowAccountDetails] = useState(true);
  const { listPaymentResponse, getCustomerResponse} = useLoaderData()
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
           {getCustomerResponse && (
              <AccountDetailsEdit getCustomerResponse={getCustomerResponse}/>
           )}
          </div>
        )}

        {!showAccountDetails && (
          <div className='bg-[#FFF] rounded-sm py-8 px-6 mb-8 border border-black '>
             {listPaymentResponse.payment_methods && (
            <PaymentMethods paymentMethods={listPaymentResponse.payment_methods} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountDetails;
function PaymentMethods({ paymentMethods }) {

  return (
    <div className="">
      {paymentMethods?.length ? <PaymentMethod paymentMethods={paymentMethods} /> : <EmptyPayment />}
    </div>
  )
}
const EmptyPayment = () => {
  return (
    <div>
      <h3>No Payment Method Found.</h3>
    </div>
  )
}
function PaymentMethod({ paymentMethods }) {
  return (
    <>
      {paymentMethods.map((paymentMethod) => (
        <PaymentDetails paymentMethod={paymentMethod} key={paymentMethod.id} />
      ))}
    </>
  )
}






// import React, { useState } from 'react';

// import PaymentDetails from '~/components/Accounts/AccountDetails/PaymentDetails'

  
// const AccountDetails = () => {
//   const [showAccountDetails, setShowAccountDetails] = useState(true);
//   const { listPaymentResponse,getCustomerResponse } = useLoaderData();
//  console.log("getCustomerResponse",getCustomerResponse);
//   const toggleView = () => {
//     setShowAccountDetails(!showAccountDetails);
//   };

//   return (
//     <div className='bg-sublistbgGray py-6'>
//       <div className='w-[95%] md:w-[80%] mx-auto'>
//         <div className='flex flex-col md:flex-row gap-2 md:gap-14 items-center border-gray-500 border-b-2 py-4 my-4'>
//           <NavLink to="/account/orders" className="basis-2/12 text-center capitalize border-solid border-2 border-gray-500 px-2 py-1">
//             Back to Account
//           </NavLink>

//           <button className={`basis-5/12 text-[28px] font-medium ${showAccountDetails ? 'text-black' : 'text-gray-500'}`} onClick={() => toggleView()}>
//             Account Details
//           </button>
//           <button className={`basis-5/12 text-[28px] font-medium ${showAccountDetails ? 'text-gray-500' : 'text-black'}`} onClick={() => toggleView()}>
//             Payment Methods
//           </button>
//         </div>

//         {showAccountDetails && (
//           <div className='bg-[#FFF] rounded-sm py-8 px-6 mb-8 border border-black '>
//             <div className='border-gray-500 border-b py-4 mb-4'>
//               <h3 className='text-[22px] text-center font-normal '>Account Details</h3>
//             </div>
//             <div className=" grid grid-cols-1 gap-x-16 gap-y-8 sm:grid-cols-6">
//                     <div className="sm:col-span-3">
//                     <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">First name</label>
//                     <div className="mt-2">
//                         <input type="text" name="first-name" id="first-name" value={getCustomerResponse.first_name} autoComplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
//                     </div>
//                     </div>

//                     <div className="sm:col-span-3">
//                     <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
//                     <div className="mt-2">
//                         <input type="text" name="last-name" id="last-name" value={getCustomerResponse.last_name} autoComplete="family-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
//                     </div>
//                     </div>
//                     <div className="sm:col-span-3">
//                         <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
//                         <div className="mt-2">
//                             <input id="email" name="email" type="email" value={getCustomerResponse.email}  autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
//                         </div>
//                     </div>

//                     <div className="sm:col-span-3">
//                         <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Phone</label>
//                         <div className="mt-2">
//                             <input type="text" name="phone" id="phone" value={getCustomerResponse.phone}  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
//                         </div>
//                     </div>
//                     <div className="sm:col-span-3">
//                         <button type="submit" className="rounded-sm px-6 py-1 text-sm font-semibold text-black shadow-sm border-2 border-black">Save</button>
//                     </div>
//                 </div>
//           </div>
//         )}

//         {!showAccountDetails && (
//           <div className='bg-[#FFF] rounded-sm py-8 px-6 mb-8 border border-black '>

            
              
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AccountDetails;



