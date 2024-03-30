import React, { useContext, useEffect, useState } from 'react'
import { cn } from '~/lib/utils'
import { ProductContext } from '~/contexts'
import { CheckBox } from '~/icons/CheckBox'

const PlanPicker = () => {
  const {
    sellingPlan,
    setSellingPlan,
    sellingPlanFrequency,
    setSellingPlanFrequency,
  } = useContext(ProductContext)

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
    <div className="w-[100%] sm:border-b-2 border-solid border-[#0003] mb-[0px] sm:mb-[30px]">
      <div className="flex flex-col items-center justify-center pt-[10px] pb-5 sm:py-14">
        <p className="font-semibold italic text-center text-black text-[14px] sm:text-[20px]">
          We guarantee you&apos;ll love it or your money back !
        </p>
        <div className="flex pt-2 min-h-[30px] sm:min-h-[auto] font-semibold">
          {review}
        </div>

        <div className="flex justify-start flex-col sm:flex-row gap-[12px] sm:gap-[40px] pt-5 w-[100%]">
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

          <div className="flex gap-2 flex-col sm:flex-row w-[100%] sm:max-w-[760px]">
            <div className="flex-1 w-full sm:w-7/12 md:w-6/12 xl:w-4/12">
              <p
                className={`${
                  sellingPlan !== ''
                    ? 'text-[#fff] sm:bg-[#000] bg-[#425B34]'
                    : 'sm:text-black sm:bg-[#ebeae9] bg-[#aaa] text-white'
                } min-h-[24px] flex justify-center items-center px-[15px] pt-[3px] text-[11px] font-normal rounded-full mx-auto sm:ml-0 sm:rounded-[0px] sm:font-semibold sm:text-[14px] sm:min-h-[28px] w-fit`}
              >
                SAVE 25% ON YOUR FIRST ORDER
              </p>
              <div
                className={`${
                  sellingPlan !== ''
                    ? 'bg-white sm:bg-[#862E1B]'
                    : 'border-[#eaeaea]'
                } p-[7px] sm:p-[10px] border-[3px] border-solid flex gap-6 border-[#425B34] sm:border-[#862E1B] cursor-pointer rounded-[14px] sm:rounded-[0px]`}
                onClick={() => {
                  setSellingPlan(sellingPlanFrequency)
                }}
              >
                <div
                  className={`${
                    sellingPlan !== ''
                      ? 'text-black sm:text-[#fff]'
                      : 'text-[#1d1d1d]'
                  } leading-[100%] flex-1 text-[18px] sm:text-[20px] text-center sm:text-left font-bold`}
                >
                  Subscribe & Save
                </div>

                <select
                  name=""
                  className={`${
                    sellingPlan !== ''
                      ? 'text-[#fff] brightness-0 invert '
                      : 'text-[#1d1d1d] '
                  } max-w-[142px] hidden sm:block text-[12px] focus:shadow-none shadow-none pl-[10px] py-0 pr-0 w-full outline-none border-none bg-transparent focus:outline-none bg-auto focus:border-none bg-[url('https://cdn.shopify.com/s/files/1/0672/4776/7778/files/select_svg.svg')]`}
                  value={sellingPlanFrequency}
                  onChange={(e) => {
                    setSellingPlanFrequency(e.target.value)
                  }}
                >
                  <option
                    className="text-[#000]"
                    value="Delivery every 15 Days"
                  >
                    Every 15 days
                  </option>
                  <option
                    className="text-[#000]"
                    value="Delivery every 30 Days"
                  >
                    Every 30 days
                  </option>
                </select>
              </div>
              <div
                className={cn(
                  'rounded-[12px] sm:bg-[#ebeae9] sm:rounded-[0px] px-[12px] py-[5px]',
                  sellingPlan !== '' ? 'bg-[#e7eae5]' : 'bg-[#f4f4f4]',
                )}
              >
                <div className="mt-[4px] flex justify-between items-center sm:hidden">
                  <p className="text-black font-semibold text-[14px]">
                    Deliver Every
                  </p>
                  <div className="flex gap-2">
                    <div
                      className={cn(
                        'rounded-full border border-solid  text-center text-[11px] font-semibold min-h-[24px] flex justify-center items-center px-[12px] leading-[100%]',
                        sellingPlanFrequency === 'Delivery every 15 Days'
                          ? sellingPlan !== ''
                            ? 'bg-[#425B34] text-white'
                            : 'bg-[#aaaaaa] text-white'
                          : 'bg-white',
                        sellingPlan !== ''
                          ? 'border-[#425B34]'
                          : 'border-[#aaa]',
                      )}
                      onClick={() => {
                        setSellingPlanFrequency('Delivery every 15 Days')
                      }}
                    >
                      Every 15 Days
                    </div>
                    <div
                      className={cn(
                        'rounded-full border border-solid  text-center text-[11px] font-semibold min-h-[24px] flex justify-center items-center px-[12px] leading-[100%]',
                        sellingPlanFrequency === 'Delivery every 30 Days'
                          ? sellingPlan !== ''
                            ? 'bg-[#425B34] text-white'
                            : 'bg-[#aaaaaa] text-white'
                          : 'bg-white',
                        sellingPlan !== ''
                          ? 'border-[#425B34]'
                          : 'border-[#aaa]',
                      )}
                      onClick={() => {
                        setSellingPlanFrequency('Delivery every 30 Days')
                      }}
                    >
                      Every 30 Days
                    </div>
                  </div>
                </div>
                <ul className="mt-[12px] sm:mt-0 grid grid-cols-2 gap-y-2 sm:grid-cols-1">
                  <li className="flex items-center text-[11px] sm:text-[12px] font-normal sm:font-bold m-0 ">
                    <span className="text-[#425B34] sm:text-black">
                      <CheckBox
                        className={
                          sellingPlan !== ''
                            ? 'fill-[#425b34] sm:fill-black'
                            : 'fill-[#aaaaaa]'
                        }
                      />
                    </span>{' '}
                    Save 10% on Future Orders
                  </li>
                  <li className="flex items-center text-[11px] sm:text-[12px] font-normal sm:font-bold m-0">
                    <span className="text-[#425B34] sm:text-black">
                      <CheckBox
                        className={
                          sellingPlan !== ''
                            ? 'fill-[#425b34] sm:fill-black'
                            : 'fill-[#aaaaaa]'
                        }
                      />
                    </span>{' '}
                    Exclusive Meat Options
                  </li>
                  <li className="flex items-center text-[11px] sm:text-[12px] font-normal sm:font-bold m-0">
                    <span className="text-[#425B34] sm:text-black">
                      <CheckBox
                        className={
                          sellingPlan !== ''
                            ? 'fill-[#425b34] sm:fill-black'
                            : 'fill-[#aaaaaa]'
                        }
                      />
                    </span>{' '}
                    Customize or Cancel Anytime
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex-1 w-full sm:w-7/12 md:w-5/12 xl:w-4/12">
              <div
                className={`${
                  sellingPlan === ''
                    ? 'bg-white sm:bg-[#862E1B] border-[#425B34]'
                    : 'border-[#eaeaea]'
                } p-[3px] sm:p-[10px] border-[3px] border-solid flex justify-center sm:justify-start gap-6 sm:border-[#862E1B] cursor-pointer rounded-[14px] sm:rounded-[0px] subscriptionlabel sm:mt-[28px] mt-0`}
                onClick={() => {
                  setSellingPlan('')
                }}
              >
                <div
                  className={`${
                    sellingPlan !== ''
                      ? 'text-[#1d1d1d]'
                      : 'text-black sm:text-[#fff]'
                  } text-[18px] sm:text-[20px] w-fit font-bold text-center sm:text-left sm:leading-[24px]`}
                >
                  One Time
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlanPicker
