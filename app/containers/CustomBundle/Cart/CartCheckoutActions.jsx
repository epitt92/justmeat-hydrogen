import { useContext } from 'react'

import { Button } from '~/components/Button'
import { CustomBundleContext } from '~/contexts'
import { cn } from '~/lib/utils'

export function CartCheckoutActions() {
  const { isCartPage, costForOneTime, submitting, handleSubmit } =
    useContext(CustomBundleContext)

  return (
    <>
      {costForOneTime >= 75 ? (
        <div className="flex justify-center items-center w-1/2 bg-[#425b34]">
          <Button
            loading={submitting}
            onClick={handleSubmit}
            className={cn(
              isCartPage ? 'btn-checkout' : '',
              'bg-[#425b34] text-[15px] py-[15px] font-semibold text-white px-1',
            )}
          >
            {isCartPage ? 'Continue To Checkout' : 'Update Changes'}
          </Button>
        </div>
      ) : (
        <div className="flex justify-center items-center w-6/12 pointer-events-none select-none  bg-[#6e6e6e]">
          <Button
            disabled
            className=" text-[15px] text-center py-[15px] font-semibold text-white"
          >
            Spend $75 To Continue
          </Button>
        </div>
      )}
    </>
  )
}
