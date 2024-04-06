import { Quantity } from '../ProductActions/Quantity'
import { cn } from '~/lib/utils'
import { LockedItem } from './LockedItem'
import { useEffect , useState } from 'react'

export function CartLineItem({ line, lineType = 'paid' }) {
  const {
    title,
    tags,
    featuredImage,
    priceRange,
    variants: { nodes },
    cart_drawer_img,
  } = line
  
  const [freeTag, setFreeTag] = useState('');

  useEffect(() => {
    if (tags && tags.length > 0) {
      tags.forEach(tag => {
        if (tag.includes('free-')) {
          let priceForFreeProduct = tag.split("-");
          priceForFreeProduct = +priceForFreeProduct[1];
          setFreeTag(priceForFreeProduct);
        }
      });
    }
  }, [tags]);
  
  const desktopImage =
    lineType === 'bonus' ? nodes[0]?.image.url : featuredImage.url
  const mobileImage =
    lineType === 'bonus'
      ? nodes[0]?.image.url
      : cart_drawer_img?.reference.image.url

  return (
    <div
      className={cn(
        'rounded-t-xl sm:border-none border-solid overflow-hidden border-[#425b34] gap-4',
        lineType === 'bonus' ? 'sm:hidden block' : 'sm:flex block',
        lineType !== 'paid' ? 'border' : 'border-t border-l border-r',
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
                <div className="line-through text-[#929292]">{`$ ${freeTag}`}</div>
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
        {lineType === 'free' && (
          <>
            <span className="text-black -mt-15 pb-10 font-roboto">Free</span>
            <button className="w-full bg-[#1b7084] text-white px-[10px] py-[20px] text-[12px] font-['Roboto'] mb-[10px]">
              First Order Gift
            </button>
          </>
        )}
      </div>
      {line && (
        <div
          className={cn(
            'flex justify-center items-center sm:mt-0',
            lineType === 'bonus' ? ' -mt-[5px]' : ' -mt-[13px]',
          )}
        >
          {lineType === 'paid' && <Quantity isViewingCart={true} line={line} />}
          {lineType === 'bonus' && <LockedItem />}
        </div>
      )}
    </div>
  )
}
