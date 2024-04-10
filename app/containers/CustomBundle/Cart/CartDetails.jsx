import { useContext } from 'react'

import { CustomBundleContext } from '~/contexts'

import { CartCheckoutActions } from './CartCheckoutActions'
import { CartLines } from './CartLines'
import { CartSummary } from './CartSummary'
import { LockedItem } from './LockedItem'

export function CartDetails({ layout, onCheckout }) {
  const { selectedProducts } = useContext(CustomBundleContext)

  const cartHasItems = selectedProducts.length > 0

  return (
    <div className="flex flex-col justify-between cart-details">
      <CartLines />
      {cartHasItems && (
        <>
          <div className="p-5 pb-3 bg-white">
            <div className="border-b-4 pb-[10px] border-black">
              <CartSummary layout={layout}>
                <CartCheckoutActions onCheckout={onCheckout} />
              </CartSummary>
            </div>
            <div className="flex justify-end gap-3 pt-0 ">
              <div className="flex flex-col items-end justify-end flex-1 gap-1">
                <p className="text-[14px] font-semibold text-black">
                  Free Bonus Meat (unlocked at $125)
                </p>
                <LockedItem />
              </div>
              <img
                className="w-[80px] h-[80px] object-contain "
                src="https://cdn.shopify.com/s/files/1/0672/4776/7778/files/free-meat-unlocked-at-125-536967_medium_d6071a01-575e-4b92-99c9-67caead4140f.png"
                alt=""
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
