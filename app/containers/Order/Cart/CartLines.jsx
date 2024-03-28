import { CartLineItem } from './CartLineItem'

export function CartLines({ selectedProducts, onRemove, setSelectedProducts }) {
  if (!selectedProducts) return null

  return (
    <div aria-labelledby="cart-lines" className="h-[260px] overflow-auto">
      <ul>
        {selectedProducts.map((product) => (
          <CartLineItem
            key={product.id}
            line={product}
            onRemove={onRemove}
            setSelectedProducts={setSelectedProducts}
            selectedProducts={selectedProducts}
          />
        ))}
      </ul>
    </div>
  )
}
