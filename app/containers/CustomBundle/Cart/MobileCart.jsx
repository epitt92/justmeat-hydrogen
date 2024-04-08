import { useContext, useState , useEffect } from 'react'
import { cn, formatPrice } from '~/lib/utils'
import { Button } from '~/components/Button'
import { CustomBundleContext } from '~/contexts'
import { ProgressBar } from './ProgressBar'
import { CartLines } from './CartLines'
import { PlanPicker } from '../PlanPickerBlock/PlanPicker'
import { useLoaderData } from '@remix-run/react'

export const MobileCart = () => {
  const { freeProduct } = useLoaderData()
  const { totalCost, submitting, handleSubmit, isCartPage } =
    useContext(CustomBundleContext)
  console.log('🚀 ~ MobileCart ~ isCartPage:', isCartPage)

  const [cartOpen, setCartOpen] = useState(false)

  const [freeTag, setFreeTag] = useState(0);

  useEffect(() => {
    let tags = freeProduct.tags;
    if (tags && tags.length > 0) {
      tags.forEach(tag => {
        if (tag.includes('free-')) {
          let priceForFreeProduct = tag.split("-");
          priceForFreeProduct = parseFloat(priceForFreeProduct[1]);
          setFreeTag(priceForFreeProduct);
        }
      });
    }
  }, [freeProduct]);

  const isCheckoutable = totalCost >= 75
  const total = totalCost + freeTag;

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
              ? `View Cart - ($${formatPrice(totalCost)})`
              : `Add $${formatPrice(
                  75 - totalCost,
                )} to Unlock Cart ($${formatPrice(totalCost)})`}
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
        <div className="flex-1 shrink overflow-y-auto mt-4 py-[6px] border-t border-solid border-[#d3d3d3]">
          <CartLines />
        </div>
        <div className="p-[5px] flex flex-col gap-[10px]">
          {isCartPage && (
            <PlanPicker total={total} totalCostForPlan={totalCost} />
          )}
          <Button
            loading={submitting}
            onClick={handleSubmit}
            className={cn(
              'rounded-xl text-white font-semibold text-center py-[12px]',
              isCheckoutable ? 'bg-[#425b34]' : 'bg-[#AAAAAA]',
            )}
          >
            {isCheckoutable
              ? isCartPage
                ? 'Checkout'
                : 'Update Changes'
              : 'Spend $75 to Continue)'}
          </Button>
        </div>
      </div>
    </div>
  )
}
