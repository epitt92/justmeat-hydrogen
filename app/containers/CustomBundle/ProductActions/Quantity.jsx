import { useContext } from 'react'
import { RootContext } from '~/contexts'

export const Quantity = ({ line }) => {
  const { selectedProducts, setSelectedProducts } = useContext(RootContext)
  const { id, quantity, priceRange } = line

  const price = priceRange?.maxVariantPrice?.amount

  const updateQuantity = (value) => {
    if (value === 0) {
      const newSelectedProducts = selectedProducts.filter(
        (product) => product.id !== id,
      )
      setSelectedProducts(newSelectedProducts)
    } else {
      const updatedProducts = selectedProducts.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            quantity: value,
            totalAmount: (value * price).toFixed(2),
          }
        }
        return product
      })
      setSelectedProducts(updatedProducts)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full cart-line-quantity">
      <div className="flex gap-[5px] items-center bg-[#425b34] sm:bg-[#862e1b] justify-between p-[5px]">
        <button
          onClick={() => updateQuantity(quantity - 1)}
          aria-label="Decrease quantity"
          name="decrease-quantity"
          className="text-[#425b34] sm:text-[#862e1b] w-[25px] flex justify-center items-center h-[25px] bg-white rounded-[5px] p-[3px] "
        >
          <span>&#8722; </span>
        </button>
        <small className="flex-1 text-[#000] font-bold text-[14px] text-center bg-white flex justify-center items-center w-[32px] h-[25px] p-[3px] ">
          {quantity}
        </small>
        <button
          onClick={() => updateQuantity(quantity + 1)}
          className="text-[#425b34] sm:text-[#862e1b] bg-white flex justify-center items-center rounded-[5px] p-[3px] w-[25px] h-[25px]"
          aria-label="Increase quantity"
          name="increase-quantity"
        >
          <span>&#43;</span>
        </button>
      </div>
    </div>
  )
}
