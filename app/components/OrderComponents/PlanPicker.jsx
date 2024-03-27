import React, { useContext, useEffect, useState } from 'react'
import { HeaderContext } from '../HeaderContext'

const PlanPicker = () => {
  const {
    sellingPlan,
    setSellingPlan,
    sellingPlanFrequency,
    setSellingPlanFrequency,
  } = useContext(HeaderContext)

  const checkBox = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17.627"
      height="17.627"
      viewBox="0 0 17.627 17.627"
      role="presentation"
      className="w-3 h-3 mr-1 text-green-400 svgcolor"
    >
      <g transform="translate(-16.457 -24.531)">
        <circle
          id="Ellipse_46"
          dataname="Ellipse 46"
          cx="7.5"
          cy="7.5"
          r="7.5"
          transform="translate(17.788 26.154)"
          fill="#fff"
        />
        <path
          id="noun_tick_684585"
          d="M15.413 6.6a8.813 8.813.0 1 0 8.813 8.813A8.805 8.805.0 0 0 15.413 6.6zm4.265 6.986-5.219 5.2a.8.8.0 0 1-.569.244.768.768.0 0 1-.569-.244l-2.579-2.559A.818.818.0 1 1 11.9 15.068l1.99 1.99 4.63-4.63a.809.809.0 0 1 1.158.0A.847.847.0 0 1 19.678 13.586z"
          transform="translate(9.857 17.931)"
        />
      </g>
    </svg>
  )

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

          <div className="flex gap-2 flex-col sm:flex-row w-[100%] sm:w-[60%]">
            <div className="flex-1 w-full sm:w-7/12 md:w-6/12 xl:w-4/12">
              <p
                className={`${
                  sellingPlan !== ''
                    ? 'text-[#fff] bg-[#000]'
                    : 'text-[#fff] bg-[#425B34] sm:bg-black'
                } min-h-[24px] flex justify-center items-center px-[15px] pt-[3px] text-[11px] font-normal rounded-full mx-auto sm:ml-0 sm:rounded-[0px] sm:font-semibold sm:text-[14px] sm:min-h-[28px] w-fit`}
              >
                SAVE 25% ON YOUR FIRST ORDER
              </p>
              <div
                className={`${
                  sellingPlan !== '' ? 'bg-white sm:bg-[#862E1B]' : ''
                } p-[7px] sm:p-[10px] border-[3px] border-solid flex gap-6 border-[#425B34] sm:border-[#862E1B] cursor-pointer rounded-[14px] sm:rounded-[0px]`}
                onClick={() => {
                  setSellingPlan(sellingPlanFrequency)
                  window.localStorage.setItem(
                    '_sellingPlan',
                    JSON.stringify(sellingPlanFrequency),
                  )
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
                  } max-w-[142px] hidden sm:block text-[12px] focus:shadow-none shadow-none p-0 w-full outline-none border-none bg-transparent focus:outline-none bg-auto focus:border-none bg-[url('https://cdn.shopify.com/s/files/1/0672/4776/7778/files/select_svg.svg')]`}
                  value={sellingPlanFrequency}
                  onChange={(e) => {
                    setSellingPlanFrequency(e.target.value)
                    window.localStorage.setItem(
                      '_sellingPlanFrequency',
                      JSON.stringify(e.target.value),
                    )
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
              <div className="bg-[#e7eae5] rounded-[12px] sm:bg-[#ebeae9] sm:rounded-[0px] px-[12px] py-[5px]">
                <div className="mt-[4px] flex justify-between items-center sm:hidden">
                  <p className="text-black font-semibold text-[14px]">
                    Deliver Every
                  </p>
                  <div className="flex gap-2">
                    {['Delivery every 15 Days', 'Every 30 Days'].map(
                      (item, index) => {
                        // Modify item here to remove "Delivery" and capitalize "e" in "every"
                        const modifiedItem = item.replace('Delivery ', '')

                        return (
                          <div
                            key={index}
                            className={`
                          rounded-full border border-solid border-[#425B34] ${
                            sellingPlanFrequency === item
                              ? 'bg-[#425B34] text-white'
                              : 'bg-white'
                          } text-center text-[11px] font-semibold min-h-[24px] flex justify-center items-center px-[12px] leading-[100%]
                        `}
                            onClick={() => {
                              setSellingPlanFrequency(item)
                              window.localStorage.setItem(
                                '_sellingPlanFrequency',
                                JSON.stringify(item),
                              )
                            }}
                          >
                            {modifiedItem}
                          </div>
                        )
                      },
                    )}
                  </div>
                </div>
                <ul className="mt-[12px] sm:mt-0 grid grid-cols-2 gap-y-2 sm:grid-cols-1">
                  <li className="flex items-center text-[11px] sm:text-[12px] font-normal sm:font-bold m-0 ">
                    <span className="text-[#425B34] sm:text-black">
                      {checkBox}
                    </span>{' '}
                    Save 10% on Future Orders
                  </li>
                  <li className="flex items-center text-[11px] sm:text-[12px] font-normal sm:font-bold m-0">
                    <span className="text-[#425B34] sm:text-black">
                      {checkBox}
                    </span>{' '}
                    Exclusive Meat Options
                  </li>
                  <li className="flex items-center text-[11px] sm:text-[12px] font-normal sm:font-bold m-0">
                    <span className="text-[#425B34] sm:text-black">
                      {checkBox}
                    </span>{' '}
                    Customize or Cancel Anytime
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex-1 w-full sm:w-7/12 md:w-5/12 xl:w-4/12">
              <div
                className={`${
                  sellingPlan === '' ? 'bg-white sm:bg-[#862E1B]' : ''
                } p-[3px] sm:p-[10px] border-[3px] border-solid flex justify-center sm:justify-start gap-6 border-[#c6c6c6] sm:border-[#862E1B] cursor-pointer rounded-[14px] sm:rounded-[0px] subscriptionlabel sm:mt-[28px] mt-0`}
                onClick={() => {
                  setSellingPlan('')
                  window.localStorage.setItem('_sellingPlan', '')
                }}
              >
                <div
                  className={`${
                    sellingPlan === ''
                      ? 'text-black sm:text-[#fff]'
                      : 'text-[#1d1d1d]'
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
