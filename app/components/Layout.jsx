import { Suspense, useContext, useState } from 'react'

import { Await } from '@remix-run/react'

import { Footer } from '~/components/Footer'
import { Header } from '~/components/Header'
import { Footer as NewFooter } from '~/components/NewFooter'
import { Header as NewHeader } from '~/components/NewHeader'
import { LayoutContext, RootContext } from '~/contexts'

import { MobileMenuAside } from './MobileMenuAside'
import OrderHeader from './OrderHeader'

export function Layout({
  cart,
  children = null,
  footer,
  header,
  isLoggedIn,
  isProductPage,
}) {
  const [menuToggle, setMenuToggle] = useState(false)
  const { isNewLayout } = useContext(RootContext)

  if (isNewLayout)
    return (
      <LayoutContext.Provider value={{ menuToggle, setMenuToggle }}>
        <NewHeader header={header} cart={cart} isLoggedIn={isLoggedIn} />

        {children}
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
