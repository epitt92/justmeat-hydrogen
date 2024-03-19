import React from 'react'
import {Image} from '@shopify/hydrogen';
const OrderHistory = ({order}) => {
  
    const {shipping_address,line_items,total_price,total_discounts,subtotal_price,shipping_lines} = order;

    console.log("order",order);
  return (
    <div className='Card border-gray-500 border-b-2 pb-3 mb-8'>
    <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-[30px] text-center md:text-start">
        <div className='basis-2/12 flex items-center justify-center '>
            <Image 
                src="https://just-meats-sandbox.myshopify.com/cdn/shop/files/50-off-807291_600x.png?v=1702931382" 
                width={200} 
                height={150}
                loaderOptions={{scale: 2}}
                 />
        </div>
        <div className='basis-6/12'>
            <div className=''>
           
                        <h5 className='capitalize text-[18px] font-medium '>Bundle {line_items[0].purchase_item_type}</h5>
               
               
               
                
                <p className='capitalize font-normal leading-8 text-[16px]'>9 meats</p>

                {line_items.map(item=>(
                    <p className='capitalize font-normal leading-5 text-[16px]'>{item.quantity} x {item.title}</p>

                ))}
                
                
            </div>
        </div>
        <div className='basis-2/12'>
            <div className=''>
                <h5 className='capitalize text-[18px] font-medium '>Shipping to</h5>
                <p className='capitalize font-normal leading-8 text-[16px]'>61 Aruba drive</p>
                <p className='capitalize font-normal leading-8 text-[16px]'>utah, 84404</p>
                <p className='capitalize font-normal leading-8 text-[16px]'>{shipping_address.country_code}</p>
            </div>
        </div>
        <div className='basis-2/12'>
            <p>Success
                <span className='ml-2'>#5265596256665</span>
            </p>
        </div>
    </div>
    <div className='flex flex-col items-end justify-end'>
        <p className='capitalize font-medium leading-8 text-[16px]'>Subtotal: 
            <span className='ml-1'>{subtotal_price}</span>
        </p>
        <p className='capitalize font-medium leading-8 text-[16px]'>Shipping: 
            <span className='ml-1'>
                {shipping_lines.map(shipping=>(
                    shipping.price
                ))}
                </span>
        </p>
        <p className='capitalize font-medium leading-8 text-[16px]'>Discounts: 
            <span className='ml-1'>{total_discounts}</span>
        </p>
        <p className='capitalize font-medium leading-8 text-[16px]'>Total: 
            <span className='ml-1'>{total_price}</span>
        </p>
    </div>
</div>
  )
}

export default OrderHistory