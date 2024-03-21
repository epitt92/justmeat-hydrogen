import React, { useState } from 'react';
import {
   NavLink, 
   useLoaderData , 
   Form,
  useActionData,
  useNavigation,
  useOutletContext,} from '@remix-run/react';
import { json } from '@shopify/remix-oxygen'
import {CUSTOMER_UPDATE_MUTATION} from '~/graphql/customer-account/CustomerUpdateMutation';
import { listPaymentMethods,getCustomer   } from '@rechargeapps/storefront-client'
import { rechargeQueryWrapper } from '~/lib/rechargeUtils'
import PaymentDetails from '~/components/Accounts/AccountDetails/PaymentDetails';

export async function loader({ context }) {
  await context.customerAccount.handleAuthStatus();
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
export async function action({request, context}) {
  const {customerAccount} = context;

  if (request.method !== 'PUT') {
    return json({error: 'Method not allowed'}, {status: 405});
  }

  const form = await request.formData();

  try {
    const customer = {};
    const validInputKeys = ['firstName', 'lastName', 'emailAddress', 'phoneNumber'];
    for (const [key, value] of form.entries()) {
      if (!validInputKeys.includes(key)) {
        continue;
      }
      if (typeof value === 'string' && value.length) {
        customer[key] = value;
      }
    }

    // update customer and possibly password
    const {data, errors} = await customerAccount.mutate(
      CUSTOMER_UPDATE_MUTATION,
      {
        variables: {
          customer,
        },
      },
    );
console.log("data",data);
    if (errors?.length) {
      throw new Error(errors[0].message);
    }

    if (!data?.customerUpdate?.customer) {
      throw new Error('Customer profile update failed.');
    }

    return json(
      {
        error: null,
        customer: data?.customerUpdate?.customer,
      },
      {
        headers: {
          'Set-Cookie': await context.session.commit(),
        },
      },
    );
  } catch (error) {
    return json(
      {error: error.message, customer: null},
      {
        status: 400,
        headers: {
          'Set-Cookie': await context.session.commit(),
        },
      },
    );
  }
}

const AccountDetails = () => {
  const [showAccountDetails, setShowAccountDetails] = useState(true);
  const { listPaymentResponse} = useLoaderData();
  const account = useOutletContext();
  const {state} = useNavigation();
  /** @type {ActionReturnData} */
  const action = useActionData();
  console.log("action",action);
  const customer = action?.customer ?? account?.customer;
  console.log("customer",customer);
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
            <Form method="PUT">
                <div className=" grid grid-cols-1 gap-x-16 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">First name</label>
                    <div className="mt-2">
                        <input
                            id="firstName"
                            name="firstName"
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            type="text"
                            autoComplete="given-name"
                            placeholder="First name"
                            aria-label="First name"
                            defaultValue={customer.firstName ?? ''}
                            minLength={2}
                          />   
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                      <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                      <div className="mt-2">
                        <input
                            id="lastName"
                            name="lastName"
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            type="text"
                            autoComplete="family-name"
                            placeholder="Last name"
                            aria-label="Last name"
                            defaultValue={customer.lastName ?? ''}
                            minLength={2}
                        />
                      </div>
                  </div>
                  <div className="sm:col-span-3">
                      <label htmlFor="emailAddress" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                      <div className="mt-2">
                          <input 
                            id="emailAddress" 
                            name="emailAddress" 
                            type="email" 
                            defaultValue={customer.emailAddress  ?? ''} 
                            autoComplete="emailAddress" 
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                      </div>
                  </div>

                  <div className="sm:col-span-3">
                      <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                      <div className="mt-2">
                          <input
                             type="tel" 
                             name="phoneNumber" 
                             id="phoneNumber" 
                             defaultValue={customer.phoneNumber ?? ''} 
                             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                             />
                      </div>
                  </div>
                  <div className="sm:col-span-3">
                      <button type="submit" disabled={state !== 'idle'} className="rounded-sm px-6 py-1 text-sm font-semibold text-black shadow-sm border-2 border-black">{state !== 'idle' ? 'Saving....' : 'Save'}</button>
                  </div>
    
                </div>
            </Form>
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
