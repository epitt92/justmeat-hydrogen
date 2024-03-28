import React from 'react'
import { Link } from '@remix-run/react'
import logo from '~/assets/logo.svg'

const OrderHeader = () => {
  return (
    <header className="flex flex-col items-center justify-center OrderHeader">
      <div className="max-w-[1440px] flex w-[100%] py-3 items-center ">
        <div>
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 m-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </Link>
        </div>
        <div className="w-[100%] flex justify-center">
          <Link to="/">
            <img
              className="object-cover h-20 w-30"
              src={logo}
              alt=""
              loading="lazy"
            />
          </Link>
        </div>
      </div>
      <div className="flex w-[100%] items-center justify-center bg-[#1c7084] py-1 ">
        <p className="text-lg font-semibold text-white ">
          LIMITED TIME: GET FREE RANCH RUB CHICKEN
        </p>
      </div>
    </header>
  )
}

export default OrderHeader
