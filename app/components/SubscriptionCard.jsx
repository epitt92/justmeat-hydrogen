import { Money } from '@shopify/hydrogen';

import Link from '../components/Link';
import Heading from '../components/Heading';
import Text from '~/components/Text'; 

export function SubscriptionCard({ subscription, shopCurrency = 'USD' }) {
  if (!subscription?.id) return null;

  return (
    <li className="grid text-center border rounded">
      <Link
        className="grid items-center gap-4 p-4 md:gap-6 md:p-6 md:grid-cols-2"
        to={`/account/subscriptions/${subscription.id}`}
        prefetch="intent"
      >
        <div className={`flex-col justify-center text-left md:col-span-2`}>
          <Heading as="h3" format size="copy">
            {`${subscription.product_title}${subscription.variant_title ? ` (${subscription.variant_title})` : ''}`}
          </Heading>
          <dl className="grid grid-gap-1">
            <dt className="sr-only">Subscription ID</dt>
            <dd>
              <Text size="fine" color="subtle">
                Subscription No. {subscription.id}
              </Text>
            </dd>
            <dt className="sr-only">Subscription Date</dt>
            <dd>
              <Text size="fine" color="subtle">
                {new Date(subscription.created_at).toDateString()}
              </Text>
            </dd>
            <dt className="sr-only">Frequency</dt>
            <dd className="mt-2">
              <Text size="fine">{`${subscription.quantity} Every ${subscription.order_interval_frequency} ${subscription.order_interval_unit}(s)`}</Text>
            </dd>
            <dt className="sr-only">Price</dt>
            <dd className="mt-2">
              <Text size="fine">
                <Money
                  data={{
                    amount: subscription.price,
                    currencyCode: subscription.presentment_currency ?? shopCurrency,
                  }}
                />
              </Text>
            </dd>
          </dl>
        </div>
      </Link>
      <div className="self-end border-t">
        <Link
          className="block w-full p-2 text-center"
          to={`/account/subscriptions/${subscription.id}`}
          prefetch="intent"
        >
          <Text color="subtle" className="ml-3">
            View Details
          </Text>
        </Link>
      </div>
    </li>
  );
}