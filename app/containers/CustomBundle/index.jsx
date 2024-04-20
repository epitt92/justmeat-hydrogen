import React, { useContext, useEffect, useState } from 'react'

import { useLoaderData, useMatches } from '@remix-run/react'

import { PlanPickerBlock } from '~/containers/CustomBundle/PlanPickerBlock'
import { CustomBundleContext, RootContext } from '~/contexts'
import { useSubmitPromise } from '~/hooks/useSubmitPromise'

import { PROMO_CODES } from '../../promo-codes'
import { Cart } from './Cart'
import { MobileCart } from './Cart/MobileCart'
import { ProductCard } from './ProductCard'
import { ProductModal } from './ProductModal'

export const CustomBundle = () => {
  const submit = useSubmitPromise()
  const matches = useMatches()

  const {
    id,
    bundleId,
    purchase_item_id,
    products,
    bonusProduct,
    freeProduct,
    discountCodes,
  } = useLoaderData()

  const {
    cartCost,
    cartProducts,
    cartSellingPlan,
    cartSellingPlanFrequency,
    cartBonusVariant,
    subscriptionCost,
    subscriptionSellingPlan,
    subscriptionProducts,
    subscriptionSellingPlanFrequency,
    subscriptionBonusVariant,
    setCartProducts,
    setCartSellingPlan,
    setCartSellingPlanFrequency,
    setCartBonusVariant,
    setSubscriptionSellingPlan,
    setSubscriptionProducts,
    setSubscriptionSellingPlanFrequency,
    setSubscriptionBonusVariant,
  } = useContext(RootContext)

  const [clickedProduct, setClickedProduct] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const isCartPage = matches.at(-1).pathname === '/products/custom-bundle'

  const selectedProducts = isCartPage ? cartProducts : subscriptionProducts
  const sellingPlan = isCartPage ? cartSellingPlan : subscriptionSellingPlan
  const sellingPlanFrequency = isCartPage
    ? cartSellingPlanFrequency
    : subscriptionSellingPlanFrequency
  const bonusVariant = isCartPage ? cartBonusVariant : subscriptionBonusVariant
  const totalCost = isCartPage ? cartCost : subscriptionCost

  const productsBasedOnSellingPlan = sellingPlan
    ? products
    : products.filter((product) => !product.requiresSellingPlan)

  const setSelectedProducts = isCartPage
    ? setCartProducts
    : setSubscriptionProducts
  const setSellingPlan = isCartPage
    ? setCartSellingPlan
    : setSubscriptionSellingPlan
  const setSellingPlanFrequency = isCartPage
    ? setCartSellingPlanFrequency
    : setSubscriptionSellingPlanFrequency
  const setBonusVariant = isCartPage
    ? setCartBonusVariant
    : setSubscriptionBonusVariant

  // Get influencer discount codes
  const influencerCode = PROMO_CODES.filter((code) =>
    discountCodes.includes(code.code),
  )

  async function handleSubmit() {
    const products = [...selectedProducts, { ...freeProduct, quantity: 1 }]

    if (totalCost > 125) {
      products.push({
        ...{
          ...bonusProduct,
          variants: {
            nodes: [bonusVariant || bonusProduct.variants.nodes[0]],
          },
        },
        quantity: 1,
      })
    }

    setSubmitting(true)

    if (isCartPage) {
      const res = await submit(
        {
          body: JSON.stringify({
            products,
            sellingPlanName: sellingPlan,
          }),
        },
        {
          method: 'post',
          action: '/products/custom-bundle',
        },
      )

      if (res.msg === 'ok') {
        location.href = res.cart.checkoutUrl
      }
    } else {
      const res = await submit(
        {
          body: JSON.stringify({
            api: 'update-bundle',
            bundleId,
            purchase_item_id,
            products,
          }),
        },
        {
          method: 'post',
          action: `/account/subscriptions/${id}`,
        },
      )

      if (res.msg === 'ok') {
        console.debug('ok')
      }
    }

    setSubmitting(false)
  }

  return (
    <CustomBundleContext.Provider
      value={{
        isCartPage,
        selectedProducts,
        sellingPlan,
        sellingPlanFrequency,
        bonusVariant,
        totalCost,
        submitting,
        setSelectedProducts,
        setSellingPlan,
        setSellingPlanFrequency,
        setBonusVariant,
        setSubmitting,
        handleSubmit,
      }}
    >
      {isCartPage && <PlanPickerBlock />}
      <section className="max-w-ful custom-collection-wrap">
        <div className="flex gap-3">
          {isCartPage && (
            <div className="w-[60px] h-[60px] hidden lg:flex rounded-[100%] bg-black justify-center items-center">
              <span className="text-[40px] font-bold text-white">2</span>
            </div>
          )}

          <main className="flex flex-col flex-1 gap-2 bg-white border-gray-400 border-solid main-section sm:border">
            {isCartPage && (
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

            <div className="flex product-and-cart mb-[62px] md:mb-0">
              <div className="grid grid-cols-2 product-grid md:grid-cols-3 gap-x-5 sm:p-3 xl:pr-5 xl:w-8/12 xl:mb-[0px] mb-[50px]">
                {productsBasedOnSellingPlan.map((product, key) => (
                  <ProductCard
                    key={key}
                    product={product}
                    onClick={() => setClickedProduct(product)}
                  />
                ))}
              </div>
              <div className="cart-wrapper sticky top-[10px] h-fit mb-[10px] hidden xl:block w-4/12">
                <div className="h-full border">
                  <div className="py-5 text-center text-white bg-black top-section">
                    <div className="py-2 text-wrapper">
                      {isCartPage ? (
                        <>
                          <h1 className="font-roboto_medium text-[17px] leading-none">
                            Subscribers Save{' '}
                            {influencerCode.length > 0
                              ? influencerCode[0].percentage
                              : 25}
                            % on Orders
                          </h1>
                          <p className="text-[14px] leading-none font-roboto_medium mt-3">
                            Applied at checkout
                          </p>
                        </>
                      ) : (
                        <h1 className="font-roboto_medium text-[17px] leading-none">
                          YOUR SUBSCRIPTION
                        </h1>
                      )}
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
    </CustomBundleContext.Provider>
  )
}
