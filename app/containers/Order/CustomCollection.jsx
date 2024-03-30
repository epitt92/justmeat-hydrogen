import React, { useState } from 'react'
import { useLoaderData } from '@remix-run/react'

import { Cart } from './Cart'
import { MobileCart } from './Cart/MobileCart'
import ProductModal from './ProductModal'
import { ProductCard } from './ProductCard'

const CustomCollection = () => {
  const {
    collection: {
      products: { nodes: products },
    },
  } = useLoaderData()

  const [clickedProduct, setClickedProduct] = useState(null)

  return (
    <section className="max-w-ful custom-collection-wrap">
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
              {products.map((product, key) =>
                product.handle !== 'free-meat-unlocked-at-125' ? (
                  <ProductCard
                    key={key}
                    product={product}
                    onClick={() => setClickedProduct(product)}
                  />
                ) : null,
              )}
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
                <div className="cart">
                  <Cart layout="aside" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <MobileCart />

      <ProductModal
        product={clickedProduct}
        onClose={() => setClickedProduct(null)}
      />
    </section>
  )
}

export default CustomCollection
