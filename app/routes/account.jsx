import { listSubscriptions } from '@rechargeapps/storefront-client';
import { SubscriptionCard } from '~/components/SubscriptionCard';
import { rechargeQueryWrapper } from '~/lib/rechargeUtils';

// inside the loader function after the customer check
const subscriptionsResponse = await rechargeQueryWrapper(
  session =>
    listSubscriptions(session, {
      limit: 25,
      status: 'active',
    }),
  context
);

// make sure you return subscriptionResponse from the loader and commit the session changes to both cookies
const headers = new Headers({
  'Cache-Control': CACHE_NONE,
  'Set-Cookie': await context.session.commit(),
});
headers.append('Set-Cookie', await context.rechargeSession.commit());

return defer(
  {
    customer,
    heading,
    subscriptionsResponse,
    featuredDataPromise: getFeaturedData(context.storefront),
  },
  {
    headers,
  }
);

// add subscriptionResponse to the Account props and add AccountSubscriptions rendering to the Account Component
function Account({ customer, heading, featuredDataPromise, subscriptionsResponse }) {
  const orders = flattenConnection(customer.orders);
  const addresses = flattenConnection(customer.addresses);

  return (
    <>
      <PageHeader heading={heading}>
        <Form method="post" action={usePrefixPathWithLocale('/account/logout')}>
          <button type="submit" className="text-primary/50">
            Sign out
          </button>
        </Form>
      </PageHeader>
      {subscriptionsResponse.subscriptions && (
        <AccountSubscriptions subscriptions={subscriptionsResponse.subscriptions} />
      )}
      {orders && <AccountOrderHistory orders={orders} />}
      <AccountDetails customer={customer} />
      <AccountAddressBook addresses={addresses} customer={customer} />
      {!orders.length && (
        <Suspense>
          <Await resolve={featuredDataPromise} errorElement="There was a problem loading featured products.">
            {data => (
              <>
                <FeaturedCollections title="Popular Collections" collections={data.featuredCollections} />
                <ProductSwimlane products={data.featuredProducts} />
              </>
            )}
          </Await>
        </Suspense>
      )}
    </>
  );
}

// Add additional needed local components
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

function EmptySubscriptions() {
  return (
    <div>
      <Text className="mb-1" size="fine" width="narrow" as="p">
        You don&apos;t have any active subscriptions.
      </Text>
      <div className="w-48">
        <Button className="w-full mt-2 text-sm" variant="secondary" to={usePrefixPathWithLocale('/')}>
          Start Shopping
        </Button>
      </div>
    </div>
  );
}