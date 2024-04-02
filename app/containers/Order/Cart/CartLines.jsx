import { useContext } from 'react'
import { useLoaderData } from '@remix-run/react'

import { CartLineItem } from './CartLineItem'
import { RootContext } from '~/contexts'

export function CartLines() {
  const { bonusProduct, freeProduct } = useLoaderData()
  const { bonusVariant, selectedProducts, totalCost } = useContext(RootContext)

  // const bonusLine = {
  //   ...bonusProduct,
  //   variants: { nodes: [bonusVariant || bonusProduct.variants.nodes[0]] },
  // }

  return (
    <div
      aria-labelledby="cart-lines"
      className="sm:h-[360px] overflow-auto px-[10px]"
    >
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-1">
        {/* {totalCost > 125 && <CartLineItem line={bonusLine} lineType="bonus" />} */}
        { freeProduct ? <CartLineItem line={freeProduct} lineType="free" /> : null} 
        {selectedProducts.map((product) => (
          <CartLineItem key={product.id} line={product} />
        ))}
      </div>
    </div>
  )
}
