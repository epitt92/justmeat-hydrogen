import {NavLink} from '@remix-run/react';
import {useRootLoaderData} from '~/root';

/**
 * @param {FooterQuery & {shop: HeaderQuery['shop']}}
 */
export function Footer({menu, shop}) {
  return (

    <footer className="footer max-w-[100%] bg-black ">
      <div className="content max-w-[1440px] px-10 mx-auto ">
        <div className="flex justify-between items-start gap-10  py-20 ">
          <div className="footerLogo flex justify-center items-center w-1/4 ">
            <img src="/footer_logo.webp" className='object-contain pt-3' alt="" />
          </div>
          <div className="navLinks flex gap-10 justify-between items-start w-2/4">
            <ul className='w-2/4 '>
              <li className='text-white font-medium text-xl mb-4 '>About Us</li>
              <li className='text-white font-normal text-base my-2 transition hover:text-[#862E1B] cursor-pointer '>Menu</li>
              <li className='text-white font-normal text-base my-2 transition hover:text-[#862E1B] cursor-pointer '>How It Works</li>
            </ul>
            <ul className='w-2/4'>
              <li className='text-white font-medium text-xl mb-4 '>Need Help?</li>
              <li className='text-white font-normal text-base my-2 transition hover:text-[#862E1B] cursor-pointer '>FAQs</li>
              <li className='text-white font-normal text-base my-2 transition hover:text-[#862E1B] cursor-pointer '>Terms of Service</li>
              <li className='text-white font-normal text-base my-2 transition hover:text-[#862E1B] cursor-pointer '>Refund & Cancellation Policy</li>
              <li className='text-white font-normal text-base my-2 transition hover:text-[#862E1B] cursor-pointer '>Privacy Policy</li>
            </ul>
          </div>
          <div className="contactInfo w-1/4">
            <ul>
              <li className='text-white font-medium text-3xl mb-4 '>Contact Us</li>
              <li className='text-white font-normal text-base my-2 '>Phone: 888-343-1242</li>
              <li className='text-white font-normal text-base my-2 '>Email: support@justmeats.com</li>
              <li className='text-white font-normal text-base my-2 '></li>
            </ul>
          </div>
        </div>
        
      </div>
       <div className="copyRight border-t-[0.5px] border-white-200 ">
        <div className='content max-w-[1440px] py-6 px-10 mx-auto'>
        <p className="text-white font-normal text-lg">
            ©2024 JUST MEATS, All Rights Reserved
          </p>
        </div>
         
        </div>

    </footer>
  );
}

/**
 * @param {{
 *   menu: FooterQuery['menu'];
 *   primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
 * }}
 */
function FooterMenu({menu, primaryDomainUrl}) {
  const {publicStoreDomain} = useRootLoaderData();

  return (
    <nav className="footer-menu" role="navigation">
      {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
        if (!item.url) return null;
        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');
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
        );
      })}
    </nav>
  );
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
    color: isPending ? 'grey' : 'white',
  };
}

/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
