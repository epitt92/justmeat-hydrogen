import { useContext } from 'react'
import { NavLink } from '@remix-run/react'
import { Cart as CartIcon } from '~/icons/Cart'
import { RootContext } from '~/contexts'

export function CartButton() {
  const { cartProductsCount } = useContext(RootContext)

  return (
    <NavLink end prefetch="intent" to="/products/custom-bundle">
      <span className="relative flex cursor-pointer CartIcon">
        <CartIcon />
        <span className="absolute top-[-5px] right-[-8px] w-[16px] h-[16px] text-[10px] rounded-[100%] items-center bg-second text-white flex justify-center ">
          {cartProductsCount}
        </span>
      </span>
    </NavLink>
  )
}
