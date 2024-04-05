import React from 'react'
import { PlanPicker } from './PlanPicker'

export const PlanPickerBlock = () => {
  const review = (
    <div className="flex gap-1">
      <div className="flex">
        <svg
          className="star"
          width={24}
          height={22.8}
          viewBox="0 12.705 512 486.59"
          x="0px"
          y="0px"
          xmlSpace="preserve"
          style={{ fill: '#EBB932' }}
        >
          <polygon points="256.814,12.705 317.205,198.566 512.631,198.566 354.529,313.435 414.918,499.295 256.814,384.427 98.713,499.295 159.102,313.435 1,198.566 196.426,198.566" />
        </svg>
        <svg
          className="star"
          width={24}
          height={22.8}
          viewBox="0 12.705 512 486.59"
          x="0px"
          y="0px"
          xmlSpace="preserve"
          style={{ fill: '#EBB932' }}
        >
          <polygon points="256.814,12.705 317.205,198.566 512.631,198.566 354.529,313.435 414.918,499.295 256.814,384.427 98.713,499.295 159.102,313.435 1,198.566 196.426,198.566" />
        </svg>
        <svg
          className="star"
          width={24}
          height={22.8}
          viewBox="0 12.705 512 486.59"
          x="0px"
          y="0px"
          xmlSpace="preserve"
          style={{ fill: '#EBB932' }}
        >
          <polygon points="256.814,12.705 317.205,198.566 512.631,198.566 354.529,313.435 414.918,499.295 256.814,384.427 98.713,499.295 159.102,313.435 1,198.566 196.426,198.566" />
        </svg>
        <svg
          className="star"
          width={24}
          height={22.8}
          viewBox="0 12.705 512 486.59"
          x="0px"
          y="0px"
          xmlSpace="preserve"
          style={{ fill: '#EBB932' }}
        >
          <polygon points="256.814,12.705 317.205,198.566 512.631,198.566 354.529,313.435 414.918,499.295 256.814,384.427 98.713,499.295 159.102,313.435 1,198.566 196.426,198.566" />
        </svg>
        <svg
          className="star"
          viewBox="0 0 26 26"
          width={24}
          height="22.8"
          fill="#EBB932"
          stroke="#EBB932"
          strokeWidth={1}
        >
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="65%"
                style={{ stopColor: '#EBB932', stopOpacity: 1 }}
              />
              <stop
                offset="65%"
                style={{ stopColor: '#FFFFFF', stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <path
            d="M12 1.755l3.511 8.577h8.989l-6.891 5.718 2.816 8.692-7.425-5.628-7.424 5.628 2.816-8.692-6.891-5.718h8.989z"
            fill="url(#grad)"
          />
        </svg>
      </div>
      <div className="">
        <span className="text-base font-bold text-black">1,134 Reviews</span>
      </div>
    </div>
  )

  return (
    <section className="w-[100%] sm:border-b-2 border-solid border-[#0003] mb-[0px] sm:mb-[30px]">
      <div className="flex flex-col items-center justify-center pt-[10px] pb-5 sm:py-14">
        <h2 className="font-bold text-[28px] hidden lg:block">
          GET YOUR MEATS NOW
        </h2>
        <p className="italic text-center text-black text-[14px] sm:text-[20px]">
          We guarantee you&apos;ll love it or your money back !
        </p>
        <div className="flex pt-2 min-h-[30px] sm:min-h-[auto] font-semibold">
          {review}
        </div>

        <div className="flex justify-start flex-col lg:flex-row gap-[12px] lg:gap-[40px] pt-5 w-[100%]">
          <div className="flex items-center w-full gap-2 lg:w-4/12 xl:w-3/12">
            <div className="w-[35px] h-[35px] lg:w-[60px] lg:h-[60px] rounded-[100%] border-2 border-[#425C35] sm:border-none sm:bg-black flex justify-center items-center  ">
              <span className=" text-[22px] lg:text-[40px] font-bold text-black sm:text-white ">
                1
              </span>
            </div>
            <div className="h-fit sm:border-b-4  sm:border-[#425B3499] sm:pb-1">
              <h3 className="font-semibold leading-7 text-[20px] lg:text-[22px] text-[#1d1d1d] sm:uppercase ">
                Select Your <br className="hidden lg:block" /> Frequency
              </h3>
            </div>
          </div>

          <PlanPicker />
        </div>
      </div>
    </section>
  )
}
