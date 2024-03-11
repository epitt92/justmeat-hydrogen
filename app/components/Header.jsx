import {Await, NavLink} from '@remix-run/react';
import {Suspense} from 'react';
import {useRootLoaderData} from '~/root';
import OrderButton from './OrderButton';

/**
 * @param {HeaderProps}
 */
export function Header({header, isLoggedIn, cart}) {
  const {shop, menu} = header;
  return (
    <header className="container max-w-[100%] bg-[#eeeeee]  ">
      <div className="content flex justify-between items-center  py-4 px-10 max-w-[1440px] mx-auto ">
        <img src="/logo.svg" className="object-cover w-30 h-24" alt="" />
        <div className="navBar flex justify-between items-center gap-10">
          <ul className="navLinks flex">
            <li className="navLink py-4 px-5 hover:text-[#862E1B] uppercase cursor-pointer transition text-[#1d1d1d] uppercase font-medium	text-base ">
              Menu
            </li>
            <li className="navLink py-4 px-5 hover:text-[#862E1B] uppercase cursor-pointer transition text-[#1d1d1d] uppercase font-medium	text-base">
              About Us
            </li>
            <li className="navLink py-4 px-5 hover:text-[#862E1B] uppercase cursor-pointer transition text-[#1d1d1d] uppercase font-medium	text-base">
              Recipies
            </li>
          </ul>
          <OrderButton />
          <div className="headerIcons flex justify-between items-center gap-10">
            <span className="loginIcon w-5 flex cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Group_4154"
                data-name="Group 4154"
                width="27.473"
                height="33.937"
                viewBox="0 0 27.473 33.937"
                class="icon-account"
              >
                <path
                  id="Path_1"
                  data-name="Path 1"
                  d="M259.545,42.272A7.272,7.272,0,1,1,252.272,35a7.272,7.272,0,0,1,7.272,7.272"
                  transform="translate(-238.536 -35)"
                  fill="#030303"
                  fill-rule="evenodd"
                ></path>
                <path
                  id="Path_2"
                  data-name="Path 2"
                  d="M177.528,286.105a1.616,1.616,0,0,0,1.616-1.616v-2.424a13.736,13.736,0,1,0-27.473,0v2.424a1.616,1.616,0,0,0,1.616,1.616h24.241Z"
                  transform="translate(-151.672 -252.168)"
                  fill="#030303"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </span>
            <span className="loginCart w-5 relative  flex cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Group_4155"
                data-name="Group 4155"
                width="36.359"
                height="33.937"
                viewBox="0 0 36.359 33.937"
              >
                <path
                  id="Path_50"
                  data-name="Path 50"
                  d="M134.117,68.222a1.585,1.585,0,0,0-1.293-.768L107.29,66.283l-.889-3.474a1.6,1.6,0,0,0-1.576-1.212H99.614a1.616,1.616,0,1,0,0,3.232h3.959l4.444,17.292-1.091,4.525a1.638,1.638,0,0,0,.283,1.374,1.567,1.567,0,0,0,1.252.606h19.8a1.616,1.616,0,0,0,0-3.232h-17.7l.444-1.859,16.16-.768a1.628,1.628,0,0,0,1.374-.929l5.656-12.12a1.526,1.526,0,0,0-.081-1.495Zm-8.08,11.393-15.07.687L108.26,69.555l22.019,1.01Z"
                  transform="translate(-97.998 -61.596)"
                  fill="#030303"
                ></path>
                <path
                  id="Path_51"
                  data-name="Path 51"
                  d="M221.66,451.03a3.03,3.03,0,1,1-3.03-3.03,3.03,3.03,0,0,1,3.03,3.03"
                  transform="translate(-207.116 -420.123)"
                  fill="#030303"
                ></path>
                <path
                  id="Path_52"
                  data-name="Path 52"
                  d="M473.66,451.03a3.03,3.03,0,1,1-3.03-3.03,3.03,3.03,0,0,1,3.03,3.03"
                  transform="translate(-440.935 -420.123)"
                  fill="#030303"
                ></path>
              </svg>
              <span className="absolute top-[-5px] right-[-8px] w-[20px] h-[20px] text-[10px] rounded-[100%] items-center bg-black text-white flex justify-center ">
                (0)
              </span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

/**
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
 *   viewport: Viewport;
 * }}
 */
export function HeaderMenu({menu, primaryDomainUrl, viewport}) {
  const {publicStoreDomain} = useRootLoaderData();
  const className = `header-menu-${viewport}`;

  function closeAside(event) {
    if (viewport === 'mobile') {
      event.preventDefault();
      window.location.href = event.currentTarget.href;
    }
  }

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={closeAside}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
        >
          Home
        </NavLink>
      )}
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className="header-menu-item"
            end
            key={item.id}
            onClick={closeAside}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

/**
 * @param {Pick<HeaderProps, 'isLoggedIn' | 'cart'>}
 */
function HeaderCtas({isLoggedIn, cart}) {
  return (
    <nav className="header-ctas" role="navigation">
      <HeaderMenuMobileToggle />
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
        <Suspense fallback="Sign in">
          <Await resolve={isLoggedIn} errorElement="Sign in">
            {(isLoggedIn) => (isLoggedIn ? 'Account' : 'Sign in')}
          </Await>
        </Suspense>
      </NavLink>
      <SearchToggle />
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  return (
    <a className="header-menu-mobile-toggle" href="#mobile-menu-aside">
      <h3>☰</h3>
    </a>
  );
}

function SearchToggle() {
  return <a href="#search-aside">Search</a>;
}

/**
 * @param {{count: number}}
 */
function CartBadge({count}) {
  return <a href="#cart-aside">Cart {count}</a>;
}

/**
 * @param {Pick<HeaderProps, 'cart'>}
 */
function CartToggle({cart}) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} />;
          return <CartBadge count={cart.totalQuantity || 0} />;
        }}
      </Await>
    </Suspense>
  );
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}

/** @typedef {Pick<LayoutProps, 'header' | 'cart' | 'isLoggedIn'>} HeaderProps */
/** @typedef {'desktop' | 'mobile'} Viewport */

/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('./Layout').LayoutProps} LayoutProps */