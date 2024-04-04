import { Quantity } from '../ProductActions/Quantity'
import { cn } from '~/lib/utils'
import { LockedItem } from './LockedItem'

export function CartLineItem({ line, lineType = 'paid' }) {
  const {
    title,
    featuredImage,
    priceRange,
    variants: { nodes },
    cart_drawer_img,
  } = line

  const desktopImage =
    lineType === 'bonus' ? nodes[0]?.image.url : featuredImage.url
  const mobileImage =
    lineType === 'bonus'
      ? nodes[0]?.image.url
      : cart_drawer_img?.reference.image.url

  return (
    <div
      className={cn(
        'rounded-xl border sm:border-none border-solid border-[#425b34] overflow-hidden gap-4',
        lineType === 'bonus' ? 'sm:hidden block' : 'sm:flex block',
      )}
    >
      <img
        src={desktopImage}
        height={100}
        loading="lazy"
        className="hidden sm:block w-full sm:w-[72px]"
      />
      <img
        src={mobileImage}
        height={100}
        loading="lazy"
        className="block sm:hidden w-full sm:w-[72px]"
      />

      <div className="flex flex-1 flex-col sm:flex-row pr-[10px] justify-between items-center">
        <div className="flex-1 hidden sm:block h-fit">
          <p className="font-semibold text-[10px] sm:text-[14px] text-center">
            <strong className="pr-[10px] flex justify-center">{title}</strong>
          </p>

          <div className="flex justify-center font-bold text-center text-[12px] sm:text-[25px]">
            {lineType === 'free' && (
              <div className="flex gap-1">
                <div className="line-through text-[#929292]">$11.45</div>
                <div>FREE</div>
              </div>
            )}
            {lineType === 'paid' && (
              <div className="hidden sm:block">
                ${priceRange.maxVariantPrice.amount}
              </div>
            )}
          </div>
        </div>
      </div>
      {line && (
        <div
          className={cn(
            'flex justify-center items-center sm:mt-0',
            lineType === 'bonus' ? ' -mt-[5px]' : ' -mt-[13px]',
          )}
        >
          {lineType === 'paid' && <Quantity line={line} />}
          {lineType === 'bonus' && <LockedItem />}
        </div>
      )}
    </div>
  )
}
