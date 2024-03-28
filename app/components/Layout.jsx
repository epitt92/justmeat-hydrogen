import { Await, NavLink } from '@remix-run/react'
import { Suspense, useState } from 'react'
import { Aside } from '~/components/Aside'
import { Footer } from '~/components/Footer'
import { Header, HeaderMenu } from '~/components/Header'

import { CartMain } from '~/components/Cart'
import {
  PredictiveSearchForm,
  PredictiveSearchResults,
} from '~/components/Search'
import OrderHeader from './OrderHeader'

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

// /**
//  * @param {{cart: LayoutProps['cart']}}
//  */
// function CartAside({cart}) {
//   return (
//     <Aside id="cart-aside" heading="CART">
//       <Suspense fallback={<p>Loading cart ...</p>}>
//         <Await resolve={cart}>
//           {(cart) => {
//             return <CartMain cart={cart} layout="aside" />;
//           }}
//         </Await>
//       </Suspense>
//     </Aside>
//   );
// }

// function SearchAside() {
//   return (
//     <Aside id="search-aside" heading="SEARCH">
//       <div className="predictive-search">
//         <br />
//         <PredictiveSearchForm>
//           {({fetchResults, inputRef}) => (
//             <div>
//               <input
//                 name="q"
//                 onChange={fetchResults}
//                 onFocus={fetchResults}
//                 placeholder="Search"
//                 ref={inputRef}
//                 type="search"
//               />
//               &nbsp;
//               <button
//                 onClick={() => {
//                   window.location.href = inputRef?.current?.value
//                     ? `/search?q=${inputRef.current.value}`
//                     : `/search`;
//                 }}
//               >
//                 Search
//               </button>
//             </div>
//           )}
//         </PredictiveSearchForm>
//         <PredictiveSearchResults />
//       </div>
//     </Aside>
//   );
// }

// /**
//  * @param {{
//  *   menu: HeaderQuery['menu'];
//  *   shop: HeaderQuery['shop'];
//  * }}
//  */
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
          <NavLink onClick={() => setMenuToggle(false)}>
            <MobileMenuCloseToggle />
          </NavLink>
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

function MobileMenuCloseToggle() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 1L1 17"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M1 1L17 17"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  )
}

// function MobileMenuSocialIcons (){
//   return(

//   );
// }

/**
 * @typedef {{
 *   cart: Promise<CartApiQueryFragment | null>;
 *   children?: React.ReactNode;
 *   footer: Promise<FooterQuery>;
 *   header: HeaderQuery;
 *   isLoggedIn: Promise<boolean>;
 * }} LayoutProps
 */

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
