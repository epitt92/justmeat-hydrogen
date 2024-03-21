import { CartForm, VariantSelector } from '@shopify/hydrogen'
import React, { Suspense, useState } from 'react'
import { Await, Link, useLoaderData } from '@remix-run/react'
import { CartMain } from '~/components/AsideCart'
import { useRootLoaderData } from '~/root'
import ProductModal from '../ui/ProductModal'
import ProductQuantity from './ProductQuantity'

const AsideCart = ({ selectedProducts, setSelectedProducts ,setShowCart }) => {
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
                setShowCart={setShowCart}
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
  const [showCart,setShowCart] = useState(false);
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
          <div className="product-and-cart flex">
            <div className="product-grid grid grid-cols-2 md:grid-cols-3 gap-x-5 sm:p-3 xl:pr-5 xl:w-8/12">
              {nodes.map((product, key) => (
                <ProductCard
                  key={key}
                  product={product}
                  setSelectedProducts={setSelectedProducts}
                  selectedProducts={selectedProducts}
                />
              ))}
            </div>
            <div className={`mobile-cart-toggle fixed left-0 bottom-0  h-fit  xl:hidden block w-full   transition-all duration-300  ${showCart ? '' : ''}`}>
              <div className='flex justify-start items-center rounded-[20px] px-10'>
              <div className=''>
                 <img onClick={setShowCart(false)} src="https://cdn.shopify.com/s/files/1/0672/4776/7778/files/imgpsh_fullsize_anim_1_1.png?v=1711048163" alt="" />
              </div>
              <span onClick={()=>setShowCart(true)} className='text-[20px] font-semibold flex-1 bg-[#aaa] h-auto py-[15px] rounded-[15px] text-center text-white'>
                 Add $85.78
              </span>
              </div>
            </div>
            <div className={`cart-wrapper fixed left-0 bottom-0 xl:sticky xl:top-[10px] h-fit xl:mb-[10px] md:block hidden w-full bg-white xl:bg-transparent xl:w-4/12 transition-all duration-300 xl:translate-y-0 ${showCart ? 'translate-y-0' : 'translate-y-[-1000px]'}`}>
              <div className="h-full xl:border shadow-[0 -5px 20px #333] rounded-[10x]">
                 <div className='bg-white p-2 flex justify-start  xl:hidden block'>
                 <div className='w-[30px]'>
                 <svg class="cartsvgarrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M32 15H3.41l8.29-8.29-1.41-1.42-10 10a1 1 0 0 0 0 1.41l10 10 1.41-1.41L3.41 17H32z" data-name="4-Arrow Left"></path></svg>
                 </div>
                 <p className='text-center flex-1 text-[20px] font-semibold text-[#1d1d1d]'>YOUR SHOPPING CART</p>
                 </div>
                <div className="py-5 text-center text-white bg-black top-section">
                  <div className="xl:py-5 text-wrapper">
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
                  setShowCart={setShowCart}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
      <ProductModal
        product={clickedProduct}
        onClose={onProductModalClose}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
      />
    </section>
  )
}

export default CustomCollection
