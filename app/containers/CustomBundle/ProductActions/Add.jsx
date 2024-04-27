import { useContext } from 'react'

import { CustomBundleContext } from '~/contexts'

export const Add = ({ product }) => {
  const { selectedProducts, setSelectedProducts } =
    useContext(CustomBundleContext)

  const productPrice = product?.priceRange?.maxVariantPrice?.amount

  function addToSelectedProducts() {
    const newSelectedProducts = [
      ...selectedProducts,
      {
        ...product,
        quantity: 1,
        amount: productPrice,
        totalAmount: productPrice,
      },
    ]
    setSelectedProducts(newSelectedProducts)
  }

  return (
    <button
      onClick={addToSelectedProducts}
      className="btn-add-to-cart bg-[#862e1b] mx-auto flex justify-center items-center py-[8px] gap-[5px] px-[20px] leading-none font-bold text-white"
    >
      <span className="p-[3px] text-[25px] leading-[13px] bg-white text-[#862e1b]">
        +
      </span>
      ADD
    </button>
  )
}
