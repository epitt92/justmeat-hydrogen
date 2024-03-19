// import clsx from 'clsx';
import { json, redirect } from '@shopify/remix-oxygen';
import { useLoaderData } from '@remix-run/react';
import { Money } from '@shopify/hydrogen';
import { getActiveChurnLandingPageURL, getSubscription } from '@rechargeapps/storefront-client';

// import { Link, Heading, PageHeader, Text, Button } from '~/components';
import Link from '../components/Link';
import Heading from '../components/Heading';
import Text from '~/components/Text';
import Button from '~/components/Button';

import { rechargeQueryWrapper } from '~/lib/rechargeUtils';
// import { CACHE_NONE } from '~/data/cache';

export const meta = ({ data }) => {
  return [
    {
      title: `Subscription ${data?.subscription?.product_title}${
        data?.subscription?.variant_title ? ` (${data?.subscription?.variant_title})` : ''
      }`,
    },
  ];
};

export async function loader({ request, context, params }) {
  if (!params.id) {
    return redirect(params?.locale ? `${params.locale}/account` : '/account');
  }

  const subscription = await rechargeQueryWrapper(
    session =>
      getSubscription(session, params.id, {
        include: ['address'],
      }),
    context
  );

  if (!subscription) {
    throw new Response('Subscription not found', { status: 404 });
  }

  const cancelUrl = await rechargeQueryWrapper(
    session => getActiveChurnLandingPageURL(session, params.id, request.url),
    context
  );

  const { product } = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      id: `gid://shopify/Product/${subscription.external_variant_id.ecommerce}`,
    },
  });

  return json(
    {
      subscription,
      product,
      cancelUrl,
      shopCurrency: 'USD',
    },
    {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Set-Cookie': await context.rechargeSession.commit(),
      },
    }
  );
}

export default function SubscriptionRoute() {
  const { subscription, product, cancelUrl, shopCurrency } = useLoaderData();
  const address = subscription.include?.address;
  return (
    <div>
      <div heading="Subscription detail">
        <Link to="/account">
          <Text color="subtle">Return to Account Overview</Text>
        </Link>
      </div>
      <div className="w-full p-6 sm:grid-cols-1 md:p-8 lg:p-12 lg:py-6">
        <div>
          <Text as="h3" size="lead">
            Subscription No. {subscription.id}
          </Text>
          <Text className="mt-2" as="p">
            Placed on {new Date(subscription.created_at).toDateString()}
          </Text>
          <div className="grid items-start gap-12 sm:grid-cols-1 md:grid-cols-4 md:gap-16 sm:divide-y sm:divide-gray-200">
            <table className="min-w-full my-8 divide-y divide-gray-300 md:col-span-3">
              <thead>
                <tr className="align-baseline ">
                  <th scope="col" className="pb-4 pl-0 pr-3 font-semibold text-left">
                    Product
                  </th>
                  <th scope="col" className="hidden px-4 pb-4 font-semibold text-right sm:table-cell md:table-cell">
                    Price
                  </th>
                  <th scope="col" className="hidden px-4 pb-4 font-semibold text-right sm:table-cell md:table-cell">
                    Quantity
                  </th>
                  <th scope="col" className="px-4 pb-4 font-semibold text-right">
                    Frequency
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="w-full py-4 pl-0 pr-3 align-top sm:align-middle max-w-0 sm:w-auto sm:max-w-none">
                    <div className="flex gap-6">
                      <Link to={`/products/${product?.handle}`}>View Product</Link>
                      <div className="flex-col justify-center hidden lg:flex">
                        <Text as="p">{subscription.product_title}</Text>
                        {subscription.variant_title && (
                          <Text size="fine" className="mt-1" as="p">
                            {subscription.variant_title}
                          </Text>
                        )}
                      </div>
                      <dl className="grid">
                        <dt className="sr-only">Product</dt>
                        <dd className="truncate lg:hidden">
                          <Heading size="copy" format as="h3">
                            {subscription.product_title}
                          </Heading>
                          {subscription.variant_title && (
                            <Text size="fine" className="mt-1">
                              {subscription.variant_title}
                            </Text>
                          )}
                        </dd>
                        <dt className="sr-only">Price</dt>
                        <dd className="truncate sm:hidden">
                          <Text size="fine" className="mt-4">
                            <Money
                              data={{
                                amount: subscription.price,
                                currencyCode: subscription.presentment_currency ?? shopCurrency,
                              }}
                            />
                          </Text>
                        </dd>
                        <dt className="sr-only">Quantity</dt>
                        <dd className="truncate sm:hidden">
                          <Text className="mt-1" size="fine">
                            Qty: {subscription.quantity}
                          </Text>
                        </dd>
                      </dl>
                    </div>
                  </td>
                  <td className="hidden px-3 py-4 text-right align-top sm:align-middle sm:table-cell">
                    <Money
                      data={{
                        amount: subscription.price,
                        currencyCode: subscription.presentment_currency ?? shopCurrency,
                      }}
                    />
                  </td>
                  <td className="hidden px-3 py-4 text-right align-top sm:align-middle sm:table-cell">
                    {subscription.quantity}
                  </td>
                  <td className="px-3 py-4 text-right align-top sm:align-middle sm:table-cell">
                    <Text>
                      {`Every ${subscription.order_interval_frequency} ${subscription.order_interval_unit}(s)`}
                    </Text>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="sticky border-none top-nav md:my-8">
              <Heading size="copy" className="font-semibold" as="h3">
                Address
              </Heading>
              {address ? (
                <ul className="mt-6">
                  <li>
                    <Text>
                      {address.first_name && address.first_name + ' '}
                      {address.last_name}
                    </Text>
                  </li>
                  {address ? (
                    <>
                      <li>
                        <Text>{address.address1}</Text>
                      </li>
                      {address.address2 && (
                        <li>
                          <Text>{address.address2}</Text>
                        </li>
                      )}
                      <li>
                        <Text>
                          {address.city} {address.province} {address.zip} {address.country_code}
                        </Text>
                      </li>
                    </>
                  ) : (
                    <></>
                  )}
                </ul>
              ) : (
                <p className="mt-3">No address defined</p>
              )}
              <Heading size="copy" className="mt-8 font-semibold" as="h3">
                Status
              </Heading>
              <div
                className="mt-3 px-3 py-1 text-xs font-medium rounded-full inline-block w-auto bg-green-100 text-green-800">
                <Text size="fine" className="uppercase">
                  {subscription.status}
                </Text>
              </div>
            </div>
          </div>
        </div>
        {subscription.status === 'active' && (
          <Button as={Link} variant="secondary" to={cancelUrl}>
            Cancel Subscription
          </Button>
        )}
      </div>
    </div>
  );
}

const PRODUCT_QUERY = `#graphql
  query getProductById($id: ID!) {
    product(id: $id) {
      id
      handle
    }
  }
`;