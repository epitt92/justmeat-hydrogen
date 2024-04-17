import React, { useState } from 'react'

import {
  listPaymentMethods,
  sendCustomerNotification,
} from '@rechargeapps/storefront-client'
import {
  Form,
  NavLink,
  useActionData,
  useLoaderData,
  useNavigation,
  useOutletContext,
} from '@remix-run/react'
import { json } from '@shopify/remix-oxygen'

import { AccountDetailsEdit } from '~/containers/Account/AccountDetails/AccountDetailsEdit'
import { PaymentDetails } from '~/containers/Account/AccountDetails/PaymentDetails'
import { CUSTOMER_UPDATE_MUTATION } from '~/graphql/customer-account/CustomerUpdateMutation'
import { rechargeQueryWrapper } from '~/lib/rechargeUtils'

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

  const form = await request.formData()
  const body = JSON.parse(form.get('body'))

  const { api, ...data } = body

  switch (api) {
    case 'update-account-details':
      const customer = data

      // update customer and possibly password
      const { data: res, errors } = await customerAccount.mutate(
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

      if (!res?.customerUpdate?.customer) {
        throw new Error('Customer profile update failed.')
      }

      return json({ msg: 'ok' })

    case 'send-update-payment-email':
      await rechargeQueryWrapper(
        (session) =>
          sendCustomerNotification(session, 'SHOPIFY_UPDATE_PAYMENT_INFO', {
            ...data,
          }),
        context,
      )

      return json({ msg: 'ok' })

    default:
      break
  }
}

const AccountDetails = () => {
  const account = useOutletContext()
  const action = useActionData()

  const [showAccountDetails, setShowAccountDetails] = useState(true)
  const { listPaymentResponse } = useLoaderData()

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
            <AccountDetailsEdit customer={customer} />
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
