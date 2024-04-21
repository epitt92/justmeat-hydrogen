import { useContext, useState } from 'react'

import { Button } from '~/components/Button'
import { CustomBundleContext } from '~/contexts'
import { cn, formatPriceWithRoundOf } from '~/lib/utils'

import { PlanPicker } from '../PlanPickerBlock/PlanPicker'
import { CartLines } from './CartLines'
import { ProgressBar } from './ProgressBar'

export const MobileCart = () => {
  const {
    cost,
    costForOneTime,
    costForSubscription,
    submitting,
    handleSubmit,
    isCartPage,
    sellingPlan,
  } = useContext(CustomBundleContext)

  const [cartOpen, setCartOpen] = useState(false)

  const isCheckoutable = costForOneTime >= 75

  return (
    <div className="mobile-cart">
      <Button
        onClick={() => setCartOpen(true)}
        className={cn(
          'lg:hidden fixed bottom-[12px] left-[50%] transform translate-x-[-50%] w-[96%] rounded-xl py-[12px] text-white font-semibold',
          isCheckoutable ? 'bg-[#425b34]' : 'bg-[#AAAAAA]',
        )}
      >
        {isCartPage && (
          <>
            {isCheckoutable
              ? `View Cart - ($${cost})`
              : `Add $${75 - costForOneTime} to Unlock Cart ($${cost})`}
          </>
        )}
        {!isCartPage && (
          <>{isCheckoutable ? `Update Changes` : `Spend $75 to Continue`}</>
        )}
      </Button>

      <div
        className={cn(
          'fixed flex flex-col justify-between w-full h-screen lg:hidden transition-transform duration-300 left-0 top-0 bg-white',
          cartOpen ? 'translate-y-0' : 'translate-y-full',
        )}
      >
        <div>
          <div className="px-[20px] py-[5px] flex justify-between bg-[#eeeded] font-bold">
            <div className="flex items-center">Add $75 to Unlock Order</div>
            <Button
              onClick={() => setCartOpen(false)}
              className="rounded-full px-[10px] py-[2px] border-solid border-[2px] border-[#425b34]"
            >
              Hide {isCartPage && 'Cart'}
            </Button>
          </div>
          <ProgressBar />
        </div>
        <div className="flex-1 shrink overflow-y-scroll mt-4 py-[6px] border-t border-solid border-[#d3d3d3]">
          <CartLines />
        </div>
        <div className="p-[5px] flex flex-col gap-[10px] [box-shadow:0_-3px_15px_-5px_#333]">
          {isCartPage && <PlanPicker />}
          <Button
            loading={submitting}
            disabled={!isCheckoutable}
            onClick={handleSubmit}
            className={cn(
              'rounded-xl text-white font-semibold text-center py-[12px]',
              isCheckoutable ? 'bg-[#425b34]' : 'bg-[#AAAAAA]',
            )}
          >
            {isCheckoutable
              ? isCartPage
                ? sellingPlan
                  ? `Checkout - $${costForSubscription}`
                  : `Checkout - $${costForOneTime} `
                : 'Update Changes'
              : `Checkout - $${cost} (Add $75 to Unlock)`}
          </Button>
        </div>
      </div>
    </div>
  )
}
