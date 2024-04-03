import { useContext } from 'react'
import { Button } from '~/components/Button'
import { RootContext, CustomCollectionContext } from '~/contexts'

export function CartCheckoutActions() {
  const { totalCost } = useContext(RootContext)
  const { checkoutSubmitting, handleCheckout } = useContext(
    CustomCollectionContext,
  )

  return (
    <>
      {totalCost >= 75 ? (
        <div className="flex justify-center items-center w-1/2 bg-[#425b34]">
          <Button
            loading={checkoutSubmitting}
            onClick={handleCheckout}
            className="bg-[#425b34] text-[15px] py-[15px] font-semibold text-white px-1"
          >
            Continue to Checkout
          </Button>
        </div>
      ) : (
        <div className="flex justify-center items-center w-6/12 pointer-events-none select-none  bg-[#6e6e6e]">
          <Button
            disabled
            className=" text-[15px] text-center py-[15px] font-semibold text-white"
          >
            Spend $75 to Continue
          </Button>
        </div>
      )}
    </>
  )
}
