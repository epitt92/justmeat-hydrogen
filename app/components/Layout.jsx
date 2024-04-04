import { Suspense, useState } from 'react'
import { Await } from '@remix-run/react'

import { Footer } from '~/components/Footer'
import { Header } from '~/components/Header'
import OrderHeader from './OrderHeader'
import { LayoutContext } from '~/contexts'
import { MobileMenuAside } from './MobileMenuAside'

export function Layout({
  cart,
  children = null,
  footer,
  header,
  isLoggedIn,
  isProductPage,
}) {
  const [menuToggle, setMenuToggle] = useState(false)

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
