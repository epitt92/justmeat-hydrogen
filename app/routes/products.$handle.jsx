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
  const storefront = context.storefront
  const _cart = context.cart

  // TODO: We have to fetch selling plan here
  // const { sellingPlanGroups } = await storefront.query(COLLECTION_QUERY)
  // console.log('🚀 ~ action ~ sellingPlanGroups:', sellingPlanGroups)

  const form = await request.formData()
  const data = JSON.parse(form.get('body'))
  const products = data.products

  // const bundle = {
  //   externalProductId: '7134322196677', // Bundle's Shopify Product ID
  //   externalVariantId: '41291293425861', // Bundle's Shopify Variant ID
  //   selections: [
  //     {
  //       collectionId: '288157827269', // Shopify Collection 1
  //       externalProductId: '7200061391045', // Shopify Product ID 1
  //       externalVariantId: '41510929465541', // Shopify Variant ID 1
  //       quantity: 2,
  //       sellingPlan: 2761818364, // Product Selling Plan ID
  //     },
  //     {
  //       collectionId: '285790863557', // Shopify Collection 2
  //       externalProductId: '7200062308549', // Shopify Product ID 2
  //       externalVariantId: '41504991412421', // Shopify Variant ID 2
  //       quantity: 1,
  //       sellingPlan: 2761818364, // Product Selling Plan ID
  //     },
  //   ],
  // }

  // const bundleItems = getDynamicBundleItems(bundle, 'shopifyProductHandle')

  const cartData = products.map((product) => ({
    merchandiseId: product.variants.nodes[0].id,
    quantity: product.quantity,
  }))

  const { cart } = await _cart.addLines(cartData)

  // return json(cart)
}

export default function Product() {
  /** @type {LoaderReturnData} */

  const data = useLoaderData()
  const customCollectionProducts = data.collection.products

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

// TODO: This query needs to be fixed
const SELLING_PLAN_GROUPS_QUERY = `#graphql
  query {
    sellingPlanGroups {
      id
    }
  }
`
