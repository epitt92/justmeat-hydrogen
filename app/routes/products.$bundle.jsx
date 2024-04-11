import { getDynamicBundleItems } from '@rechargeapps/storefront-client'
import { getPaginationVariables } from '@shopify/hydrogen'
import { json } from '@shopify/remix-oxygen'

import Notification from '~/components/Notification'
import { CustomBundle } from '~/containers/CustomBundle'
import { COLLECTION_QUERY } from '~/graphql/Collection'
import { ALL_PRODUCTS_QUERY, PRODUCT_BY_HANDLER_QUERY } from '~/graphql/Product'
import { getPureId } from '~/lib/utils'

const bundleCollectionHandler = 'all-products'
const freeProductHandler = 'raspberry-bbq-chicken-breast'
const bonusProductHandler = 'free-meat-unlocked-at-125'
const bundleProductHandler = 'custom-bundle'

export async function loader({ request, context }) {
  const { storefront } = context

  const discountCode = context.session.get('discountCode')
  const discountCodes = discountCode ? [discountCode] : []

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
        (collection) => collection.node.handle === bundleCollectionHandler,
      ),
    )
    .filter(
      (product) => Number(product.priceRange.minVariantPrice.amount) !== 0,
    )

  return json({
    products,
    freeProduct,
    bonusProduct,
    discountCodes,
  })
}

export async function action({ request, context }) {
  let _cart = context.cart
  const storefront = context.storefront
  const discountCode = context.session.get('discountCode')
  const variables = getPaginationVariables(request, { pageBy: 1 })

  const { collection: bundleCollection } = await storefront.query(
    COLLECTION_QUERY,
    {
      variables: {
        ...variables,
        handle: bundleCollectionHandler,
        country: storefront.i18n.country,
        language: storefront.i18n.language,
      },
    },
  )

  const { product: bundleProduct } = await storefront.query(
    PRODUCT_BY_HANDLER_QUERY,
    {
      variables: {
        ...variables,
        handle: bundleProductHandler,
        country: storefront.i18n.country,
        language: storefront.i18n.language,
      },
    },
  )

  const form = await request.formData()
  const data = JSON.parse(form.get('body'))
  const products = data.products
  const sellingPlanName = data.sellingPlanName

  const bundleCollectionId = getPureId(bundleCollection.id, 'Collection')
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
      merchandiseId: `gid://shopify/ProductVariant/${bundleItem.id}`,
      sellingPlanId: `gid://shopify/SellingPlan/${bundleItem.selling_plan}`,
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
      <div className="bg-cover h-[100%] w-[100%] bg-fixed	flex justify-center sm:bg-house bg-[url(https://cdn.shopify.com/s/files/1/0555/1751/1961/files/Mask_Group_125_2_1.png?v=1693548433)]">
        <div className="px-[13px] sm:container">
          <CustomBundle />
        </div>
      </div>
    </>
  )
}
