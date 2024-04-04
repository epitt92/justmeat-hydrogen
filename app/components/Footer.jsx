import { NavLink, useMatches } from '@remix-run/react'
import { useRootLoaderData } from '~/root'
import logo from '~/assets/footer_logo.webp'

/**
 * @param {FooterQuery & {shop: HeaderQuery['shop']}}
 */
export function Footer({ menu, shop }) {
  const matches = useMatches()

  const isRoute = matches[1].params.bundle === 'custom-bundle'

  const Footer = () => {
    const currentYear = new Date().getFullYear()
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
              <div className='flex social-icons mt-5' style={{gap: "15px"}}>
              <a href="https://www.facebook.com/profile.php?id=61550191665305" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height="18" className='social-icon'><path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"/></svg></a>
              <a href="https://www.instagram.com/justmeats.co/" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="18" className='social-icon'><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg></a>
              <a href="https://www.tiktok.com/@justmeats.com" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="18" className='social-icon'><path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z"/></svg></a>
              </div>
            </div>
          </div>
        </div>
        <div className="copyRight">
          <div className="content max-w-[1300px] py-6 px-10 mx-auto">
            <p className="text-lg font-normal text-white">
              &copy; {currentYear} JUST MEATS, All Rights Reserved
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
