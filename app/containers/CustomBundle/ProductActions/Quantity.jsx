import { useContext } from 'react'
import { CustomBundleContext } from '~/contexts'

export const Quantity = ({ line, isViewingCart = false }) => {
  const { selectedProducts, setSelectedProducts } =
    useContext(CustomBundleContext)
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
      <div className={`flex gap-[5px] items-center justify-between ${isViewingCart? "bg-[#425b34] sm:bg-[#862e1b] pl-[5px] pr-[5px] sm:p-[5px]" : "bg-[#862e1b] p-[5px]" }`}>
        <button
          onClick={() => updateQuantity(quantity - 1)}
          aria-label="Decrease quantity"
          name="decrease-quantity"
          className={`w-[25px] flex justify-center items-center h-[25px] rounded-[5px] p-[3px] ${isViewingCart? "bg-[#425b34] text-[#fff] sm:text-[#862e1b] sm:bg-white" : "bg-white text-[#862e1b]" }`}
        >
          <span>&#8722; </span>
        </button>
        <small className={`flex-1 text-[#000] font-bold text-[14px] text-center  flex justify-center items-center w-[32px] p-[3px] ${isViewingCart? "bg-[#F3F4F6] h-[35px] sm:h-[25px] sm:bg-white" : "bg-white h-[25px]"}`}>
          {quantity}
        </small>
        <button
          onClick={() => updateQuantity(quantity + 1)}
          className={`flex justify-center items-center rounded-[5px] p-[3px] w-[25px] h-[25px] ${isViewingCart? "text-[#fff] bg-[#425b34] sm:text-[#862e1b] sm:bg-white" : "bg-white text-[#862e1b]" }`}
          aria-label="Increase quantity"
          name="increase-quantity"
        >
          <span>&#43;</span>
        </button>
      </div>
    </div>
  )
}
