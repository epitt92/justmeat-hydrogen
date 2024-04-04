import { Suspense, useState } from 'react'
import { Await, NavLink } from '@remix-run/react'

import { Button } from '~/components/Button'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/Header'
import OrderHeader from './OrderHeader'
import { HamburgerClose } from '~/icons/HamburgerClose'

/**
 * @param {LayoutProps}
 */

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
    <>
      {/* <CartAside cart={cart} /> */}
      {/* <SearchAside /> */}
      {/* {header && <Header header={header} cart={cart} isLoggedIn={isLoggedIn} />} */}
      {/* <OrderHeader/> */}
      {isProductPage ? (
        <OrderHeader />
      ) : (
        <>
          {header && (
            <Header
              header={header}
              setMenuToggle={setMenuToggle}
              cart={cart}
              isLoggedIn={isLoggedIn}
            />
          )}
          <div>{isProductPage}</div>
        </>
      )}
      <MobileMenuAside
        menu={header?.menu}
        menuToggle={menuToggle}
        setMenuToggle={setMenuToggle}
        shop={header?.shop}
      />
      <main>{children}</main>
      <Suspense>
        <Await resolve={footer}>
          {(footer) => <Footer menu={footer?.menu} shop={header?.shop} />}
        </Await>
      </Suspense>
    </>
  )
}

function MobileMenuAside({ menu, shop, menuToggle, setMenuToggle }) {
  return (
    <>
      <div
        className={`${
          menuToggle ? 'block' : 'hidden'
        } fixed top-0 bg-[#0000005c] z-20 w-[100vw] h-[100vh] transition-all duration-300 `}
      ></div>
      <div
        className={`${
          menuToggle ? 'translate-x-0' : 'translate-x-[-4000px]'
        } absolute top-0 max-w-[420px] w-full transition-all duration-500 z-40 h-[100vh] bg-white`}
      >
        <div className="flex justify-between items-center py-5 px-10 border-b border-[#1d1d1d26] ">
          <p className="text-[20px] text-black">Menu</p>
          <Button onClick={() => setMenuToggle(false)}>
            <HamburgerClose />
          </Button>
        </div>
        <div className="h-[20px] bg-[#1d1d1d0a]"></div>
        <ul className=" border-t  border-[#1d1d1d26]">
          <li className="text-[16px] px-10 py-4 text-black border-b border-[#1d1d1d26] uppercase">
            {' '}
            <NavLink end prefetch="intent" to="/products/custom-bundle">
              Menu
            </NavLink>{' '}
          </li>
          <li className="text-[16px] px-10 py-4 text-black border-b border-[#1d1d1d26] uppercase">
            {' '}
            <NavLink end prefetch="intent" to="/about">
              About Us
            </NavLink>{' '}
          </li>
          <li className="text-[16px] px-10 py-4 text-black border-b border-[#1d1d1d26] uppercase">
            {' '}
            <NavLink end prefetch="intent" to="/recipes">
              Recipies
            </NavLink>{' '}
          </li>
          <li className=" text-[16px] px-10 py-4 text-black border-b border-[#1d1d1d26] uppercase">
            <NavLink
              end
              prefetch="intent"
              to="/account"
              className="flex items-center gap-[5px]"
            >
              <span className="loginIcon flex  w-[15px] flex cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Group_4154"
                  data-name="Group 4154"
                  width="27.473"
                  height="33.937"
                  viewBox="0 0 27.473 33.937"
                  className="icon-account"
                >
                  <path
                    id="Path_1"
                    data-name="Path 1"
                    d="M259.545,42.272A7.272,7.272,0,1,1,252.272,35a7.272,7.272,0,0,1,7.272,7.272"
                    transform="translate(-238.536 -35)"
                    fill="#030303"
                    fillRule="evenodd"
                  ></path>
                  <path
                    id="Path_2"
                    data-name="Path 2"
                    d="M177.528,286.105a1.616,1.616,0,0,0,1.616-1.616v-2.424a13.736,13.736,0,1,0-27.473,0v2.424a1.616,1.616,0,0,0,1.616,1.616h24.241Z"
                    transform="translate(-151.672 -252.168)"
                    fill="#030303"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </span>
              Account
            </NavLink>{' '}
          </li>
        </ul>
        {/* <FaFacebookF /> */}
      </div>
    </>
  )
}
