import React, { useState } from 'react'

import { listSubscriptions } from '@rechargeapps/storefront-client'
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useOutletContext,
} from '@remix-run/react'
import { json } from '@shopify/remix-oxygen'

import { SubscriptionCard } from '~/components/SubscriptionCard'
import { UPDATE_ADDRESS_MUTATION } from '~/graphql/customer-account/CustomerAddressMutations'
import { CUSTOMER_DETAILS_QUERY } from '~/graphql/customer-account/CustomerDetailsQuery'
import { rechargeQueryWrapper } from '~/lib/rechargeUtils'
import { getBundle } from '~/lib/storefront'
import { getPureId } from '~/lib/utils'

export function shouldRevalidate() {
  return true
}

export async function loader({ request, context }) {
  await context.customerAccount.handleAuthStatus()

  const { data, errors } = await context.customerAccount.query(
    CUSTOMER_DETAILS_QUERY,
  )

  if (errors?.length || !data?.customer) {
    throw new Error('Customer not found')
  }

  const { customer } = data

  const { bundleProduct } = await getBundle({
    request,
    context,
  })

  const res = await rechargeQueryWrapper(
    (session) =>
      listSubscriptions(session, {
        limit: 25,
        status: 'active',
      }),
    context,
  )

  const bundleProductId = getPureId(bundleProduct.id, 'Product')
  // Filter only bundle subscriptions
  const subscriptions = res.subscriptions.filter(
    (el) => el.external_product_id.ecommerce === bundleProductId,
  )

  return json({
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Set-Cookie': await context.session.commit(),
    },
    customer,
    subscriptions,
  })
}

export async function action({ request, context }) {
  const { customerAccount } = context

  try {
    const form = await request.formData()

    const addressId = form.has('addressId')
      ? String(form.get('addressId'))
      : null
    if (!addressId) {
      throw new Error('You must provide an address id.')
    }

    // this will ensure redirecting to login never happen for mutatation
    const isLoggedIn = await customerAccount.isLoggedIn()
    if (!isLoggedIn) {
      return json(
        { error: { [addressId]: 'Unauthorized' } },
        {
          status: 401,
          headers: {
            'Set-Cookie': await context.session.commit(),
          },
        },
      )
    }

    const address = {}
    const keys = [
      'address1',
      'address2',
      'city',
      'company',
      'territoryCode',
      'firstName',
      'lastName',
      'phoneNumber',
      'zoneCode',
      'zip',
    ]

    for (const key of keys) {
      const value = form.get(key)
      if (typeof value === 'string') {
        address[key] = value
      }
    }

    switch (request.method) {
      case 'PUT': {
        // handle address updates
        try {
          const { data, errors } = await customerAccount.mutate(
            UPDATE_ADDRESS_MUTATION,
            {
              variables: {
                address,
                addressId: decodeURIComponent(addressId),
              },
            },
          )

          if (errors?.length) {
            throw new Error(errors[0].message)
          }

          if (data?.customerAddressUpdate?.userErrors?.length) {
            throw new Error(data?.customerAddressUpdate?.userErrors[0].message)
          }

          if (!data?.customerAddressUpdate?.customerAddress) {
            throw new Error('Customer address update failed.')
          }

          return json(
            {
              error: null,
              updatedAddress: address,
            },
            {
              headers: {
                'Set-Cookie': await context.session.commit(),
              },
            },
          )
        } catch (error) {
          if (error instanceof Error) {
            return json(
              { error: { [addressId]: error.message } },
              {
                status: 400,
                headers: {
                  'Set-Cookie': await context.session.commit(),
                },
              },
            )
          }
          return json(
            { error: { [addressId]: error } },
            {
              status: 400,
              headers: {
                'Set-Cookie': await context.session.commit(),
              },
            },
          )
        }
      }
      default: {
        return json(
          { error: { [addressId]: 'Method not allowed' } },
          {
            status: 405,
            headers: {
              'Set-Cookie': await context.session.commit(),
            },
          },
        )
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      return json(
        { error: error.message },
        {
          status: 400,
          headers: {
            'Set-Cookie': await context.session.commit(),
          },
        },
      )
    }
    return json(
      { error },
      {
        status: 400,
        headers: {
          'Set-Cookie': await context.session.commit(),
        },
      },
    )
  }
}

export default function AccountSubscriptions() {
  const { subscriptions, customer } = useLoaderData()

  return (
    <div className="subscriptions">
      {subscriptions.length > 0 ? (
        <AccountSubscription
          currentcustomer={customer}
          subscriptions={subscriptions}
        />
      ) : (
        <div className="flex justify-center py-40 text-lg">
          You don&apos;t have any active bundle subscriptions
        </div>
      )}
    </div>
  )
}

function AccountSubscription({ subscriptions, currentcustomer }) {
  return (
    <div className="bg-sublistbgGray">
      <div className="container">
        <div className="grid w-full gap-4 py-8 md:gap-8">
          <h2 className="font-bold text-lead text-[28px] text-center md:text-left">
            Your Subscriptions
          </h2>
          <div className="bg-custombgGreen w-auto md:w-[300px] p-6 block text-white text-xl text-center md:text-left">
            <span>Next Order Processing On</span>
            <span>{subscriptions[0].next_charge_scheduled_at}</span>
          </div>
          <hr className="border-t-2 border-gray-500"></hr>
          {subscriptions?.length ? (
            <Subscriptions
              subscriptions={subscriptions}
              currentcustomer={currentcustomer}
            />
          ) : (
            <> </>
          )}
        </div>
      </div>
    </div>
  )
}

function Subscriptions({ subscriptions, currentcustomer }) {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const uniquePairs = new Set()
  const handleNavToggle = (prevState, id) => {
    setIsNavOpen(prevState)
    // Handle id as needed
  }

  const checkIfDuplicate = (subscriptionId, addressId) => {
    const pair = `${subscriptionId}-${addressId}`
    if (uniquePairs.has(pair)) {
      return true // Pair already exists, so it's a duplicate
    } else {
      uniquePairs.add(pair) // Add the pair to the Set
      return false // Pair is unique
    }
  }
  return (
    <>
      <ul className="grid bg-white border border-2 border-custombgGreen">
        {subscriptions.map((subscription) => (
          <SubscriptionCard
            setIsNavOpen={handleNavToggle}
            subscription={subscription}
            currentcustomer={currentcustomer}
            key={subscription.id}
          />
        ))}
      </ul>
      <div
        className={
          isNavOpen
            ? 'block  w-full  md:w-[20%] border-[#B2B2B2] border-l fixed overflow-y-auto md:overflow-y-hidden h-screen top-0 right-0 bg-white z-10 flex flex-col'
            : 'hidden'
        }
      >
        <div className="w-full border-[#B2B2B2] border-b px-4 pt-4 pb-2 sticky ">
          <div className="flex items-center justify-between ">
            <h1 className="text-[20px] font-bold">Edit Shipping Address</h1>
            <svg
              className="w-8 h-8 cursor-pointer text-gray"
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
          <ExistingAddresses />
        </div>
      </div>
    </>
  )
}
export function ExistingAddresses() {
  const { customer } = useOutletContext()
  const { addresses } = customer
  const address = addresses.nodes[0]
  return (
    <div>
      <AddressForm key={address.id} addressId={address.id} address={address}>
        {({ stateForMethod }) => (
          <div>
            <button
              className="rounded-sm w-full bg-[#252525] px-6 py-2 mb-4 text-sm font-semibold text-white shadow-sm border-2 border-black"
              disabled={stateForMethod('PUT') !== 'idle'}
              formMethod="PUT"
              type="submit"
            >
              {stateForMethod('PUT') !== 'idle' ? 'Saving' : 'Save'}
            </button>
          </div>
        )}
      </AddressForm>
    </div>
  )
}

export function AddressForm({ addressId, address, children }) {
  const { state, formMethod } = useNavigation()

  /** @type {ActionReturnData} */
  const action = useActionData()
  const error = action?.error?.[addressId]

  return (
    <Form id={addressId}>
      <div className="grid grid-cols-1 overflow-y-auto gap-x-3 gap-y-2 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <input type="hidden" name="addressId" defaultValue={addressId} />
          <label
            htmlFor="firstName"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            First name
          </label>
          <div className="mt-2">
            <input
              id="firstName"
              name="firstName"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              defaultValue={address?.firstName ?? ''}
              autoComplete="given-name"
              placeholder="First name"
              aria-label="First name"
              minLength={2}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Last name
          </label>
          <div className="mt-2">
            <input
              id="lastName"
              name="lastName"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              defaultValue={address?.lastName ?? ''}
              autoComplete="family-name"
              placeholder="Last name"
              aria-label="Last name"
              minLength={2}
            />
          </div>
        </div>
        <div className="sm:col-span-6">
          <label
            htmlFor="address1"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Address 1
          </label>
          <div className="mt-2">
            <input
              id="address1"
              name="address1"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              defaultValue={address?.address1 ?? ''}
              placeholder="Address1"
              minLength={5}
            />
          </div>
        </div>
        <div className="sm:col-span-6">
          <label
            htmlFor="address2"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Address 2
          </label>
          <div className="mt-2">
            <input
              id="address2"
              name="address2"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              defaultValue={address?.address2 ?? ''}
              placeholder="Address2"
            />
          </div>
        </div>
        <div className="sm:col-span-6">
          <label
            htmlFor="company"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Company
          </label>
          <div className="mt-2">
            <input
              id="company"
              name="company"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              defaultValue={address?.company ?? ''}
              placeholder="company"
            />
          </div>
        </div>
        <div className="sm:col-span-6">
          <label
            htmlFor="territoryCode"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Country
          </label>
          <div className="mt-2">
            <input
              id="territoryCode"
              name="territoryCode"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              defaultValue={address?.territoryCode ?? ''}
              autoComplete="country"
              placeholder="country"
              aria-label="country"
            />
          </div>
        </div>
        <div className="sm:col-span-6">
          <label
            htmlFor="city"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            City
          </label>
          <div className="mt-2">
            <input
              id="city"
              name="city"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              defaultValue={address?.city ?? ''}
              placeholder="city"
            />
          </div>
        </div>
        <div className="sm:col-span-3">
          <label
            htmlFor="zoneCode"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Province/State
          </label>
          <div className="mt-2">
            <input
              id="zoneCode"
              name="zoneCode"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              defaultValue={address?.zoneCode ?? ''}
              placeholder="state"
            />
          </div>
        </div>
        <div className="sm:col-span-3">
          <label
            htmlFor="zip"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Postal Code
          </label>
          <div className="mt-2">
            <input
              id="zip"
              name="zip"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              defaultValue={address?.zip ?? ''}
              placeholder="postalcode"
            />
          </div>
        </div>
        <div className="sm:col-span-6">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Phone
          </label>
          <div className="mt-2">
            <input
              id="phoneNumber"
              name="phoneNumber"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="tel"
              defaultValue={address?.phoneNumber ?? ''}
              placeholder="phone"
              pattern="^\+?[1-9]\d{3,14}$"
            />
          </div>
        </div>
        <div className="sm:col-span-6">
          {error ? (
            <p>
              <mark>
                <small>{error}</small>
              </mark>
            </p>
          ) : (
            <br />
          )}
          {children({
            stateForMethod: (method) =>
              formMethod === method ? state : 'idle',
          })}
        </div>
      </div>
    </Form>
  )
}
