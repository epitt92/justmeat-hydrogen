import { useState, useEffect } from 'react'
import { Script, useNonce } from '@shopify/hydrogen'
import { defer } from '@shopify/remix-oxygen'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  LiveReload,
  useMatches,
  useRouteError,
  useLoaderData,
  ScrollRestoration,
  isRouteErrorResponse,
} from '@remix-run/react'

import sliderStyles from 'swiper/css'
import sliderNavigation from 'swiper/css/navigation'
import sliderPagination from 'swiper/css/pagination'

import favicon from '../public/favicon.svg'
import appStyles from '~/styles/app.css'
import tailwindStyles from '~/styles/tailwind.css'
import { RootContext } from '~/contexts'
import { Layout } from '~/components/Layout'
import { SubscriptionCard } from '~/components/SubscriptionCard'
import { FOOTER_QUERY, HEADER_QUERY } from '~/graphql/HeaderMenuFooter'

export const shouldRevalidate = ({ formMethod, currentUrl, nextUrl }) => {
  // revalidate when a mutation is performed e.g add to cart, login...
  if (formMethod && formMethod !== 'GET') {
    return true
  }

  // revalidate when manually revalidating via useRevalidator
  if (currentUrl.toString() === nextUrl.toString()) {
    return true
  }

  return false
}

export function links() {
  return [
    // {rel: 'stylesheet', href: resetStyles},
    { rel: 'stylesheet', href: appStyles },
    { rel: 'stylesheet', href: sliderStyles },
    { rel: 'stylesheet', href: sliderNavigation },
    { rel: 'stylesheet', href: sliderPagination },
    { rel: 'stylesheet', href: tailwindStyles },
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    { rel: 'icon', type: 'image/svg+xml', href: favicon },
  ]
}

export const useRootLoaderData = () => {
  const [root] = useMatches()
  return root?.data
}

export async function loader({ context }) {
  const { storefront, customerAccount, cart } = context
  const publicStoreDomain = context.env.PUBLIC_STORE_DOMAIN

  const isLoggedInPromise = customerAccount.isLoggedIn()
  const cartPromise = cart.get()

  // defer the footer query (below the fold)
  const footerPromise = storefront.query(FOOTER_QUERY, {
    cache: storefront.CacheLong(),
    variables: {
      footerMenuHandle: 'footer', // Adjust to your footer menu handle
    },
  })

  // await the header query (above the fold)
  const headerPromise = storefront.query(HEADER_QUERY, {
    cache: storefront.CacheLong(),
    variables: {
      headerMenuHandle: 'main-menu', // Adjust to your header menu handle
    },
  })

  return defer(
    {
      cart: cartPromise,
      footer: footerPromise,
      header: await headerPromise,
      isLoggedIn: isLoggedInPromise,
      publicStoreDomain,
    },
    {
      headers: {
        'Set-Cookie': await context.session.commit(),
      },
    },
  )
}

export default function App() {
  const nonce = useNonce()
  const data = useLoaderData()

  const [cartSellingPlan, _setCartSellingPlan] = useState(
    'Delivery every 15 Days',
  )
  const [cartProducts, _setCartProducts] = useState([])
  const [cartBonusVariant, _setCartBonusVariant] = useState(null)
  const [cartSellingPlanFrequency, _setCartSellingPlanFrequency] = useState(
    'Delivery every 15 Days',
  )

  const [subscriptionSellingPlan, setSubscriptionSellingPlan] = useState('')
  const [subscriptionProducts, setSubscriptionProducts] = useState([])
  const [subscriptionBonusVariant, setSubscriptionBonusVariant] = useState(null)
  const [
    subscriptionSellingPlanFrequency,
    setSubscriptionSellingPlanFrequency,
  ] = useState('')

  const cartCount = cartProducts.reduce((prev, item) => prev + item.quantity, 0)
  const cartCost = cartProducts.reduce(
    (acc, curr) => acc + parseFloat(curr.totalAmount),
    0,
  )
  const subscriptionCost = subscriptionProducts.reduce(
    (acc, curr) => acc + parseFloat(curr.totalAmount),
    0,
  )

  useEffect(() => {
    const _cartSellingPlan = window.localStorage.getItem('_cartSellingPlan')
    const _cartProducts = window.localStorage.getItem('_cartProducts')
    const _cartBonusVariant = window.localStorage.getItem('_cartBonusVariant')
    const _cartSellingPlanFrequency = window.localStorage.getItem(
      '_cartSellingPlanFrequency',
    )

    if (_cartSellingPlan) {
      _setCartSellingPlan(JSON.parse(_cartSellingPlan))
    }
    if (_cartSellingPlanFrequency) {
      _setCartSellingPlanFrequency(JSON.parse(_cartSellingPlanFrequency))
    }
    if (_cartProducts) {
      _setCartProducts(JSON.parse(_cartProducts))
    }
    if (_cartBonusVariant) {
      setCartBonusVariant(JSON.parse(_cartBonusVariant))
    }
  }, [])

  const setCartSellingPlan = (value) => {
    _setCartSellingPlan(value)
    window.localStorage.setItem('_cartSellingPlan', JSON.stringify(value))
  }

  const setCartSellingPlanFrequency = (value) => {
    _setCartSellingPlanFrequency(value)
    window.localStorage.setItem(
      '_cartSellingPlanFrequency',
      JSON.stringify(value),
    )
  }

  const setCartProducts = (value) => {
    _setCartProducts(value)

    window.localStorage.setItem('_cartProducts', JSON.stringify(value))
  }

  const setCartBonusVariant = (value) => {
    _setCartBonusVariant(value)
    window.localStorage.setItem('_cartBonusVariant', JSON.stringify(value))
  }

  return (
    <RootContext.Provider
      value={{
        cartCost,
        cartCount,
        cartProducts,
        cartSellingPlan,
        cartSellingPlanFrequency,
        cartBonusVariant,
        subscriptionCost,
        subscriptionSellingPlan,
        subscriptionProducts,
        subscriptionSellingPlanFrequency,
        subscriptionBonusVariant,
        setCartProducts,
        setCartSellingPlan,
        setCartSellingPlanFrequency,
        setCartBonusVariant,
        setSubscriptionSellingPlan,
        setSubscriptionProducts,
        setSubscriptionSellingPlanFrequency,
        setSubscriptionBonusVariant,
      }}
    >
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <Meta />
          <Links />
          <Script async src="https://cdn.reamaze.com/assets/reamaze.js" />
          <Script
            async
            type="text/javascript"
            src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=UMcvkS"
          />
        </head>
        <body>
          <SubscriptionCard></SubscriptionCard>
          <Layout {...data}>
            <Outlet />
          </Layout>
          <ScrollRestoration nonce={nonce} />
          <Scripts nonce={nonce} />
          <LiveReload nonce={nonce} />
          <Script
            async
            src="//loox.io/widget/loox.js?shop=just-meats-sandbox.myshopify.com"
          ></Script>
        </body>
      </html>
    </RootContext.Provider>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()
  const rootData = useRootLoaderData()
  const nonce = useNonce()
  let errorMessage = 'Unknown error'
  let errorStatus = 500

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data
    errorStatus = error.status
  } else if (error instanceof Error) {
    errorMessage = error.message
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="route-error">
          <h1>Oops</h1>
          <h2>{errorStatus}</h2>
          {errorMessage && (
            <fieldset>
              <pre>{errorMessage}</pre>
            </fieldset>
          )}
        </div>
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        <LiveReload nonce={nonce} />

        <Scripts src="//loox.io/widget/loox.js?shop=just-meats-sandbox.myshopify.com"></Scripts>
        <Script
          async
          type="text/javascript"
          src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=UMcvkS"
        />
      </body>
    </html>
  )
}
