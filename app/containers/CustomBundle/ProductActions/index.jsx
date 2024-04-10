import React, { useContext } from 'react'

import { CustomBundleContext } from '~/contexts'

import { Add } from './Add'
import { Quantity } from './Quantity'

export const ProductActions = ({ product }) => {
  const { selectedProducts } = useContext(CustomBundleContext)
  const line = selectedProducts.find(
    (selectedProduct) => selectedProduct.id === product.id,
  )

  return (
    <div>{line ? <Quantity line={line} /> : <Add product={product} />}</div>
  )
}
