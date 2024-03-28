import { ProductQuantity } from '../ProductQuantity'

export function CartLineItem({
  line,
  onRemove,
  selectedProducts,
  setSelectedProducts,
}) {
  const { id, title, featuredImage, priceRange, quantity } = line
  const image = featuredImage.url
  const price = priceRange?.maxVariantPrice?.amount

  return (
    <li key={id} className="cart-line pl-[10px] mb-2 flex gap-4">
      {featuredImage && (
        <img src={image} alt="" height={100} loading="lazy" width={72} />
      )}

      <div className="flex  flex-1 pr-[10px] justify-between items-center ">
        <div className="flex-1 h-fit">
          <p className="font-semibold text-[14px]  text-center ">
            <strong className="pr-[10px] flex justify-center">{title}</strong>
          </p>

          <p className="font-bold text-center text-[25px]">
            ${priceRange.maxVariantPrice.amount}
          </p>
        </div>
        {line && (
          <ProductQuantity
            line={line}
            onRemove={onRemove}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
          />
        )}
      </div>
    </li>
  )
}
