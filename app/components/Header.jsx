import { NavLink, useMatches } from '@remix-run/react'
import { useContext, useRef, useState, useEffect } from 'react'
import { useRootLoaderData } from '~/root'
import OrderButton from './OrderButton'
import { CartButton } from './CartButton'
import logo from '~/assets/logo.png'
import { Button } from './Button'
import { HamburgerOpen } from '~/icons/HamburgerOpen'
import { LayoutContext } from '~/contexts'

export function Header() {
  const matches = useMatches()
  const { setMenuToggle } = useContext(LayoutContext)

  const isCartPage = matches[1].params.bundle === 'custom-bundle'

  // -------> Functionality to make the header sticky in landing pages <-------
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;

    // Becomes sticky (true) if scrolling up, and not sticky (false) if scrolling down
    if (prevScrollPos > currentScrollPos) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }

    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, isSticky]);


  const HoverUnderNavLink = (to, text) => {
    const spanRef = useRef(null)

    const handleMouseEnter = () => {
      if (spanRef.current) {
        spanRef.current.style.width = '100%'
      } else {
        spanRef.current.style.width = '100%'
      }
    }

    const handleMouseLeave = () => {
      if (spanRef.current) {
        spanRef.current.style.width = '0%'
      } else {
        spanRef.current.style.width = '0%'
      }
    }

    return (
      <li className="navLink py-4 px-5 hover:text-[#862E1B] cursor-pointer transition text-[#1d1d1d] uppercase font-medium	text-base ">
        <NavLink
          end
          prefetch="intent"
          style={(activeLinkStyle, { position: 'relative' })}
          to={to}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {text}
          <span
            ref={spanRef}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '2px',
              width: '0%',
              backgroundColor: '#862E1B',
              transition: 'width 0.5s ease',
            }}
          ></span>
        </NavLink>
      </li>
    )
  }

  const Mainheader = () => {
    return (
      <div className="container flex items-center justify-between py-4 mainheader">
        <NavLink end prefetch="intent" to="/">
          <img
            src={logo}
            className="object-cover h-16 w-30 sm:h-24"
            alt=""
            style={{ height: '70px' }}
          />
        </NavLink>
        <div className="flex items-center justify-between gap-10 navBar">
          <ul className="hidden navLinks lg:flex">
            {HoverUnderNavLink('/products/custom-bundle', 'Menu')}
            {HoverUnderNavLink('/about', 'About Us')}
            {HoverUnderNavLink('/recipes', 'Recipes')}
          </ul>
          <div className="hidden lg:block">
            <OrderButton />
          </div>
          <div className="flex items-center justify-between gap-4 headerIcons sm:gap-10">
            <NavLink end prefetch="intent" to="/account">
              <span className="hidden w-5 cursor-pointer loginIcon lg:flex">
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
            </NavLink>
            <Button
              className="block lg:hidden"
              onClick={() => setMenuToggle(true)}
            >
              <HamburgerOpen />
            </Button>
            <CartButton />
          </div>
        </div>
      </div>
    )
  }

  const Landingheader = () => {
    return (
      <div className="container flex justify-center items-center py-[3px] mx-auto relative landingheader">
        <NavLink end prefetch="intent" to="/">
          <img
            src={logo}
            className="object-contain sm:w-[156px] h-[40px] sm:h-[90px]"
            alt="Logo"
          />
        </NavLink>
        <NavLink end prefetch="intent" to="/" className="absolute left-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 m-4 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
              aria-label="Back Home"
            ></path>
          </svg>
        </NavLink>
      </div>
    )
  }

  return (
    <header className={`header ${isSticky && !isCartPage ? 'header--sticky' : 'header--hidden'} bg-[#eeeeee] border-b border-solid border-[#1D1D1D10]`}>
      {isCartPage ? <Landingheader /> : <Mainheader />}
    </header>
  )
}

export function HeaderMenu({ menu, primaryDomainUrl, viewport }) {
  const { publicStoreDomain } = useRootLoaderData()
  const className = `header-menu-${viewport}`

  function closeAside(event) {
    if (viewport === 'mobile') {
      event.preventDefault()
      window.location.href = event.currentTarget.href
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
        if (!item.url) return null

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url
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
        )
      })}
    </nav>
  )
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
}

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({ isActive, isPending }) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  }
}

/** @typedef {Pick<LayoutProps, 'header' | 'cart' | 'isLoggedIn'>} HeaderProps */
/** @typedef {'desktop' | 'mobile'} Viewport */

/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('./Layout').LayoutProps} LayoutProps */
