import React from 'react'
import { Image } from '@shopify/hydrogen'

const OrderHistory = ({ order }) => {
  const {
    shipping_address,
    line_items,
    total_price,
    total_discounts,
    subtotal_price,
    shipping_lines,
    status,
    external_order_id,
  } = order
  let meatsCount = line_items.length

  return (
    <div className="pb-3 mb-8 border-b-2 border-gray-500 Card">
      <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-[30px] text-center md:text-start px-5">
        <div className="flex items-center justify-start basis-2/12 md:justify-center ">
          <Image
            src="https://cdn.shopify.com/s/files/1/0672/4776/7778/files/logo.svg?v=1709994462"
            width={200}
            height={150}
            loaderOptions={{ scale: 2 }}
            className="border-2 border-black"
          />
        </div>
        <div className="basis-6/12">
          <div className="text-start">
            <h5 className="capitalize text-[24px] font-bold ">
              Bundle Subscription
            </h5>

            <p className="capitalize text-[#425B34] font-normal leading-[30px] text-[18px] my-2">
              {line_items.length} meats
            </p>

            {line_items.length &&
              line_items.map((item) => (
                <p className="capitalize text-[#252525] font-normal my-2 leading-[15px] text-[16px]">
                  {item.quantity} x {item.title}
                </p>
              ))}
          </div>
        </div>
        <div className="basis-2/12">
          <div className="text-start">
            <h5 className="capitalize text-[14px] font-bold leading-3 tracking-[0.47px] my-2 ">Shipping to</h5>
            <p className="capitalize font-normal leading-5 text-[14px] tracking-[0.47px] my-2 ">
              {shipping_address.first_name} {shipping_address.last_name}
            </p>
            <p className="capitalize font-normal leading-5 text-[14px] tracking-[0.47px] my-2 ">
              {shipping_address.address1}
            </p>
            <p className="capitalize font-normal leading-5 text-[14px] tracking-[0.47px] my-2">
              {shipping_address.address2}
            </p>
            <p className="capitalize font-normal leading-5 text-[14px] tracking-[0.47px] my-2">
              {shipping_address.city}
            </p>
            <p className="capitalize font-normal leading-5 text-[14px] tracking-[0.47px] my-2">
              {shipping_address.zip}
            </p>
            <p className="capitalize font-normal leading-5 text-[14px] tracking-[0.47px] my-2">
              {shipping_address.province}
            </p>
          </div>
        </div>
        <div className="basis-2/12 text-start">
          <p className="capitalize text-[14px] font-semibold leading-3 tracking-[0.47px] my-2">
            {status}
            <span className="ml-2">#{external_order_id.ecommerce}</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center md:items-end md:justify-end pr-5">
        <p className="capitalize text-[14px] font-bold leading-3 tracking-[0.47px] my-2 pl-5 md:pl-0">
          Subtotal:
          <span className="ml-1">{subtotal_price}</span>
        </p>
        <p className="capitalize text-[14px] font-bold leading-3 tracking-[0.47px] my-2 pl-5 md:pl-0">
          Shipping:
          <span className="ml-1">
            {shipping_lines.map((shipping) => shipping.price)}
          </span>
        </p>
        <p className="capitalize text-[14px] font-bold leading-3 tracking-[0.47px] my-2 pl-5 md:pl-0 ">
          Discounts:
          <span className="ml-1">{total_discounts}</span>
        </p>
        <p className="capitalize text-[14px] font-bold leading-3 tracking-[0.47px] my-2 pl-5 md:pl-0">
          Total:
          <span className="ml-1">{total_price}</span>
        </p>
      </div>
    </div>
  )
}

export default OrderHistory
