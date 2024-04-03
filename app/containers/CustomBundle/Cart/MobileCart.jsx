import { useContext, useState } from 'react'
import { cn } from '~/lib/utils'
import { Button } from '~/components/Button'
import { RootContext, CustomBundleFormContext } from '~/contexts'
import { ProgressBar } from './ProgressBar'
import { CartLines } from './CartLines'
import { PlanPicker } from '../PlanPickerBlock/PlanPicker'

export const MobileCart = () => {
  const { totalCost } = useContext(RootContext)
  const { checkoutSubmitting, handleCheckout } = useContext(
    CustomBundleFormContext,
  )

  const [cartOpen, setCartOpen] = useState(false)

  const isCheckoutable = totalCost >= 75

  return (
    <div className="mobile-cart">
      <Button
        onClick={() => setCartOpen(true)}
        className={cn(
          'sm:hidden fixed bottom-[12px] left-[50%] transform translate-x-[-50%] w-[96%] rounded-xl py-[12px] text-white font-semibold',
          isCheckoutable ? 'bg-[#425b34]' : 'bg-[#AAAAAA]',
        )}
      >
        {isCheckoutable
          ? `View Cart - ($${totalCost.toFixed(2)})`
          : `Add $${(75 - totalCost).toFixed(
              2,
            )} to Unlock Cart ($${totalCost.toFixed(2)})`}
      </Button>

      <div
        className={cn(
          'fixed flex flex-col justify-between w-full h-screen sm:hidden transition-transform duration-300 left-0 top-0 bg-white',
          cartOpen ? 'translate-y-0' : 'translate-y-full',
        )}
      >
        <div>
          <div className="px-[20px] py-[5px] flex justify-between bg-[#eeeded] font-bold">
            <div className="flex items-center">
              {!isCheckoutable && 'Add $75 to Unlock Order'}
            </div>
            <Button
              onClick={() => setCartOpen(false)}
              className="rounded-full px-[10px] py-[2px] border-solid border-[2px] border-[#425b34]"
            >
              Hide Cart
            </Button>
          </div>
          <ProgressBar />
        </div>
        <div className="flex-1 shrink overflow-y-auto mt-4 py-[6px] border-t border-solid border-[#d3d3d3]">
          <CartLines />
        </div>
        <div className="p-[5px] flex flex-col gap-[10px]">
          <PlanPicker />
          <Button
            loading={checkoutSubmitting}
            onClick={handleCheckout}
            className={cn(
              'rounded-xl text-white font-semibold text-center py-[12px]',
              isCheckoutable ? 'bg-[#425b34]' : 'bg-[#AAAAAA]',
            )}
          >
            Checkout - ${totalCost.toFixed(2)}{' '}
            {isCheckoutable ? '' : '(Add $75 to Unlock)'}
          </Button>
        </div>
      </div>
    </div>
  )
}
