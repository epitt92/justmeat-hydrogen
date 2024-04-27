import React from 'react'

import { NavLink } from '@remix-run/react'

import { cn } from '~/lib/utils'

export const OrderButton = ({ className }) => {
  return (
    <NavLink
      end
      prefetch="intent"
      to="/products/custom-bundle"
      className={cn(
        'btn-order inline-block bg-primary cursor-pointer font-medium text-[#fff] hover:bg-primary-dark transition py-[10px] px-[20px] rounded-[4px] text-sm tracking-[0.7px]',
        className,
      )}
    >
      ORDER NOW
    </NavLink>
  )
}
