import {Link, useLoaderData} from '@remix-run/react';
import {
  Money,
  Pagination,
  getPaginationVariables,
  flattenConnection,
} from '@shopify/hydrogen';
import {json} from '@shopify/remix-oxygen';
import {CUSTOMER_ORDERS_QUERY} from '~/graphql/customer-account/CustomerOrdersQuery';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'Orders'}];
};

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({request, context}) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 20,
  });

  const {data, errors} = await context.customerAccount.query(
    CUSTOMER_ORDERS_QUERY,
    {
      variables: {
        ...paginationVariables,
      },
    },
  );

  if (errors?.length || !data?.customer) {
    throw Error('Customer orders not found');
  }

  return json(
    {customer: data.customer},
    {
      headers: {
        'Set-Cookie': await context.session.commit(),
      },
    },
  );
}

export default function Orders() {
  /** @type {LoaderReturnData} */
  const {customer} = useLoaderData();
  const {orders} = customer;
  return (
    <div className="w-[95%] md:w-[80%] mx-auto">
      <div className='flex flex-col md:flex-row justify-center gap-8 md:gap-[30px] w-full mb-28'>
      
      <div className='basis-8/12 border border-gray p-0 rounded-[13px] '>
      {orders.nodes.length ? <OrdersTable orders={orders} /> : <EmptyOrders />}
      </div>
      <div className='basis-4/12  rounded-[13px]'>
        <CustomerDetails/>
      </div>
      </div>
      
    </div>
  );
}

/**
 * @param {Pick<CustomerOrdersFragment, 'orders'>}
 */
function OrdersTable({orders}) {
  return (
    <div className="acccount-orders w-full">
      {orders?.nodes.length ? (
        <Pagination connection={orders}>
          {({nodes, isLoading, PreviousLink, NextLink}) => {
            return (
              <>
                <PreviousLink>
                  {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
                </PreviousLink>
                <table className='w-full flex flex-col '>
                  <thead className='pb-2 ' >
                    <tr className='w-full flex px-9 rounded-t-xl text-center bg-gray-200 py-3 border-b-2 text-start '>
                      <th className='w-1/5 text-center'>Order</th>
                      <th className='w-1/5 text-center'>Date</th>
                      <th className='w-1/5 text-center'>Payment Status</th>
                      <th className='w-1/5 text-center'>Fullfillment status</th>
                      <th className='w-1/5 text-center'>Total</th>
                    </tr>
                  </thead>
                <tbody>
          
                {nodes.map((order) => {
                  return <OrderItem key={order.id} order={order} />;
                })}
          
              </tbody>
              </table>

               
                <NextLink>
                  {isLoading ? 'Loading...' : <span>Load more ↓</span>}
                </NextLink>
              </>
            );
          }}
        </Pagination>
      ) : (
        <EmptyOrders />
      )}
    </div>
  );
}

function EmptyOrders() {
  return (
    <div>
      <p>You haven&apos;t placed any orders yet.</p>
      <br />
      <p>
        <Link to="/collections">Start Shopping →</Link>
      </p>
    </div>
  );
}

/**
 * @param {{order: OrderItemFragment}}
 */
function OrderItem({order}) {
  const fulfillmentStatus = flattenConnection(order.fulfillments)[0]?.status;
  return (

    <>
        <tr className='w-full flex text-start  items-center px-8 py-3 text-center'>
          <td className='w-1/5 text-center'>  <Link to={`/account/orders/${order.id}`}>
                <strong>#{order.number}</strong>
                </Link>
          </td>
          <td className='w-1/5 text-center'><p>{new Date(order.processedAt).toDateString()}</p></td>
          <td className='w-1/5 text-center'><p>{order.financialStatus}</p></td>
          <td className='w-1/5 text-center'>{fulfillmentStatus}</td>
          <td className='w-1/5 text-center'><Money data={order.totalPrice} /></td>
      </tr>
    </>
  );
}
const CustomerDetails = ()=>{
  return(
    <div class="w-full border border-gray p-0 rounded-[13px]  text-start text-black ">
      <div class="bg-[#E5E7EB] rounded-t-xl  px-6 py-3">
        Brandn Barclay
      </div>
      <div class="p-6">
        <h2 class="mb-2 text-xl font-medium leading-tight ">
        Brandn Barclay
        </h2>
        <p class="mb-4 text-base ">
          address
        </p>
        <p class="mb-4 text-base ">
          address 2
        </p>
      </div>
    </div>
  );
}

/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @typedef {import('customer-accountapi.generated').CustomerOrdersFragment} CustomerOrdersFragment */
/** @typedef {import('customer-accountapi.generated').OrderItemFragment} OrderItemFragment */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
