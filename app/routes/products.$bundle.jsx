import { getDynamicBundleItems } from '@rechargeapps/storefront-client'
import { json } from '@shopify/remix-oxygen'

import Notification from '~/components/Notification'
import { CustomBundle } from '~/containers/CustomBundle'
import { getBundle } from '~/lib/storefront'
import { getFullId, getPureId } from '~/lib/utils'

export async function loader({ request, context }) {
  const { storefront } = context

  const discountCode = context.session.get('discountCode')
  const discountCodes = discountCode ? [discountCode] : []

  const { products, freeProduct, bonusProduct } = await getBundle({
    storefront,
    request,
  })

  return json({
    products,
    freeProduct,
    bonusProduct,
    discountCodes,
  })
}

export async function action({ request, context }) {
  const _cart = context.cart
  const storefront = context.storefront
  const discountCode = context.session.get('discountCode')

  const { collection, bundleProduct } = await getBundle({ storefront, request })

  const form = await request.formData()
  const data = JSON.parse(form.get('body'))
  const products = data.products
  console.log('🚀 ~ action ~ products:', JSON.stringify(products))
  const sellingPlanName = data.sellingPlanName

  const bundleCollectionId = getPureId(collection.id, 'Collection')
  const bundleProductExternalProductId = getPureId(bundleProduct.id, 'Product')
  const bundleProductExternalVariantId = getPureId(
    bundleProduct.variants.nodes[0].id,
    'ProductVariant',
  )

  let cartData

  if (sellingPlanName) {
    const bundle = {
      externalProductId: bundleProductExternalProductId,
      externalVariantId: bundleProductExternalVariantId,

      selections: products.map((product) => {
        const collectionId = bundleCollectionId
        const externalProductId = getPureId(product.id, 'Product')
        const externalVariantId = getPureId(
          product.variants.nodes[0].id,
          'ProductVariant',
        )
        const quantity = product.quantity
        const sellingPlan = Number(
          getPureId(
            product.sellingPlanGroups.edges.find(
              (edge) => edge.node.name === sellingPlanName,
            ).node.sellingPlans.edges[0].node.id,
            'SellingPlan',
          ),
        )

        return {
          collectionId,
          externalProductId,
          externalVariantId,
          quantity,
          sellingPlan,
        }
      }),
    }

    const bundleItems = await getDynamicBundleItems(
      bundle,
      'shopifyProductHandle',
    )

    cartData = bundleItems.map((bundleItem) => ({
      quantity: bundleItem.quantity,
      merchandiseId: getFullId(bundleItem.id, 'ProductVariant'),
      sellingPlanId: getFullId(bundleItem.selling_plan, 'SellingPlan'),
      attributes: Object.keys(bundleItem.properties).map((key) => {
        return { key, value: String(bundleItem.properties[key]) }
      }),
    }))
  } else {
    cartData = products.map((product) => ({
      quantity: product.quantity,
      merchandiseId: product.variants.nodes[0].id,
    }))
  }

  const { cart } = await _cart.addLines(cartData)

  _cart.setCartId(cart.id)

  if (discountCode) {
    await _cart.updateDiscountCodes([discountCode], { cartId: cart.id })
  }

  return json({ cart, msg: 'ok' })
}

export default function Product() {
  return (
    <>
      <Notification />
      <div className="bg-cover h-[100%] w-[100%] bg-fixed	flex justify-center sm:bg-house bg-white sm:bg-[url(https://cdn.shopify.com/s/files/1/0555/1751/1961/files/Mask_Group_125_2_1.png?v=1693548433)]">
        <div className="px-[13px] sm:container">
          <CustomBundle />
        </div>
      </div>
    </>
  )
}
