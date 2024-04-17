import { useContext, useEffect, useRef, useState } from 'react'

import { NavLink, useMatches } from '@remix-run/react'

import logo from '~/assets/logo.png'
import { LayoutContext } from '~/contexts'
import { Account as AccountIcon } from '~/icons/Account'
import { HamburgerOpen } from '~/icons/HamburgerOpen'
import { Logo } from '~/icons/Logo'
import { useRootLoaderData } from '~/root'

import { Button } from './Button'
import { CartButton } from './NewCartButton'
import { OrderButton } from './NewOrderButton'

export function Header() {
  const matches = useMatches()
  // const { setMenuToggle } = useContext(LayoutContext)
  const { menuOpen, setMenuToggle } = useContext(LayoutContext)
  const isRoute = matches[1].params.bundle === 'custom-bundle'
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Function to update our state
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    // Clean up event listener
    return () => window.removeEventListener('resize', handleResize)
  }, [])
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
  const navLinks = [
    ['/products/custom-bundle', 'Menu'],
    ['/about', 'About Us'],
    ['/recipes', 'Recipes'],
    ['/special', 'Special'],
  ]

  const Mainheader = () => {
    return !isMobile ? (
      <div className="container-small relative h-[88px] sm:h-[120px] flex items-center justify-between py-4 mainheader">
        <div className="flex items-center justify-between gap-10 navBar">
          <div className="navLinks sm:flex sm:gap-[32px]">
            {navLinks.map(([to, text], index) => (
              <NavLinkItem to={to} text={text} key={index} />
            ))}
          </div>
          <Button
            className="block sm:hidden"
            onClick={() => setMenuToggle(true)}
          >
            <HamburgerOpen />
          </Button>
        </div>
        <div className="absolute-center">
          <NavLink to="/" end prefetch="intent">
            <div className="w-[148px] sm:w-[214px]">
              <Logo />
            </div>
          </NavLink>
        </div>
        <div className="flex items-center gap-[32px]">
          <div className="flex items-center gap-[10px] sm:gap-[18px]">
            <NavLink end prefetch="intent" to="/account">
              <span className="cursor-pointer loginIcon">
                <AccountIcon />
              </span>
            </NavLink>
            <CartButton />
          </div>
          <div className="hidden lg:block">
            <OrderButton />
          </div>
        </div>
      </div>
    ) : (
      <div className="container-small relative h-[88px] sm:h-[120px] flex items-center justify-between py-4 mainheader">
        <div className="flex items-center justify-between gap-10 navBar">
          <div className="flex items-center justify-between gap-4 headerIcons sm:gap-10">
            <Button
              className="block lg:hidden"
              onClick={() => setMenuToggle(true)}
            >
              <HamburgerOpen />
            </Button>
          </div>
        </div>

        <div className="absolute-center">
          <NavLink to="/" end prefetch="intent">
            <div className="w-[148px] sm:w-[214px]">
              <Logo />
            </div>
          </NavLink>
        </div>
        <div className="flex items-center gap-[32px]">
          <div className="flex items-center gap-[10px] sm:gap-[18px]">
            <CartButton />
          </div>
          <div className="hidden lg:block">
            <OrderButton />
          </div>
        </div>
      </div>
    )
  }
  const NavLinkItem = ({ to, text }) => (
    <NavLink end prefetch="intent" to={to}>
      <div className="text-xs font-medium uppercase transition cursor-pointer hover:text-primary text-primary-dark">
        {text}
      </div>
    </NavLink>
  )

  const Landingheader = () => {
    return (
      <div className="container-small flex justify-center items-center py-[3px] mx-auto relative landingheader">
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
    <header className="">{isRoute ? <Landingheader /> : <Mainheader />}</header>
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
