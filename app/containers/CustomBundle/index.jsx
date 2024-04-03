import React, { useState, useContext } from 'react'
import { useLoaderData } from '@remix-run/react'

import { useSubmitPromise } from '~/hooks/useSubmitPromise'
import { CustomBundleContext, CustomBundleFormContext } from '~/contexts'

import { Cart } from './Cart'
import { MobileCart } from './Cart/MobileCart'
import { ProductModal } from './ProductModal'
import { ProductCard } from './ProductCard'

export const CustomBundle = ({ subproduct }) => {
  const submit = useSubmitPromise()
  const { products, bonusProduct, freeProduct } = useLoaderData()

  const { sellingPlan, bonusVariant, selectedProducts, totalCost, fromOrder } =
    useContext(CustomBundleContext)

  const [clickedProduct, setClickedProduct] = useState(null)
  const [checkoutSubmitting, setCheckoutSubmitting] = useState(false)

  async function handleCheckout() {
    const products = [...selectedProducts, { ...freeProduct, quantity: 1 }]

    if (totalCost > 125) {
      products.push({
        ...{
          ...bonusProduct,
          variants: { nodes: [bonusVariant || bonusProduct.variants.nodes[0]] },
        },
        quantity: 1,
      })
    }

    setCheckoutSubmitting(true)

    const res = await submit(
      {
        body: JSON.stringify({
          products,
          sellingPlanName: sellingPlan,
        }),
      },
      { method: 'post', action: '/products/custom-bundle' },
    )

    setCheckoutSubmitting(false)
    location.href = res.checkoutUrl
  }

  return (
    <section className="max-w-ful custom-collection-wrap">
      <div className="flex gap-3">
        {fromOrder && (
          <div className="w-[60px] h-[60px] hidden lg:flex rounded-[100%] bg-black justify-center items-center">
            <span className="text-[40px] font-bold text-white">2</span>
          </div>
        )}

        <main className="flex flex-col flex-1 gap-2 bg-white border-gray-400 border-solid main-section sm:border">
          {fromOrder && (
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
          )}
          <div className="flex product-and-cart">
            <div className="grid grid-cols-2 product-grid md:grid-cols-3 gap-x-5 sm:p-3 xl:pr-5 xl:w-8/12">
              {products.map(
                (product, key) =>
                  product.handle !== 'free-meat-unlocked-at-125' && (
                    <ProductCard
                      key={key}
                      product={product}
                      onClick={() => setClickedProduct(product)}
                    />
                  ),
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
                  <CustomBundleFormContext.Provider
                    value={{
                      checkoutSubmitting,
                      setCheckoutSubmitting,
                      handleCheckout,
                    }}
                  >
                    <Cart layout="aside" />
                  </CustomBundleFormContext.Provider>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <CustomBundleFormContext.Provider
        value={{ checkoutSubmitting, setCheckoutSubmitting, handleCheckout }}
      >
        <MobileCart />
      </CustomBundleFormContext.Provider>

      <ProductModal
        product={clickedProduct}
        onClose={() => setClickedProduct(null)}
      />
    </section>
  )
}

function extractNumericId(productId) {
  const parts = productId.split('/')
  const lastPart = parts[parts.length - 1]
  const numericId = lastPart.match(/\d+/)
  return numericId ? numericId[0] : null
}

function checkExistProduct(active_subscription_pro, productId) {
  const numProId = extractNumericId(productId)
  let Tamptrue = false
  active_subscription_pro.map((aProduct, key) => {
    if (aProduct.external_product_id == numProId) {
      Tamptrue = true
    }
  })
  return Tamptrue
}
