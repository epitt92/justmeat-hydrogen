import { useContext, useState } from 'react'

import { useSubmitPromise } from '~/hooks/useSubmitPromise'
import { ProductContext } from '~/contexts'
import { Button } from '~/components/Button'

export function CartCheckoutActions({ cost }) {
  const submit = useSubmitPromise()

  const { sellingPlan, bonus, selectedProducts } = useContext(ProductContext)
  const [checkoutSubmitting, setCheckoutSubmitting] = useState(false)

  async function onCheckout() {
    const totalCost = selectedProducts.reduce(
      (acc, curr) => acc + parseFloat(curr.totalAmount),
      0,
    )

    const products = [...selectedProducts]

    if (totalCost > 125) {
      products.push({
        ...bonus,
        quantity: 1,
      })
    }

    setCheckoutSubmitting(true)

    const res = await submit(
      {
        body: JSON.stringify({
          products,
          sellingPlanName: sellingPlan,
        }),
      },
      { method: 'post', action: '/products/custom-bundle' },
    )

    setCheckoutSubmitting(false)
    location.href = res.checkoutUrl
  }

  return (
    <>
      {cost >= 75 ? (
        <div className="flex justify-center items-center w-1/2 bg-[#425b34]">
          <Button
            loading={checkoutSubmitting}
            onClick={onCheckout}
            className="bg-[#425b34] text-[15px] py-[15px] font-semibold text-white px-1"
          >
            Continue to Checkout
          </Button>
        </div>
      ) : (
        <div className="flex justify-center items-center w-6/12 pointer-events-none select-none  bg-[#6e6e6e]">
          <button className=" text-[15px] text-center py-[15px] font-semibold text-white">
            Spend $75 to Continue
          </button>
        </div>
      )}
    </>
  )
}
