import { getPaginationVariables } from '@shopify/hydrogen'

import { ALL_PRODUCTS_QUERY } from '~/graphql/Product'

export const bundleCollectionHandle = 'all-products'
export const freeProductHandle = 'raspberry-bbq-chicken-breast'
export const bonusProductHandle = 'free-meat-unlocked-at-125'
export const bundleProductHandle = 'custom-bundle'
export const filterProductHandles = ['shipping-insurance']

export const getBundle = async ({ storefront, request }) => {
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
    (product) => product.handle === freeProductHandle,
  )
  const bonusProduct = allProducts.find(
    (product) => product.handle === bonusProductHandle,
  )

  const products = allProducts
    .filter((product) =>
      product.collections.edges.some(
        (collection) => collection.node.handle === bundleCollectionHandle,
      ),
    )
    .filter(
      (product) => Number(product.priceRange.minVariantPrice.amount) !== 0,
    )
    .filter((product) => !filterProductHandles.includes(product.handle))

  return {
    products,
    allProducts,
    freeProduct,
    bonusProduct,
  }
}
