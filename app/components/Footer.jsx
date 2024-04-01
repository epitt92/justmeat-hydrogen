import { NavLink, useMatches } from '@remix-run/react'
import { useRootLoaderData } from '~/root'
import logo from '~/assets/footer_logo.webp'

/**
 * @param {FooterQuery & {shop: HeaderQuery['shop']}}
 */
export function Footer({ menu, shop }) {
  const matches = useMatches()

  const isRoute = matches[1].params.handle === 'custom-bundle'

  const Footer = () => {
    return (
      <footer className="footer max-w-[100%] bg-black ">
        <div className="content max-w-[1300px] px-5 sm:px-10 mx-auto ">
          <div className="flex flex-wrap items-start justify-between gap-10 py-10 lg:flex-nowrap lg:gap-10 sm:py-20 ">
            <div className="flex items-center justify-center footerLogo sm:w-5/12 lg:w-1/4 ">
              <NavLink end prefetch="intent" to="/">
                <img src={logo} className="object-contain pt-3" alt="" />
              </NavLink>
            </div>
            <div className="flex items-start justify-between w-full gap-10 navLinks sm:w-5/12 lg:w-1/4">
              <ul className="">
                <li className="mb-4 text-xl font-medium text-white ">
                  About Us
                </li>
                <li className="text-white font-normal text-base my-2 transition hover:text-[#862E1B] cursor-pointer ">
                  <NavLink end prefetch="intent" to="/products/custom-bundle">
                    Menu
                  </NavLink>
                </li>
                <li className="text-white font-normal text-base my-2 transition hover:text-[#862E1B] cursor-pointer ">
                  <NavLink end prefetch="intent" to="/about">
                    How It Works
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="flex items-start justify-between w-full gap-10 navLinks sm:w-5/12 lg:w-1/4">
              <ul className="">
                <li className="mb-4 text-xl font-medium text-white ">
                  Need Help?
                </li>
                <li className="text-white font-normal text-base my-2 transition hover:text-[#862E1B] cursor-pointer ">
                  <NavLink end prefetch="intent" to="/about">
                    FAQs
                  </NavLink>
                </li>
                <li className="text-white font-normal text-base my-2 transition hover:text-[#862E1B] cursor-pointer ">
                  <NavLink end prefetch="intent" to="/term-services">
                    Terms of Service
                  </NavLink>
                </li>
                <li className="text-white font-normal text-base my-2 transition hover:text-[#862E1B] cursor-pointer ">
                  <NavLink end prefetch="intent" to="/refund-policy">
                    Refund & Cancellation Policy
                  </NavLink>
                </li>
                <li className="text-white font-normal text-base my-2 transition hover:text-[#862E1B] cursor-pointer ">
                  <NavLink end prefetch="intent" to="/privacy-policy">
                    Privacy Policy
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="w-full contactInfo sm:w-5/12 lg:w-1/4">
              <ul>
                <li className="mb-4 text-3xl font-medium text-white ">
                  Contact Us
                </li>
                <li className="my-2 text-base font-normal text-white ">
                  Phone: 888-343-1242
                </li>
                <li className="my-2 text-base font-normal text-white ">
                  Email: support@justmeats.com
                </li>
                <li className="my-2 text-base font-normal text-white "></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="copyRight border-t-[0.5px] border-white-200 ">
          <div className="content max-w-[1440px] py-6 px-10 mx-auto">
            <p className="text-lg font-normal text-white">
              ©2024 JUST MEATS, All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    )
  }
  return <>{!isRoute ? <Footer /> : null}</>
}

/**
 * @param {{
 *   menu: FooterQuery['menu'];
 *   primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
 * }}
 */
function FooterMenu({ menu, primaryDomainUrl }) {
  const { publicStoreDomain } = useRootLoaderData()

  return (
    <nav className="footer-menu" role="navigation">
      {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
        if (!item.url) return null
        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url
        const isExternal = !url.startsWith('/')
        return isExternal ? (
          <a href={url} key={item.id} rel="noopener noreferrer" target="_blank">
            {item.title}
          </a>
        ) : (
          <NavLink
            end
            key={item.id}
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

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
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
    color: isPending ? 'grey' : 'white',
  }
}

/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
