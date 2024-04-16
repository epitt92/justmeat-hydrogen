import { getPaginationVariables } from '@shopify/hydrogen'

import { COLLECTION_QUERY } from '~/graphql/Collection'

export const bundleCollectionHandle = 'all-products'
export const freeProductHandle = 'raspberry-bbq-chicken-breast'
export const bonusProductHandle = 'free-meat-unlocked-at-125'
export const bundleProductHandle = 'custom-bundle'
export const filterProductHandles = ['shipping-insurance']

export const getBundle = async ({ storefront, request }) => {
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
    .filter((product) => !filterProductHandles.includes(product.handle))

  return {
    collection,
    products,
    allProducts,
    freeProduct,
    bonusProduct,
    bundleProduct,
  }
}
