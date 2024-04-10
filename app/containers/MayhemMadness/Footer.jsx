import { NavLink } from '@remix-run/react'

import { LogoWhite } from '~/icons/LogoWhite'

export const Footer = () => {
  return (
    <footer className="bg-[#231b19]">
      <div className="container-1120 relative h-[88px] sm:h-[128px] flex items-center justify-between py-4">
        <div className="absolute-center">
          <NavLink to="/" end prefetch="intent">
            <div className="w-[148px] sm:w-[214px]">
              <LogoWhite />
            </div>
          </NavLink>
        </div>
      </div>
    </footer>
  )
}
