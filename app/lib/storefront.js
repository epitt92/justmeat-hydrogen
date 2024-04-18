import { getPaginationVariables } from '@shopify/hydrogen'

import { COLLECTION_QUERY } from '~/graphql/Collection'

export const getBundle = async ({ request, context }) => {
  const { storefront } = context

  const bundleCollectionHandle = context.env.PUBLIC_BUNDLE_COLLECTION_HANDLE
  const freeProductHandle = context.env.PUBLIC_FREE_PRODUCT_HANDLE
  const bonusProductHandle = context.env.PUBLIC_BONUS_PRODUCT_HANDLE
  const bundleProductHandle = context.env.PUBLIC_BUNDLE_PRODUCT_HANDLE
  const shippingInsuranceProductHandle =
    context.env.PUBLIC_SHIPPING_INSURANCE_PRODUCT_HANDLE

  const variables = getPaginationVariables(request, { pageBy: 50 })

  const {
    collection: {
      products: { nodes: allProducts },
      ...collection
    },
  } = await storefront.query(COLLECTION_QUERY, {
    variables: {
      ...variables,
      handle: bundleCollectionHandle,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  })

  const freeProduct = allProducts.find(
    (product) => product.handle === freeProductHandle,
  )
  const bonusProduct = allProducts.find(
    (product) => product.handle === bonusProductHandle,
  )
  const bundleProduct = allProducts.find(
    (product) => product.handle === bundleProductHandle,
  )

  const products = allProducts
    .filter(
      (product) => Number(product.priceRange.minVariantPrice.amount) !== 0,
    )
    .filter((product) => product.handle !== shippingInsuranceProductHandle)

  return {
    collection,
    products,
    allProducts,
    freeProduct,
    bonusProduct,
    bundleProduct,
  }
}
