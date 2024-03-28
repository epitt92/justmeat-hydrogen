import { useContext } from 'react'
import { ProductContext } from '~/contexts'
import ProductQuantity from './ProductQuantity'

export const ProductCard = ({ product, onClick }) => {
  const { selectedProducts, setSelectedProducts } = useContext(ProductContext)

  const image = product.featuredImage.url
  const productHandle = product.handle
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

  const line = selectedProducts.find(
    (selectedProduct) => selectedProduct.id === product.id,
  )

  return (
    <div className="product-grid mb-[40px] ">
      <dialog className="bg-[#edeaea] custom-dialog" id={productHandle}>
        <div className="dialog-content">
          <div className="p-5 close-panel">
            <button>
              <svg
                width={18}
                height={18}
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 1L1 17"
                  stroke="black"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 1L17 17"
                  stroke="black"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </dialog>
      <div className="img-wrapper">
        <img
          onClick={onClick}
          className="object-contain w-full"
          width="100%"
          alt={product.title}
          src={image}
          loading="lazy"
        />
      </div>
      <div className="pt-6 text-center price">
        <span className="p-6 text-2xl font-bold font-roboto_bold">
          $ {product.priceRange.minVariantPrice.amount}
        </span>
      </div>
      <div className="mx-auto my-5 text-center">
        {line ? (
          <ProductQuantity
            line={line}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
          />
        ) : (
          <button
            onClick={addToSelectedProducts}
            className="bg-[#862e1b] mx-auto flex justify-center items-center py-[10px] gap-[5px] px-[20px] leading-none font-bold text-white"
          >
            <span className=" p-[3px] text-[25px] leading-[13px] bg-white text-[#862e1b]  ">
              +
            </span>
            ADD
          </button>
        )}
      </div>
    </div>
  )
}
