import { json } from '@shopify/remix-oxygen'
import { Form, NavLink, Outlet, useLoaderData } from '@remix-run/react'
import { CUSTOMER_DETAILS_QUERY } from '~/graphql/customer-account/CustomerDetailsQuery'
export function shouldRevalidate() {
  return true
}

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({ context }) {
  const { data, errors } = await context.customerAccount.query(
    CUSTOMER_DETAILS_QUERY,
  )

  if (errors?.length || !data?.customer) {
    throw new Error('Customer not found')
  }
  return json({
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Set-Cookie': await context.session.commit(),
    },
    customer: data.customer,
  })
}

export default function AccountLayout() {
  /** @type {LoaderReturnData} */
  const { customer } = useLoaderData()
  return (
    <div className="account">
      <AccountMenu />
      <Outlet context={{ customer }} />
    </div>
  )
}
function AccountMenu() {
  function isActiveStyle({ isActive, isPending }) {
    return {
      fontWeight: isActive ? 'bold' : undefined,
      color: isPending ? 'grey' : 'black',
    }
  }

  return (
    <div className="py-3">
      <nav
        role="navigation"
        className="font-Roboto text-lg font-normal flex flex-col sm:flex-row justify-center text-center gap-0 sm:gap-2 lg:gap-[8.5rem]"
      >
        <NavLink to="/account/subscriptions" style={isActiveStyle}>
          Subscriptions &nbsp;
        </NavLink>

        <NavLink to="/account/order-history" style={isActiveStyle}>
          &nbsp; Order History &nbsp;
        </NavLink>

        <NavLink to="/account/account-details" style={isActiveStyle}>
          &nbsp; Account Details &nbsp;
        </NavLink>

        <Logout />
      </nav>
    </div>
  )
}

function Logout() {
  return (
    <Form className="account-logout" method="POST" action="/account/logout">
      &nbsp;<button type="submit">Logout</button>
    </Form>
  )
}

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
