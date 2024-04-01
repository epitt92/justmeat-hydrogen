import { useContext } from 'react'
import { CartLineItem } from './CartLineItem'
import { RootContext } from '~/contexts'
import ranchImage from '~/assets/ranch-rub-chicken-breast-260533.webp'

export function CartLines() {
  const { selectedProducts } = useContext(RootContext)

  const freeProduct = {
    title: 'Ranch Rub Chicken Breast',
    featuredImage: {
      url: ranchImage,
    },
    priceRange: { maxVariantPrice: { amount: 11.45 } },
  }

  return (
    <div
      aria-labelledby="cart-lines"
      className="sm:h-[360px] overflow-auto px-[10px]"
    >
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-1">
        <CartLineItem line={freeProduct} isFree={true} />
        {selectedProducts.map((product) => (
          <CartLineItem key={product.id} line={product} />
        ))}
      </div>
    </div>
  )
}
