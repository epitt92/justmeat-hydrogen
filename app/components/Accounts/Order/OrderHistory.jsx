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
  console.log('order', order)
  return (
    <div className="Card border-gray-500 border-b-2 pb-3 mb-8">
      <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-[30px] text-center md:text-start">
        <div className="basis-2/12 flex items-center justify-start md:justify-center ">
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
            <h5 className="capitalize text-[18px] font-medium ">
              Bundle Subscription
            </h5>

            <p className="capitalize font-normal leading-8 text-[16px]">
              {line_items.length} meats
            </p>

            {line_items.length &&
              line_items.map((item) => (
                <p className="capitalize font-normal leading-5 text-[16px]">
                  {item.quantity} x {item.title}
                </p>
              ))}
          </div>
        </div>
        <div className="basis-2/12">
          <div className="text-start">
            <h5 className="capitalize text-[18px] font-medium ">Shipping to</h5>
            <p className="capitalize font-normal leading-8 text-[16px]">
              {shipping_address.first_name} {shipping_address.last_name}
            </p>
            <p className="capitalize font-normal leading-8 text-[16px]">
              {shipping_address.address1}
            </p>
            <p className="capitalize font-normal leading-8 text-[16px]">
              {shipping_address.address2}
            </p>
            <p className="capitalize font-normal leading-8 text-[16px]">
              {shipping_address.city}
            </p>
            <p className="capitalize font-normal leading-8 text-[16px]">
              {shipping_address.zip}
            </p>
            <p className="capitalize font-normal leading-8 text-[16px]">
              {shipping_address.province}
            </p>
          </div>
        </div>
        <div className="basis-2/12 text-start">
          <p className="capitalize">
            {status}
            <span className="ml-2">#{external_order_id.ecommerce}</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col md:items-end justify-center md:justify-end">
        <p className="capitalize font-medium leading-8 text-[16px]">
          Subtotal:
          <span className="ml-1">{subtotal_price}</span>
        </p>
        <p className="capitalize font-medium leading-8 text-[16px]">
          Shipping:
          <span className="ml-1">
            {shipping_lines.map((shipping) => shipping.price)}
          </span>
        </p>
        <p className="capitalize font-medium leading-8 text-[16px]">
          Discounts:
          <span className="ml-1">{total_discounts}</span>
        </p>
        <p className="capitalize font-medium leading-8 text-[16px]">
          Total:
          <span className="ml-1">{total_price}</span>
        </p>
      </div>
    </div>
  )
}

export default OrderHistory
