import { useState, useEffect } from 'react'
import { useNonce } from '@shopify/hydrogen'
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

import favicon from '../public/favicon.svg'
import appStyles from '~/styles/app.css'
import tailwindStyles from '~/styles/tailwind.css'
import { RootContext } from '~/contexts'
import { Layout } from '~/components/Layout'
import { SubscriptionCard } from '~/components/SubscriptionCard'
import { FOOTER_QUERY, HEADER_QUERY } from '~/graphql/HeaderMenuFooter'

/**
 * This is important to avoid re-fetching root queries on sub-navigations
 * @type {ShouldRevalidateFunction}
 */
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

/**
 * Access the result of the root loader from a React component.
 * @return {LoaderReturnData}
 */
export const useRootLoaderData = () => {
  const [root] = useMatches()
  return root?.data
}

/**
 * @param {LoaderFunctionArgs}
 */
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
  const matches = useMatches()
  const nonce = useNonce()
  const data = useLoaderData()

  const isCustomBundlePage =
    matches.at(-1).pathname === '/products/custom-bundle'

  const [sellingPlan, _setSellingPlan] = useState(
    isCustomBundlePage ? 'Delivery every 15 Days' : '',
  )
  const [selectedProducts, _setSelectedProducts] = useState([])
  const [bonusVariant, _setBonusVariant] = useState(null)
  const [sellingPlanFrequency, _setSellingPlanFrequency] = useState(
    isCustomBundlePage ? 'Delivery every 15 Days' : '',
  )
  const [cartProductsCount, setCartProductsCount] = useState(0)

  const totalCost = selectedProducts.reduce(
    (acc, curr) => acc + parseFloat(curr.totalAmount),
    0,
  )

  useEffect(() => {
    const _sellingPlan = window.localStorage.getItem('_sellingPlan')
    const _selectedProducts = window.localStorage.getItem('_selectedProducts')
    const _bonusVariant = window.localStorage.getItem('_bonusVariant')
    const _sellingPlanFrequency = window.localStorage.getItem(
      '_sellingPlanFrequency',
    )

    if (_selectedProducts) {
      const products = JSON.parse(_selectedProducts)
      const count = products.reduce((prev, item) => prev + item.quantity, 0)
      setCartProductsCount(count)
    }

    if (isCustomBundlePage) {
      if (_sellingPlan) {
        _setSellingPlan(JSON.parse(_sellingPlan))
      }
      if (_sellingPlanFrequency) {
        _setSellingPlanFrequency(JSON.parse(_sellingPlanFrequency))
      }
      if (_selectedProducts) {
        _setSelectedProducts(JSON.parse(_selectedProducts))
      }
      if (_bonusVariant) {
        setBonusVariant(JSON.parse(_bonusVariant))
      }
    }
  }, [])

  const setSellingPlan = (value) => {
    _setSellingPlan(value)
    if (isCustomBundlePage) {
      window.localStorage.setItem('_sellingPlan', JSON.stringify(value))
    }
  }

  const setSellingPlanFrequency = (value) => {
    _setSellingPlanFrequency(value)
    if (isCustomBundlePage) {
      window.localStorage.setItem(
        '_sellingPlanFrequency',
        JSON.stringify(value),
      )
    }
  }

  const setSelectedProducts = (value) => {
    _setSelectedProducts(value)

    if (isCustomBundlePage) {
      window.localStorage.setItem('_selectedProducts', JSON.stringify(value))

      const count = value.reduce((prev, item) => prev + item.quantity, 0)
      setCartProductsCount(count)
    }
  }

  const setBonusVariant = (value) => {
    _setBonusVariant(value)
    if (isCustomBundlePage) {
      window.localStorage.setItem('_bonusVariant', JSON.stringify(value))
    }
  }

  return (
    <RootContext.Provider
      value={{
        fromOrder: isCustomBundlePage,
        sellingPlan,
        setSellingPlan,
        selectedProducts,
        setSelectedProducts,
        sellingPlanFrequency,
        setSellingPlanFrequency,
        bonusVariant,
        setBonusVariant,
        totalCost,
        cartProductsCount,
      }}
    >
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          <SubscriptionCard></SubscriptionCard>
          <Layout {...data}>
            <Outlet />
          </Layout>
          <ScrollRestoration nonce={nonce} />
          <Scripts nonce={nonce} />
          <LiveReload nonce={nonce} />
          <script
            async
            src="//loox.io/widget/loox.js?shop=just-meats-sandbox.myshopify.com"
          ></script>
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
        <Layout {...rootData}>
          <div className="route-error">
            <h1>Oops</h1>
            <h2>{errorStatus}</h2>
            {errorMessage && (
              <fieldset>
                <pre>{errorMessage}</pre>
              </fieldset>
            )}
          </div>
        </Layout>
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        <LiveReload nonce={nonce} />

        <script
          async
          src="//loox.io/widget/loox.js?shop=just-meats-sandbox.myshopify.com"
        ></script>
      </body>
    </html>
  )
}
