import { json, redirect } from '@shopify/remix-oxygen'
import { useLoaderData } from '@remix-run/react'
import { getDynamicBundleItems } from '@rechargeapps/storefront-client'
import { getPaginationVariables } from '@shopify/hydrogen'

import PlanPicker from '~/components/OrderComponents/PlanPicker'
import CustomCollection from '~/components/OrderComponents/CustomCollection'
import Notification from '~/components/Notification'

export async function loader({ request, params, context }) {
  const handle = 'all-products'
  const { storefront } = context
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 15,
  })

  if (!handle) {
    return redirect('/collections')
  }

  const { collection } = await storefront.query(COLLECTION_QUERY, {
    variables: { handle, ...paginationVariables },
  })

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    })
  }
  return json({ collection })
}

export async function action({ request, context }) {
  const _cart = context.cart

  const form = await request.formData()
  const data = JSON.parse(form.get('body'))
  const products = data.products
  const sellingPlanName = data.sellingPlanName

  let cartData

  if (sellingPlanName) {
    const bundle = {
      externalProductId: '8249959153890', // Custom Meat Bundle's Shopify Product ID - Hard coded
      externalVariantId: '44625977999586', // Custom Meat Bundle's Shopify Variant ID - Hard coded

      selections: products.map((product) => ({
        collectionId: product.collections.edges[0].node.id.split(
          'gid://shopify/Collection/',
        )[1],
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

    try {
      cartData = getDynamicBundleItems(bundle, 'shopifyProductHandle')
    } catch (err) {
      console.error('🚀 ~ action ~ err:', err)
      return json(err)
    }
  } else {
    cartData = products.map((product) => ({
      quantity: product.quantity,
      merchandiseId: product.variants.nodes[0].id,
    }))
  }

  const { cart } = await _cart.addLines(cartData)

  return json(cart)
}

export default function Product() {
  /** @type {LoaderReturnData} */

  const data = useLoaderData()
  const customCollectionProducts = data.collection.products
  console.log(
    '🚀 ~ Product ~ customCollectionProducts:',
    customCollectionProducts,
  )

  return (
    <>
      <Notification />
      <div className='bg-cover h-[100%] w-[100%] bg-fixed	flex justify-center sm:bg-[url("https://cdn.shopify.com/s/files/1/0672/4776/7778/files/orderpage_bg.png")]'>
        <div className="max-w-[1440px] w-[100%] px-5 sm:px-10">
          <PlanPicker />
          <div className="custom-collection-wrap">
            <CustomCollection col={customCollectionProducts} />
          </div>
        </div>
      </div>
    </>
  )
}

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    description
    images(first: 100) {
      nodes {
        altText
        height
        url
        width
      }
    }
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    variants(first: 1) {
      nodes {
        id
        selectedOptions {
          name
          value
        }
      }
    }
    collections(first: 3) {
      edges {
        node {
          id
          title
        }
      }
    }
    sellingPlanGroups(first:2) {
      edges {
        node {
          name
          options {
            name
            values
          }
          sellingPlans(first: 1) {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      }
    }

    nutration: metafield(namespace: "custom", key: "nutration") {
      value
      type
    }
    cardDescription: metafield(namespace: "custom", key: "card_description") {
      value
      type
    }
    protein: metafield(namespace: "custom", key: "protein") {
      value
      type
    }
    carbs: metafield(namespace: "custom", key: "carbs") {
      value
      type
    }
    fat: metafield(namespace: "custom", key: "fat") {
      value
      type
    }
    servings: metafield(namespace: "custom", key: "servings") {
      value
      type
    }
    ingredients: metafield(namespace: "custom", key: "ingredients") {
      value
      type
    }
    product_information: metafield(namespace: "custom", key: "product_information") {
      value
      type
    }
    allergens: metafield(namespace: "custom", key: "allergens") {
      value
      type
    }
    cart_drawer_img: metafield(namespace: "custom", key: "cart_drawer_img") {
      value
      type
    }
  }
`

const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
`
