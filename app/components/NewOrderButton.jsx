import React from 'react'

import { NavLink } from '@remix-run/react'

import { cn } from '~/lib/utils'

export const OrderButton = ({ className }) => {
  return (
    <NavLink end prefetch="intent" to="/products/custom-bundle">
      <span
        className={cn(
          'bg-primary cursor-pointer font-medium text-[#fff] hover:bg-primary-dark transition py-[10px] px-[20px] rounded-[4px] text-sm',
          className,
        )}
      >
        ORDER NOW
      </span>
    </NavLink>
  )
}
