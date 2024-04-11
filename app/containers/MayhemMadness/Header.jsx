import { NavLink } from '@remix-run/react'

import { Logo } from '~/icons/Logo'

export const Header = () => {
  return (
    <header className="container-small relative h-[88px] sm:h-[120px] flex items-center justify-between py-4">
      <div className="absolute-center">
        <NavLink to="/" end prefetch="intent">
          <div className="w-[148px] sm:w-[214px]">
            <Logo />
          </div>
        </NavLink>
      </div>
    </header>
  )
}
