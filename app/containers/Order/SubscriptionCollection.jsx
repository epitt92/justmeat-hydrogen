import React, { useState, useContext } from 'react'
import { useLoaderData } from '@remix-run/react'

import { useSubmitPromise } from '~/hooks/useSubmitPromise'
import { RootContext, CustomCollectionContext } from '~/contexts'

import { Cart } from './Cart'
import { MobileCart } from './Cart/MobileCart'
import { ProductModal } from './ProductModal'
import { ProductCard } from './ProductCard'

const SubscriptionCollection = ({ subproduct }) => {
  const submit = useSubmitPromise()
  const {
    collection: {
      products: { nodes: products },
    },
  } = useLoaderData()

  const { sellingPlan, bonus, selectedProducts, totalCost } =
    useContext(RootContext)

  /* START : account management */
  let active_subscription_pro
  let isCustomerAccountAccess = false
  if (typeof subproduct?.bundle_selections !== 'undefined') {
    active_subscription_pro = subproduct.bundle_selections[0].items
    isCustomerAccountAccess = true
  }

  /* END : account management */
  const [clickedProduct, setClickedProduct] = useState(null)
  const [checkoutSubmitting, setCheckoutSubmitting] = useState(false)

  async function handleCheckout() {
    const products = [...selectedProducts]

    if (totalCost > 125) {
      products.push({
        ...bonus,
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
    <CustomCollectionContext.Provider
      value={{ checkoutSubmitting, setCheckoutSubmitting, handleCheckout }}
    >
      <section className="max-w-[1200px] custom-collection-wrap">
        <div className="flex gap-3 ">
          <main className="flex flex-col flex-1 gap-2 bg-white border-gray-400 border-solid main-section sm:border">
            <div className="flex product-and-cart">
              <div className="grid grid-cols-2 product-grid md:grid-cols-3 gap-x-5 sm:p-3 xl:pr-5 xl:w-8/12">
                {products.map((product, key) =>
                  product.handle !== 'free-meat-unlocked-at-125' ? (
                    isCustomerAccountAccess &&
                    checkExistProduct(active_subscription_pro, product.id) ? (
                      <ProductCard
                        key={key}
                        product={product}
                        onClick={() => setClickedProduct(product)}
                      />
                    ) : (
                      <ProductCard
                        key={key}
                        product={product}
                        onClick={() => setClickedProduct(product)}
                      />
                    )
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
    </CustomCollectionContext.Provider>
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

export default SubscriptionCollection
