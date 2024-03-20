import React, { useContext, useEffect, useState } from 'react'
import HeaderContext from '../HeaderContext'

const PlanPicker = () => {
  const [activeOption, setActiveOption] = useState('option1')

  // Function to handle click on option
  const handleOptionClick = (option) => {
    setActiveOption(option)
  }

  const { setSwitchHeader } = useContext(HeaderContext)

  useEffect(() => {
    setSwitchHeader(true)
  }, [])

  const checkBox = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17.627"
      height="17.627"
      viewBox="0 0 17.627 17.627"
      ariahidden="true"
      role="presentation"
      className="svgcolor w-3 h-3 mr-1 text-green-400"
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
        <span className="font-bold text-base text-black">1,134 Reviews</span>
      </div>
    </div>
  )
  return (
    <div className=" w-[100%] border-b-2 border-solid border-[#0003]  mb-[30px] ">
      <div className="flex justify-center flex-col items-center sm:py-14 py-5 ">
        <h1 className=" text-[#1d1d1d] text-[22px] sm:text-[28px] uppercase font-bold ">
          Get your meats now
        </h1>
        <p className=" italic text-center text-black text-[16px] sm:text-[20px]">
          We guarantee you'll love it or your money back !
        </p>
        <div className="pt-2 flex ">{review}</div>

        <div className="flex justify-start flex-col lg:flex-row lg:items-start lg:gap-0 gap-8 lg:items-center pt-5 w-[100%]">
          <div className="flex w-full lg:w-4/12 items-center  xl:w-3/12 gap-2">
            <div className="w-[35px] h-[35px] lg:w-[60px] lg:h-[60px] rounded-[100%] border-2 border-[#425C35] sm:border-none sm:bg-black flex justify-center items-center  ">
              <span className=" text-[22px] lg:text-[40px] font-bold text-black sm:text-white ">
                1
              </span>
            </div>
            <div className="h-fit sm:border-b-4  sm:border-[#425B3499] sm:pb-1">
              <h3 className="font-semibold leading-7 text-[20px] lg:text-[22px] text-[#1d1d1d] sm:uppercase ">
                Select Your <br className="lg:block hidden" /> Frequency
              </h3>
            </div>
          </div>

          <div className=" flex gap-2 flex-col sm:flex-row w-[100%] lg:w-9/12 ">
            <div className="w-full sm:w-7/12 md:w-6/12 xl:w-4/12">
              <p
                className={`${
                  activeOption === 'option1'
                    ? 'text-[#fff] bg-[#000]'
                    : 'text-[#1d1d1d] bg-[#ebeae9]'
                } px-[15px] pt-[6px] text-[12px] font-bold  w-fit`}
              >
                SAVE 25% ON YOUR FIRST ORDER
              </p>
              <div
                className={`${
                  activeOption === 'option1' ? 'bg-[#862E1B]' : ''
                } p-[10px] border-[3px] border-solid flex gap-6 border-[#862E1B] subscriptionlabel`}
                onClick={() => handleOptionClick('option1')}
              >
                <div
                  className={`${
                    activeOption === 'option1'
                      ? 'text-[#fff]'
                      : 'text-[#1d1d1d]'
                  } text-[20px]   font-bold `}
                >
                  Subscribe & Save
                </div>
                <div className="flex-1">
                  <select
                    name=""
                    className={`${
                      activeOption === 'option1'
                        ? 'text-[#fff] brightness-0 invert '
                        : 'text-[#1d1d1d] '
                    } text-[12px] focus:shadow-none shadow-none p-0 w-full outline-none border-none bg-transparent focus:outline-none bg-auto  focus:border-none bg-[url('https://cdn.shopify.com/s/files/1/0672/4776/7778/files/select_svg.svg')] subscriptionlabel`}
                  >
                    <option className="text-[#000]" value="">
                      Every 30 days
                    </option>
                    <option className="text-[#000]" value="">
                      Every 15 days
                    </option>
                  </select>
                </div>
              </div>
              <div className="bg-[#ebeae9] px-[12px] py-[5px] ">
                <ul className="flex flex-col gap-2">
                  <li className="flex items-center text-[12px] font-bold m-0 ">
                    <span>{checkBox}</span> Save 10% on Future Orders
                  </li>
                  <li className="flex items-center text-[12px] font-bold m-0">
                    <span>{checkBox}</span> Exclusive Meat Options
                  </li>
                  <li className="flex items-center text-[12px] font-bold m-0">
                    <span>{checkBox}</span> Customize or Cancel Anytime
                  </li>
                </ul>
              </div>
            </div>

            <div className=" w-full sm:w-7/12 md:w-5/12 xl:w-4/12">
              <p className="px-[15px] hidden sm:block pt-[6px] text-[12px] font-bold bg-transparent text-transparent ">
                " "
              </p>

              <div
                className={`${
                  activeOption === 'option2' ? 'bg-[#862E1B]' : ''
                } p-[10px] border-[3px] border-solid flex gap-6 border-[#862E1B] subscriptionlabel`}
                onClick={() => handleOptionClick('option2')}
              >
                <div
                  className={`${
                    activeOption === 'option2'
                      ? 'text-[#fff]'
                      : 'text-[#1d1d1d]'
                  } text-[20px]  font-bold`}
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
