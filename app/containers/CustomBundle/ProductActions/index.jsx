import React, { useContext } from 'react'
import { RootContext } from '~/contexts'
import { Quantity } from './Quantity'
import { Add } from './Add'

export const ProductActions = ({ product }) => {
  const { selectedProducts } = useContext(RootContext)
  const line = selectedProducts.find(
    (selectedProduct) => selectedProduct.id === product.id,
  )

  return (
    <div>{line ? <Quantity line={line} /> : <Add product={product} />}</div>
  )
}
