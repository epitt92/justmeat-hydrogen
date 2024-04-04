import { NavLink } from '@remix-run/react'
import React from 'react'
import { cn } from '~/lib/utils'

const OrderButton = ({ className }) => {
  return (
    <div className="flex orderBton">
      <NavLink end prefetch="intent" to="/products/custom-bundle">
        <span
          className={cn(
            'bg-[#862E1B] rounded-[5px] cursor-pointer text-[#fff] hover:bg-[#1d1d1d] transition font-medium	text-base py-3 px-9 ',
            className,
          )}
        >
          Order Now
        </span>
      </NavLink>
    </div>
  )
}

export default OrderButton
