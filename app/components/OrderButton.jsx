import { NavLink } from '@remix-run/react'
import React from 'react'
import { cn } from '~/lib/utils'

const OrderButton = ({ className }) => {
  return (
    <NavLink end prefetch="intent" to="/products/custom-bundle">
      <span
        className={cn(
          'bg-primary cursor-pointer text-[#fff] hover:bg-primary-dark transition py-[10px] px-[20px] rounded-[4px] text-sm',
          className,
        )}
      >
        ORDER NOW
      </span>
    </NavLink>
  )
}

export default OrderButton
