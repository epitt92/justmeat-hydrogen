import React from 'react';
import {json} from '@shopify/remix-oxygen';
import { useLoaderData} from '@remix-run/react';
import {CUSTOMER_DETAILS_QUERY} from '~/graphql/customer-account/CustomerDetailsQuery';

import { listSubscriptions } from '@rechargeapps/storefront-client';
import { SubscriptionCard } from '~/components/SubscriptionCard';
import { rechargeQueryWrapper } from '~/lib/rechargeUtils';

export function shouldRevalidate() {
    return true;
  }
  
  /**
   * @param {LoaderFunctionArgs}
   */
  export async function loader({context}) {
    const {data, errors} = await context.customerAccount.query(
      CUSTOMER_DETAILS_QUERY,
    );
  
    if (errors?.length || !data?.customer) {
      throw new Error('Customer not found');
    }
  
    
    const subscriptionsResponse = await rechargeQueryWrapper(
      session =>
        listSubscriptions(session, {
          limit: 25,
          status: 'active',
        }),
      context
    );
  
    return json(
      {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Set-Cookie': await context.session.commit(),
        },
        subscriptionsResponse,
        customer: data.customer
      },
    );
  }
  export default function AccountSubscriptions(){
       const { subscriptionsResponse, customer } = useLoaderData();
  return (
    <div className='subscriptions'>
         {subscriptionsResponse.subscriptions && (
        <AccountSubscription subscriptions={subscriptionsResponse.subscriptions} currentcustomer={customer}/>
      )}
    </div>
  )
}
function AccountSubscription({subscriptions, currentcustomer}) {
    return (
      <div className="mt-6 bg-sublistbgGray">
        <div className="grid w-full gap-4 p-4 py-6 md:gap-8 md:p-8 lg:p-12">
          <h2 className="font-bold text-lead text-[28px] text-center md:text-left">Your Subscriptions</h2>
          <div className='grid bg-custombgGreen w-auto md:w-[300px] p-6 block text-white text-xl text-center md:text-left'>
            <span>Next Order Processing On</span>
            <span>{subscriptions[0].next_charge_scheduled_at}</span>
          </div>
          <hr className='border-gray-500 border-t-2'></hr>
          {subscriptions?.length ? <Subscriptions subscriptions={subscriptions}  currentcustomer={currentcustomer}/> : <EmptySubscriptions />}
        </div>
      </div>
    );
  }
  
  function Subscriptions({ subscriptions,currentcustomer }) {
    return (
      <ul className="grid bg-white border border-2 border-custombgGreen">
        {subscriptions.map(subscription => (
          <SubscriptionCard subscription={subscription} currentcustomer={currentcustomer} key={subscription.id} />
        ))}
      </ul>
    );
  }
