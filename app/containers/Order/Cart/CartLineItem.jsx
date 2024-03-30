import { Quantity } from '../ProductActions/Quantity'

export function CartLineItem({ line, isFree = false }) {
  const { title, featuredImage, priceRange } = line
  const image = featuredImage.url

  return (
    <div className="flex flex-col gap-1 sm:gap-4 sm:flex-row">
      {featuredImage && (
        <img
          src={image}
          height={100}
          loading="lazy"
          className="w-full sm:w-[72px]"
        />
      )}

      <div className="flex flex-1 flex-col sm:flex-row pr-[10px] justify-between items-center ">
        <div className="flex-1 h-fit">
          <p className="font-semibold text-[10px] sm:text-[14px] text-center">
            <strong className="pr-[10px] flex justify-center">{title}</strong>
          </p>

          <div className="flex justify-center font-bold text-center text-[12px] sm:text-[25px]">
            {isFree ? (
              <div className="flex gap-1">
                <div className="line-through text-[#929292]">
                  {priceRange.maxVariantPrice.amount}
                </div>
                <div>FREE</div>
              </div>
            ) : (
              `$${priceRange.maxVariantPrice.amount}`
            )}
          </div>
        </div>
        {line && (
          <div className={isFree ? 'invisible' : 'visible'}>
            <Quantity line={line} />
          </div>
        )}
      </div>
    </div>
  )
}
