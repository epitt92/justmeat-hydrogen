import { useContext, useState } from 'react'
import { cn } from '~/lib/utils'
import { Button } from '~/components/Button'
import { ProductContext } from '~/contexts'
import { ProgressBar } from './ProgressBar'
import { CartLines } from './CartLines'

export const MobileCart = () => {
  const { totalCost } = useContext(ProductContext)
  const [cartOpen, setCartOpen] = useState(true)

  const isCheckoutable = totalCost >= 75

  return (
    <>
      <Button
        onClick={() => setCartOpen(true)}
        className={cn(
          'sm:hidden fixed bottom-[12px] left-[50%] transform translate-x-[-50%] w-[96%] rounded-[12px] min-h-[50px] flex justify-center items-center',
          isCheckoutable ? 'bg-[#425b34]' : 'bg-[#AAAAAA]',
        )}
      >
        <p className="text-white text-[17px] font-semibold">
          {isCheckoutable
            ? `View Cart - ($${totalCost.toFixed(2)})`
            : `Add $${(75 - totalCost).toFixed(
                2,
              )} to Unlock Cart ($${totalCost.toFixed(2)})`}
        </p>
      </Button>

      <div
        className={cn(
          'fixed w-full h-screen block sm:hidden transition-transform duration-300 left-0 top-0 bg-white',
          cartOpen ? 'translate-y-0' : 'translate-y-full',
        )}
      >
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
        <div className="mt-8 py-[6px] border-t border-solid border-[#d3d3d3]">
          <CartLines />
        </div>
      </div>
    </>
  )
}
