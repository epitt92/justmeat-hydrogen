import React, { useState } from 'react'
import {
  NavLink,
  useLoaderData,
  Form,
  useActionData,
  useNavigation,
  useOutletContext,
} from '@remix-run/react'
import { json } from '@shopify/remix-oxygen'
import { CUSTOMER_UPDATE_MUTATION } from '~/graphql/customer-account/CustomerUpdateMutation'
import { listPaymentMethods } from '@rechargeapps/storefront-client'
import { rechargeQueryWrapper } from '~/lib/rechargeUtils'
import PaymentDetails from '~/containers/Account/AccountDetails/PaymentDetails'

export async function loader({ context }) {
  await context.customerAccount.handleAuthStatus()
  const listPaymentResponse = await rechargeQueryWrapper(
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
    listPaymentResponse,
  })
}
export async function action({ request, context }) {
  const { customerAccount } = context

  if (request.method !== 'PUT') {
    return json({ error: 'Method not allowed' }, { status: 405 })
  }

  const form = await request.formData()

  try {
    const customer = {}
    const validInputKeys = ['firstName', 'lastName']
    for (const [key, value] of form.entries()) {
      if (!validInputKeys.includes(key)) {
        continue
      }
      if (typeof value === 'string' && value.length) {
        customer[key] = value
      }
    }

    // update customer and possibly password
    const { data, errors } = await customerAccount.mutate(
      CUSTOMER_UPDATE_MUTATION,
      {
        variables: {
          customer,
        },
      },
    )

    if (errors?.length) {
      throw new Error(errors[0].message)
    }

    if (!data?.customerUpdate?.customer) {
      throw new Error('Customer profile update failed.')
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
    )
  } catch (error) {
    return json(
      { error: error.message, customer: null },
      {
        status: 400,
        headers: {
          'Set-Cookie': await context.session.commit(),
        },
      },
    )
  }
}

const AccountDetails = () => {
  const [showAccountDetails, setShowAccountDetails] = useState(true)
  const { listPaymentResponse } = useLoaderData()
  const account = useOutletContext()
  const { state,formAction } = useNavigation()
  /** @type {ActionReturnData} */
  const action = useActionData()
  const customer = action?.customer ?? account?.customer
  const toggleView = () => {
    setShowAccountDetails(!showAccountDetails)
  }
  return (
    <div className="py-6 bg-sublistbgGray">
      <div className="container">
        <div className="flex flex-col items-center gap-2 py-4 my-4 border-b-2 border-gray-500 md:flex-row md:gap-14">
          <NavLink
            to="/account/subscriptions"
            className="basis-2/12 bg-[#fff] text-center capitalize border-solid border-2 border-gray-500 px-4 text-[22px] py-1"
          >
            Back to Account
          </NavLink>

          <button
            className={`basis-5/12 text-[36px] font-bold ${
              showAccountDetails ? 'text-black' : 'text-gray-500'
            }`}
            onClick={() => toggleView()}
          >
            Account Details
          </button>
          <button
            className={`basis-5/12 text-[36px] font-bold ${
              showAccountDetails ? 'text-gray-500' : 'text-black'
            }`}
            onClick={() => toggleView()}
          >
            Payment Methods
          </button>
        </div>

        {showAccountDetails && (
          <div className="bg-[#FFF] rounded-sm py-8 px-6 mb-8 border border-black ">
            <div className="py-4 mb-4 border-b border-gray-500">
              <h3 className="text-[26px] text-center font-bold ">
                Account Details
              </h3>
            </div>
            <Form method="PUT">
              <div className="grid grid-cols-1  gap-x-16 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="firstName"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      id="firstName"
                      name="firstName"
                      className="block w-full text-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 "
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
                  <label
                    htmlFor="lastName"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      id="lastName"
                      name="lastName"
                      className="block w-full text-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 "
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
                  {action?.error ? (
                    <p>
                      <mark>
                        <small>{action.error}</small>
                      </mark>
                    </p>
                  ) : (
                    <br />
                  )}
                  <button
                    type="submit"
                    disabled={state !== 'idle'}
                    className="px-8 py-1 text-lg font-bold text-black border-2 border-black rounded-sm shadow-sm"
                  >
                    {state !== 'idle' && formAction  ? 'Saving....' : 'Save'}
                    
                  </button>
                </div>
              </div>
            </Form>
          </div>
        )}

        {!showAccountDetails && (
          <div className="bg-[#FFF] rounded-sm py-8 px-6 mb-8 border border-black ">
            {listPaymentResponse.payment_methods && (
              <PaymentMethods
                paymentMethods={listPaymentResponse.payment_methods}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AccountDetails
function PaymentMethods({ paymentMethods }) {
  return (
    <div className="">
      {paymentMethods?.length ? (
        <PaymentMethod paymentMethods={paymentMethods} />
      ) : (
        <EmptyPayment />
      )}
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
