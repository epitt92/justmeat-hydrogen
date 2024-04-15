import { useContext } from 'react'

import { useLoaderData } from '@remix-run/react'

import { CustomBundleContext } from '~/contexts'

import { CartLineItem } from './CartLineItem'

export function CartLines() {
  const { bonusProduct, freeProduct } = useLoaderData()
  const { bonusVariant, selectedProducts, totalCost } =
    useContext(CustomBundleContext)

  const bonusLine = {
    ...bonusProduct,
    variants: { nodes: [bonusVariant || bonusProduct.variants.nodes[0]] },
  }

  return (
    <div
      aria-labelledby="cart-lines"
      className="sm:h-[360px] overflow-auto px-[10px] mb-[25px]"
    >
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-1">
        {totalCost > 125 && <CartLineItem line={bonusLine} lineType="bonus" />}
        <CartLineItem line={freeProduct} lineType="free" />
        {selectedProducts.map((product) => (
          <CartLineItem key={product.id} line={product} />
        ))}
      </div>
    </div>
  )
}
