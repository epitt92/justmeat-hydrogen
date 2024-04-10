import { useContext } from 'react'

import { Button } from '~/components/Button'
import { HamburgerClose } from '~/icons/HamburgerClose'
import { Account as AccountIcon } from '~/icons/Account'
import { LayoutContext } from '~/contexts'
import { MenuNavLink } from './MenuNavLink'

export function MobileMenuAside() {
  const { menuToggle, setMenuToggle } = useContext(LayoutContext)

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
        } fixed top-0 max-w-[420px] w-full transition-all duration-500 z-40 h-[100vh] bg-white z-100`}
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
            <MenuNavLink to="/products/custom-bundle">Menu</MenuNavLink>{' '}
          </li>
          <li className="text-[16px] px-10 py-4 text-black border-b border-[#1d1d1d26] uppercase">
            {' '}
            <MenuNavLink to="/about">About Us</MenuNavLink>{' '}
          </li>
          <li className="text-[16px] px-10 py-4 text-black border-b border-[#1d1d1d26] uppercase">
            {' '}
            <MenuNavLink to="/recipes">Recipes</MenuNavLink>{' '}
          </li>
          <li className=" text-[16px] px-10 py-4 text-black border-b border-[#1d1d1d26] uppercase">
            <MenuNavLink to="/account">
              <div className="flex items-center gap-[5px]">
                <span className="loginIcon flex  w-[15px] cursor-pointer">
                  <AccountIcon />
                </span>
                Account
              </div>
            </MenuNavLink>{' '}
          </li>
        </ul>
        {/* <FaFacebookF /> */}
      </div>
    </>
  )
}
