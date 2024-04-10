import { useContext } from 'react'

import { NavLink } from '@remix-run/react'

import { RootContext } from '~/contexts'
import { Cart as CartIcon } from '~/icons/Cart'

export function CartButton() {
  const { cartCount } = useContext(RootContext)

  return (
    <NavLink end prefetch="intent" to="/products/custom-bundle">
      <span className="relative flex w-10 cursor-pointer CartIcon sm:w-5">
        <CartIcon />
        <span className="absolute top-[-5px] right-[-8px] w-[20px] h-[20px] text-[10px] rounded-[100%] items-center bg-black text-white flex justify-center ">
          ({cartCount})
        </span>
      </span>
    </NavLink>
  )
}
