import { json } from '@shopify/remix-oxygen'
import { getDynamicBundleItems } from '@rechargeapps/storefront-client'
import { getPaginationVariables } from '@shopify/hydrogen'

import { CustomBundle } from '~/containers/CustomBundle'
import { PlanPickerBlock } from '~/containers/CustomBundle/PlanPickerBlock'
import Notification from '~/components/Notification'
import { ALL_PRODUCTS_QUERY } from '~/graphql/Product'

export async function loader({ request, context }) {
  const { storefront } = context

  const allProductsHandler = 'all-products'
  const freeProductHandler = 'raspberry-bbq-chicken-breast'
  const bonusProductHandler = 'free-meat-unlocked-at-125'

  const variables = getPaginationVariables(request, { pageBy: 50 })

  const {
    products: { nodes: allProducts },
  } = await storefront.query(ALL_PRODUCTS_QUERY, {
    variables: {
      ...variables,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  })

  const freeProduct = allProducts.find(
    (product) => product.handle === freeProductHandler,
  )
  const bonusProduct = allProducts.find(
    (product) => product.handle === bonusProductHandler,
  )

  const products = allProducts
    .filter((product) =>
      product.collections.edges.some(
        (collection) => collection.node.handle === allProductsHandler,
      ),
    )
    .filter(
      (product) => Number(product.priceRange.minVariantPrice.amount) !== 0,
    )

  return json({
    products,
    freeProduct,
    bonusProduct,
  })
}

export async function action({ request, context }) {
  const _cart = context.cart
  const discountCode = context.session.get('discountCode')

  const form = await request.formData()
  const data = JSON.parse(form.get('body'))
  const products = data.products
  const sellingPlanName = data.sellingPlanName

  let cartData

  if (sellingPlanName) {
    const bundle = {
      externalProductId: '8374391898338', // Custom Meat Bundle's Shopify Product ID - Hard coded
      externalVariantId: '45086855332066', // Custom Meat Bundle's Shopify Variant ID - Hard coded

      selections: products.map((product) => ({
        collectionId: '424769257698',
        externalProductId: product.id.split('gid://shopify/Product/')[1],
        externalVariantId: product.variants.nodes[0].id.split(
          'gid://shopify/ProductVariant/',
        )[1],
        quantity: product.quantity,
        sellingPlan: Number(
          product.sellingPlanGroups.edges
            .find((edge) => edge.node.name === sellingPlanName)
            .node.sellingPlans.edges[0].node.id.split(
              'gid://shopify/SellingPlan/',
            )[1],
        ),
      })),
    }

    const bundleItems = await getDynamicBundleItems(
      bundle,
      'shopifyProductHandle',
    )

    cartData = [
      ...bundleItems.map((bundleItem) => ({
        quantity: bundleItem.quantity,
        merchandiseId: `gid://shopify/ProductVariant/${bundleItem.id}`,
        sellingPlanId: `gid://shopify/SellingPlan/${bundleItem.selling_plan}`,
        attributes: Object.keys(bundleItem.properties).map((key) => {
          return { key, value: String(bundleItem.properties[key]) }
        }),
      })),
    ]
  } else {
    cartData = products.map((product) => ({
      quantity: product.quantity,
      merchandiseId: product.variants.nodes[0].id,
    }))
  }

  const { cart } = await _cart.addLines(cartData)
  _cart.setCartId(cart.id)
  await _cart.updateDiscountCodes([discountCode], { cartId: cart.id })

  return json({ cart, msg: 'ok' })
}

export default function Product() {
  return (
    <>
      <Notification />
      <div className='bg-cover h-[100%] w-[100%] bg-fixed	flex justify-center sm:bg-[url("https://cdn.shopify.com/s/files/1/0672/4776/7778/files/orderpage_bg.png")]'>
        <div className="container">
          <PlanPickerBlock />
          <CustomBundle />
        </div>
      </div>
    </>
  )
}
