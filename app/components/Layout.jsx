import { Suspense, useState } from 'react'

import { Await, useMatches } from '@remix-run/react'

import { Footer } from '~/components/Footer'
import { Footer as NewFooter } from '~/components/NewFooter'
import { Header } from '~/components/Header'
import { Header as NewHeader } from '~/components/NewHeader'
import { LayoutContext } from '~/contexts'

import { MobileMenuAside } from './MobileMenuAside'
import OrderHeader from './OrderHeader'

const newLayoutRoutes = ['mayhem-madness', 'rich-froning']

export function Layout({
  cart,
  children = null,
  footer,
  header,
  isLoggedIn,
  isProductPage,
}) {
  const [menuToggle, setMenuToggle] = useState(false)

  // Quick PATCH
  const matches = useMatches()
  const { pathname } = matches.at(-1)
  const route = pathname.split('/')[1]
  const isNewLayout = newLayoutRoutes.includes(route)

  if (isNewLayout)
    return (
      <LayoutContext.Provider value={{ menuToggle, setMenuToggle }}>
        <NewHeader header={header} cart={cart} isLoggedIn={isLoggedIn} />
        
        <main>{children}</main>
        <Suspense>
          <Await resolve={footer}>
            {(footer) => <NewFooter menu={footer?.menu} shop={header?.shop} />}
          </Await>
        </Suspense>
      </LayoutContext.Provider>
    )

    return (
      <LayoutContext.Provider value={{ menuToggle, setMenuToggle }}>
        {isProductPage ? (
          <OrderHeader />
        ) : (
          <>
            {header && (
              <Header header={header} cart={cart} isLoggedIn={isLoggedIn} />
            )}
            <div>{isProductPage}</div>
          </>
        )}
        <MobileMenuAside menu={header?.menu} shop={header?.shop} />
        <main>{children}</main>
        <Suspense>
          <Await resolve={footer}>
            {(footer) => <Footer menu={footer?.menu} shop={header?.shop} />}
          </Await>
        </Suspense>
      </LayoutContext.Provider>
    )
}
