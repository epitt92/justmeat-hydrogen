import { NavLink } from '@remix-run/react'
import React from 'react'

const OrderButton = () => {
  return (
    <div className="flex orderBton">
      <NavLink end prefetch="intent" to="/products/custom-bundle">
        <span className="bg-[#862E1B] cursor-pointer text-[#fff] hover:bg-[#1d1d1d] transition font-bold	text-lg py-3 px-9 ">
          Order Now
        </span>
      </NavLink>
    </div>
  )
}

export default OrderButton
