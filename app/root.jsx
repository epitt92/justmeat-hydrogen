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

import favicon from '../public/favicon.svg'
import appStyles from '~/styles/app.css'
import tailwindStyles from '~/styles/tailwind.css'
import { RootContext } from '~/contexts'
import { Layout } from '~/components/Layout'
import { SubscriptionCard } from '~/components/SubscriptionCard'

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
  const nonce = useNonce()
  const data = useLoaderData()
  const [sellingPlan, _setSellingPlan] = useState(null)
  const [selectedProducts, _setSelectedProducts] = useState([])
  const [bonusVariant, _setBonusVariant] = useState(null)
  const [sellingPlanFrequency, _setSellingPlanFrequency] = useState(
    'Delivery every 15 Days',
  )

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
  }, [])

  const setSellingPlan = (value) => {
    _setSellingPlan(value)
    window.localStorage.setItem('_sellingPlan', JSON.stringify(value))
  }

  const setSellingPlanFrequency = (value) => {
    _setSellingPlanFrequency(value)
    window.localStorage.setItem('_sellingPlanFrequency', JSON.stringify(value))
  }

  const setSelectedProducts = (value) => {
    _setSelectedProducts(value)
    window.localStorage.setItem('_selectedProducts', JSON.stringify(value))
  }

  const setBonusVariant = (value) => {
    _setBonusVariant(value)
    window.localStorage.setItem('_bonusVariant', JSON.stringify(value))
  }

  return (
    <RootContext.Provider
      value={{
        sellingPlan,
        setSellingPlan,
        selectedProducts,
        setSelectedProducts,
        sellingPlanFrequency,
        setSellingPlanFrequency,
        bonusVariant,
        setBonusVariant,
        totalCost,
      }}
    >
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <Meta />
          <Links />
          <Script
            async={true}
            src="https://cdn.reamaze.com/assets/reamaze.js"
          />
          <Script src="/chat.js" />
        </head>
        <body>
          <SubscriptionCard></SubscriptionCard>
          <Layout {...data}>
            <Outlet />
          </Layout>
          <ScrollRestoration nonce={nonce} />
          <Scripts nonce={nonce} />
          <LiveReload nonce={nonce} />
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
      </body>
    </html>
  )
}

const MENU_FRAGMENT = `#graphql
  fragment MenuItem on MenuItem {
    id
    resourceId
    tags
    title
    type
    url
  }
  fragment ChildMenuItem on MenuItem {
    ...MenuItem
  }
  fragment ParentMenuItem on MenuItem {
    ...MenuItem
    items {
      ...ChildMenuItem
    }
  }
  fragment Menu on Menu {
    id
    items {
      ...ParentMenuItem
    }
  }
`

const HEADER_QUERY = `#graphql
  fragment Shop on Shop {
    id
    name
    description
    primaryDomain {
      url
    }
    brand {
      logo {
        image {
          url
        }
      }
    }
  }
  query Header(
    $country: CountryCode
    $headerMenuHandle: String!
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    shop {
      ...Shop
    }
    menu(handle: $headerMenuHandle) {
      ...Menu
    }
  }
  ${MENU_FRAGMENT}
`

const FOOTER_QUERY = `#graphql
  query Footer(
    $country: CountryCode
    $footerMenuHandle: String!
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    menu(handle: $footerMenuHandle) {
      ...Menu
    }
  }
  ${MENU_FRAGMENT}
`

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @typedef {import('@remix-run/react').ShouldRevalidateFunction} ShouldRevalidateFunction */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').CustomerAccessToken} CustomerAccessToken */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<loader>} LoaderReturnData */
