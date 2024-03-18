import {json} from '@shopify/remix-oxygen';
import {Form, NavLink, Outlet, useLoaderData} from '@remix-run/react';
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

export default function AccountLayout(subscriptionsResponse) {
  /** @type {LoaderReturnData} */
  const {customer} = useLoaderData();

  const heading = customer
    ? customer.firstName
      ? `Welcome, ${customer.firstName}`
      : `Welcome to your account.`
    : 'Account Details';
console.log(subscriptionsResponse.subscriptions);
console.log(customer);
  return (
    <div className="account">
      <h1>{heading}</h1>
      <h1>{customer.defaultAddress.id}</h1>
      {subscriptionsResponse.subscriptions && (        
        <AccountSubscriptions subscriptions={subscriptionsResponse.subscriptions} />
      )}
      <br />
      {/*<AccountMenu />*/}
      <br />
      <br />
      <Outlet context={{customer}} />
    </div>
  );
}

function AccountMenu() {
  function isActiveStyle({isActive, isPending}) {
    return {
      fontWeight: isActive ? 'bold' : undefined,
      color: isPending ? 'grey' : 'black',
    };
  }

  return (
    <nav role="navigation">
      <NavLink to="/account/orders" style={isActiveStyle}>
        Orders &nbsp;
      </NavLink>
      &nbsp;|&nbsp;
      <NavLink to="/account/profile" style={isActiveStyle}>
        &nbsp; Profile &nbsp;
      </NavLink>
      &nbsp;|&nbsp;
      <NavLink to="/account/addresses" style={isActiveStyle}>
        &nbsp; Addresses &nbsp;
      </NavLink>
      &nbsp;|&nbsp;
      <Logout />
    </nav>
  );
}

function Logout() {
  return (
    <Form className="account-logout" method="POST" action="/account/logout">
      &nbsp;<button type="submit">Sign out</button>
    </Form>
  );
}

function AccountSubscriptions({ subscriptions }) {
  return (
    <div className="mt-6">
      <div className="grid w-full gap-4 p-4 py-6 md:gap-8 md:p-8 lg:p-12">
        <h2 className="font-bold text-lead">Active Subscriptions</h2>
        {subscriptions?.length ? <Subscriptions subscriptions={subscriptions} /> : <EmptySubscriptions />}
      </div>
    </div>
  );
}

function Subscriptions({ subscriptions }) {
  return (
    <ul className="grid grid-flow-row grid-cols-1 gap-2 gap-y-6 md:gap-4 lg:gap-6 false sm:grid-cols-3">
      {subscriptions.map(subscription => (
        <SubscriptionCard subscription={subscription} key={subscription.id} />
      ))}
    </ul>
  );
}

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
