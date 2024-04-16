import { useLoaderData } from '@remix-run/react'
import React, { useContext, useEffect } from 'react'
import { cn, formatPrice } from '~/lib/utils'
import { CustomBundleContext, RootContext } from '~/contexts'
import { CheckBox } from '~/icons/CheckBox'
import { PROMO_CODES } from '../../../promo-codes'

export const PlanPicker = ({ total, totalCostForPlan, freeTag }) => {
  const {
    sellingPlan,
    setSellingPlan,
    sellingPlanFrequency,
    setSellingPlanFrequency,
    totalCost,
  } = useContext(CustomBundleContext)

  const {
    setCartProducts
  } = useContext(RootContext)

  const { discountCodes } = useLoaderData()

  // Get influencer discount codes
  const influencerCode = PROMO_CODES.filter((code) =>
    discountCodes.includes(code.code),
  )

  const firstOrderSavingNumber =
    influencerCode.length > 0 ? parseFloat(influencerCode[0].percentage) : 25

  const firstOrderSavingFormatted = (firstOrderSavingNumber / 100) * totalCostForPlan;

  const planCartUpdate = () => {
    let planCheck = localStorage.getItem("_cartSellingPlan");
    let cartData = localStorage.getItem("_cartProducts");
    if (planCheck && cartData) {
      if (planCheck === `"Delivery every 15 Days"` || planCheck === `"Delivery every 30 Days"`) {
        console.log("on plan");
      } else if (planCheck === `""`) {
        cartData = JSON.parse(localStorage.getItem("_cartProducts"));
        const filteredProducts = cartData.filter(product => 
          product.id !== "gid://shopify/Product/8249959186658" &&
          product.id !== "gid://shopify/Product/8380896706786" &&
          product.id !== "gid://shopify/Product/8380892872930"
        );
        setCartProducts(filteredProducts);
      }
    }
  };

  useEffect(() => {
    planCartUpdate();
  }, []);

  return (
    <div className="flex gap-2 flex-col lg:flex-row w-[100%] lg:!max-w-[760px]">
      <div className="flex-1 w-full lg:w-6/12 xl:w-4/12">
        <p
          className={`${
            sellingPlan
              ? 'text-[#fff] sm:bg-[#000] bg-[#425B34]'
              : 'sm:text-black sm:bg-[#ebeae9] bg-[#aaa] text-white'
          } min-h-[24px] flex justify-center items-center px-[15px] pt-[3px] text-[11px] font-normal rounded-full mx-auto sm:ml-0 sm:rounded-[0px] sm:font-semibold sm:text-[14px] sm:min-h-[28px] w-fit`}
        >
          SAVE {influencerCode.length > 0 ? influencerCode[0].percentage : 25}%
          ON YOUR FIRST ORDER
        </p>
        <div
          className={`${
            sellingPlan ? 'bg-white sm:bg-[#862E1B] text-black sm:text-[#fff]' : 'border-[#eaeaea] text-[#1d1d1d] sm:hover:text-[#fff]'
          } p-[7px] sm:p-[10px] border-[3px] border-solid flex gap-6 border-[#425B34] sm:border-[#862E1B] sm:hover:bg-[#862E1B] cursor-pointer rounded-[14px] sm:rounded-[0px]`}
          onClick={() => {
            setSellingPlan(sellingPlanFrequency);
            planCartUpdate();
          }}
        >
          <div
            className={`leading-[100%] flex-1 text-[18px] sm:text-[20px] text-center sm:text-left font-bold`}
          >
            <span className="sm:hidden line-through decoration-[#919191] decoration-[3px] text-[#919191] mr-2">
              {total > freeTag ? `$${parseInt(total)}` : ''}
            </span>
            <span className="hidden sm:inline line-through decoration-[#919191] decoration-[3px] text-[#919191] mr-2">
              {total > freeTag ? `$${formatPrice(total)}` : ''}
            </span>

            <span className="sm:hidden">
              {totalCostForPlan
                ? `$${parseInt(totalCostForPlan - firstOrderSavingFormatted)}`
                : ''}{' '}
              Subscribe & Save
            </span>
            <span className={`hidden sm:inline sm:hover:text-[#fff]`}>
              {totalCostForPlan
                ? `$${formatPrice(
                    totalCostForPlan - firstOrderSavingFormatted,
                  )}`
                : ''}{' '}
              Subscribe & Save
            </span>
          </div>

          <select
            name=""
            className={`${
              sellingPlan ? 'brightness-0 invert' : ''
            } sm:hover:text-[#fff] max-w-[142px] hidden sm:block text-[12px] pl-[10px] py-0 pr-0 w-full bg-transparent bg-auto bg-[url('https://cdn.shopify.com/s/files/1/0672/4776/7778/files/select_svg.svg')]
            outline-none border-none focus:shadow-none shadow-none focus:outline-none focus:border-none webkit-box-shadow-none 
            `}
            value={sellingPlanFrequency}
            onChange={(e) => {
              setSellingPlanFrequency(e.target.value)
            }}
          >
            <option className="text-[#000]" value="Delivery every 15 Days">
              Every 15 days
            </option>
            <option className="text-[#000]" value="Delivery every 30 Days">
              Every 30 days
            </option>
          </select>
        </div>
        <div
          className={cn(
            'rounded-[12px] sm:bg-[#ebeae9] sm:rounded-[0px] px-[12px] py-[5px]',
            sellingPlan ? 'bg-[#e7eae5]' : 'bg-[#f4f4f4]',
          )}
        >
          <div className="mt-[4px] flex justify-between items-center sm:hidden">
            <p className="hidden lg:block text-black font-semibold text-[14px]">
              Select Frequency
            </p>
            <p className="lg:hidden block text-black font-semibold text-[14px]">
              Select Frequency
            </p>
            <div className="flex gap-2">
              <div
                className={cn(
                  'rounded-full border border-solid  text-center text-[11px] font-semibold min-h-[24px] flex justify-center items-center px-[12px] leading-[100%]',
                  sellingPlanFrequency === 'Delivery every 15 Days'
                    ? sellingPlan
                      ? 'bg-[#425B34] text-white'
                      : 'bg-[#aaaaaa] text-white'
                    : 'bg-white',
                  sellingPlan ? 'border-[#425B34]' : 'border-[#aaa]',
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
                    ? sellingPlan
                      ? 'bg-[#425B34] text-white'
                      : 'bg-[#aaaaaa] text-white'
                    : 'bg-white',
                  sellingPlan ? 'border-[#425B34]' : 'border-[#aaa]',
                )}
                onClick={() => {
                  setSellingPlanFrequency('Delivery every 30 Days')
                }}
              >
                Every 30 Days
              </div>
            </div>
          </div>
          <ul className="mt-[12px] sm:mt-0 grid grid-cols-2 sm:grid-cols-1">
            <li className="flex items-center text-[11px] sm:text-[12px] font-normal sm:font-bold m-0 sm:flex md:hidden lg:hidden">
              <span className="text-[#425B34] sm:text-black">
                <CheckBox
                  className={
                    sellingPlan
                      ? 'fill-[#425b34] sm:fill-black'
                      : 'fill-[#aaaaaa]'
                  }
                />
              </span>{' '}
              25% Off First Order
            </li>
            <li className="flex items-center text-[10px] sm:text-[12px] font-medium sm:font-bold m-0 sm:flex md:hidden lg:hidden">
              <span className="text-[#425B34] sm:text-black">
                <CheckBox
                  className={
                    sellingPlan
                      ? 'fill-[#425b34] sm:fill-black'
                      : 'fill-[#aaaaaa]'
                  }
                />
              </span>{' '}
              Subscriber-Only Monthly Flavors
            </li>
            <li className="flex items-center text-[11px] sm:text-[12px] font-normal sm:font-bold m-0 sm:flex md:hidden lg:hidden">
              <span className="text-[#425B34] sm:text-black">
                <CheckBox
                  className={
                    sellingPlan
                      ? 'fill-[#425b34] sm:fill-black'
                      : 'fill-[#aaaaaa]'
                  }
                />
              </span>{' '}
              10% Off Future Orders
            </li>

            <li className="flex items-center text-[11px] sm:text-[12px] font-normal sm:font-bold m-0 hidden md:flex lg:flex">
              <span className="text-[#425B34] sm:text-black">
                <CheckBox
                  className={
                    sellingPlan
                      ? 'fill-[#425b34] sm:fill-black'
                      : 'fill-[#aaaaaa]'
                  }
                />
              </span>
              {influencerCode.length > 0
                ? `${influencerCode[0].percentage}% Off First Order`
                : 'Save 10% on Future Orders'}
            </li>
            <li className="flex items-center text-[11px] sm:text-[12px] font-normal sm:font-bold m-0 hidden md:flex lg:flex">
              <span className="text-[#425B34] sm:text-black">
                <CheckBox
                  className={
                    sellingPlan
                      ? 'fill-[#425b34] sm:fill-black'
                      : 'fill-[#aaaaaa]'
                  }
                />
              </span>{' '}
              Exclusive Meat Options
            </li>
            <li className="flex items-center text-[10px] sm:text-[12px] font-medium sm:font-bold m-0">
              <span className="text-[#425B34] sm:text-black">
                <CheckBox
                  className={
                    sellingPlan
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

      <div className="flex-1 w-full lg:w-5/12 xl:w-4/12">
        <div
          className={`${
            !sellingPlan
              ? 'bg-white sm:bg-[#862E1B] border-[#425B34]'
              : 'border-[#eaeaea]'
          }  border-[3px] border-solid flex justify-center sm:justify-start gap-6 sm:border-[#862E1B] cursor-pointer rounded-[14px] sm:rounded-[0px] subscriptionlabel sm:mt-[28px] mt-0 plan-change-button`}
          onClick={() => {
            setSellingPlan('');
            planCartUpdate();
          }}
        >
          <div
            className={`${
              sellingPlan ? 'text-[#1d1d1d]' : 'text-black sm:text-[#fff]'
            } sm:hover:bg-[#862E1B] sm:hover:text-[#fff] text-[18px] sm:text-[20px] p-[7px] sm:p-[10px] w-full font-bold text-center sm:text-left leading-[100%] sm:leading-[24px]`}
          >
            <span className="sm:hidden line-through decoration-[#919191] decoration-[3px] text-[#919191] mr-2">
              {total > freeTag ? `$${parseInt(total)}` : ''}
            </span>
            <span className="hidden sm:inline line-through decoration-[#919191] decoration-[3px] text-[#919191] mr-2">
              {total > freeTag ? `$${formatPrice(total)}` : ''}
            </span>
            <span className="sm:hidden">
              {totalCostForPlan ? `$${parseInt(totalCostForPlan)}` : ''} One
              Time
            </span>
            <span className="hidden sm:inline">
              {totalCostForPlan ? `$${formatPrice(totalCostForPlan)}` : ''} One
              Time
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
