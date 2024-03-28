import { useContext, useEffect, useState } from 'react'

import { ProductContext } from '~/contexts'
import { CartEmpty } from './CartEmpty'
import { ProgressBar } from './ProgressBar'
import { CartDetails } from './CartDetails'

export function Cart({ layout, onCheckout }) {
  const { selectedProducts, setSelectedProducts } = useContext(ProductContext)

  const [subTotal, setSubTotal] = useState(0)
  const linesCount = Boolean(selectedProducts.length || 0)

  useEffect(() => {
    // Calculate the total cost of all products in selectedProducts
    const totalCost = selectedProducts.reduce(
      (acc, curr) => acc + parseFloat(curr.totalAmount),
      0,
    )
    // Update the mainCart state with the total cost
    setSubTotal(totalCost)
  }, [selectedProducts])

  return (
    <div className="cart-main">
      <ProgressBar cost={subTotal} />
      <CartDetails
        layout={layout}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        subTotal={subTotal}
        onCheckout={onCheckout}
      />
      <CartEmpty hidden={linesCount} />
    </div>
  )
}
