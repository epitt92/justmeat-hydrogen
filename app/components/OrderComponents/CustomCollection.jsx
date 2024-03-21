import { CartForm, VariantSelector } from '@shopify/hydrogen'
import React, { Suspense, useState } from 'react'
import { Await, Link, useLoaderData } from '@remix-run/react'
import { CartMain } from '~/components/AsideCart'
import { useRootLoaderData } from '~/root'
import ProductModal from '../ui/ProductModal'
import ProductQuantity from './ProductQuantity'

const AsideCart = ({ selectedProducts, setSelectedProducts }) => {
  const rootData = useRootLoaderData()
  const cartPromise = rootData.cart
  return (
    <div className="cart">
      {/* <h1>Cart</h1> */}
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await
          resolve={cartPromise}
          errorElement={<div>An error occurred</div>}
        >
          {(cart) => {
            return (
              <CartMain
                layout="aside"
                cart={cart}
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
              />
            )
          }}
        </Await>
      </Suspense>
    </div>
  )
}

function ProductCard({
  product,
  setSelectedProducts,
  selectedProducts,
  onClick,
}) {
  const image = product.featuredImage.url
  const productHandle = product.handle
  const productPrice = product?.priceRange?.maxVariantPrice?.amount

  function addToSelectedProducts() {
    setSelectedProducts((prevSelectedProducts) => {
      return [
        ...prevSelectedProducts,
        {
          ...product,
          quantity: 1,
          amount: productPrice,
          totalAmount: productPrice,
        },
      ]
    })
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

/**
 * @param {{
 *   product: ProductFragment;
 *   selectedVariant: ProductFragment['selectedVariant'];
 *   variants: Array<ProductVariantFragment>;
 * }}
 */
function ProductForm({
  product,
  selectedVariant,
  variants,
  setSelectedProductId,
}) {
  return (
    <div className="product-form">
      <VariantSelector
        handle={product.handle}
        options={product.options}
        variants={variants}
      >
        {({ option }) => <ProductOptions key={option.name} option={option} />}
      </VariantSelector>
      {/* <br /> */}
      <AddToCartButton
        // disabled={!selectedVariant || !selectedVariant.availableForSale}
        // onClick={() => {
        //   window.location.href = window.location.href + '#cart-aside';
        // }}
        lines={
          selectedVariant
            ? [
                {
                  merchandiseId: selectedVariant.id,
                  quantity: 1,
                },
              ]
            : []
        }
      >
        <div className="bg-[#862e1b] flex justify-center items-center py-[10px] gap-[5px] px-[20px] leading-none font-bold text-white">
          <span className=" p-[3px] text-[25px] leading-[13px] bg-white text-[#862e1b]  ">
            +
          </span>
          {selectedVariant?.availableForSale ? 'Add to cart' : 'ADD'}
        </div>
      </AddToCartButton>
    </div>
  )
}

/**
 * @param {{option: VariantOption}}
 */
function ProductOptions({ option }) {
  return (
    <div className="product-options" key={option.name}>
      <h5>{option.name}</h5>
      <div className="product-options-grid">
        {option.values.map(({ value, isAvailable, isActive, to }) => {
          return (
            <Link
              className="product-options-item"
              key={option.name + value}
              prefetch="intent"
              preventScrollReset
              replace
              to={to}
              style={{
                border: isActive ? '1px solid black' : '1px solid transparent',
                opacity: isAvailable ? 1 : 0.3,
              }}
            >
              {value}
            </Link>
          )
        })}
      </div>
      <br />
    </div>
  )
}

/**
 * @param {{
 *   analytics?: unknown;
 *   children: React.ReactNode;
 *   disabled?: boolean;
 *   lines: CartLineInput[];
 *   onClick?: () => void;
 * }}
 */
function AddToCartButton({ analytics, children, disabled, lines, onClick }) {
  return (
    <CartForm
      route="/products/custom-bundle"
      inputs={{ lines }}
      action={CartForm.ACTIONS.LinesAdd}
    >
      {(fetcher) => (
        <>
          <input
            name="analytics"
            type="hidden"
            value={JSON.stringify(analytics)}
          />
          <button
            type="submit"
            onClick={onClick}
            disabled={disabled ?? fetcher.state !== 'idle'}
          >
            {children}
          </button>
        </>
      )}
    </CartForm>
  )
}

const CustomCollection = ({ col }) => {
  const { nodes } = col
  const [selectedProducts, setSelectedProducts] = useState([])
  const [clickedProduct, setClickedProduct] = useState(null)

  function onProductClick(product) {
    setClickedProduct(product)
  }

  function onProductModalClose() {
    setClickedProduct(null)
  }

  return (
    <section className="max-w-ful ">
      <div className="flex gap-3 ">
        <div className="w-[60px] h-[60px] hidden lg:flex rounded-[100%] bg-black justify-center items-center">
          <span className="text-[40px] font-bold text-white">2</span>
        </div>

        <main className="flex flex-col flex-1 gap-2 bg-white border-gray-400 border-solid main-section sm:border">
          <div className="flex items-center w-full gap-2 py-3 sm:py-0">
            <div className="w-[35px] h-[35px] ml-3 lg:hidden lg:w-[60px] lg:h-[60px] rounded-[100%] sm:border-none border-2 border-[#425C35] sm:bg-black flex justify-center items-center  ">
              <span className=" text-[22px] lg:text-[40px] font-bold text-black sm:text-white ">
                2
              </span>
            </div>
            <div className="h-fit sm:border-b-4 w-fit sm:border-[#425B34] sm:m-3 ">
              <h2 className="font-semibold leading-7 text-[20px] sm:text-[22px] text-[#1d1d1d] sm:uppercase  ">
                Select Your Meats
              </h2>
            </div>
          </div>
          <div className="flex product-and-cart">
            <div className="grid grid-cols-2 product-grid md:grid-cols-3 gap-x-5 sm:p-3 xl:pr-5 xl:w-8/12">
              {nodes.map((product, key) => (
                product.handle !== "free-meat-unlocked-at-125" ? (
                  <ProductCard
                  key={key}
                  product={product}
                  onClick={() => onProductClick(product)}
                  setSelectedProducts={setSelectedProducts}
                  selectedProducts={selectedProducts}
                />
                ) : null
              ))}
            </div>
            <div className="cart-wrapper sticky top-[10px] h-fit mb-[10px] hidden xl:block w-4/12">
              <div className="h-full border">
                <div className="py-5 text-center text-white bg-black top-section">
                  <div className="py-5 text-wrapper">
                    <h1 className="font-roboto_medium text-[17px] leading-none">
                      Subscribers Save 25% on Orders
                    </h1>
                    <p className="text-[14px] leading-none font-roboto_medium mt-3">
                      Applied at checkout
                    </p>
                  </div>
                </div>
                <AsideCart
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
      <ProductModal product={clickedProduct} onClose={onProductModalClose} />
    </section>
  )
}

export default CustomCollection
