import { Suspense } from 'react'
import { defer, redirect } from '@shopify/remix-oxygen'
import { Await, Link, useLoaderData } from '@remix-run/react'

import {
  Image,
  Money,
  VariantSelector,
  getSelectedProductOptions,
  CartForm,
} from '@shopify/hydrogen'
import { getVariantUrl } from '~/lib/variants'
import PlanPicker from '~/components/custom-components/PlanPicker'
import CustomCollection from '~/components/custom-components/CustomCollection'

// new
import { json } from '@shopify/remix-oxygen'
import { Pagination, getPaginationVariables } from '@shopify/hydrogen'
import { useVariantUrl } from '~/lib/variants'

/**
 * @type {MetaFunction<typeof loader>}
 */
// export const meta = ({data}) => {
//   return [{title: `Hydrogen | ${data?.product.title ?? ''}`}];
// };

// loader

export async function loader({ request, params, context }) {
  const handle = 'all-products'
  const { storefront } = context
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 100,
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

export default function Product() {
  const data = useLoaderData()
  // console.log(data)

  return (
    <>
      <PlanPicker />
      <div className="custom-collection-wrap">
        <CustomCollection />
      </div>
    </>
  )
}

/**
 * @param {{products: ProductItemFragment[]}}
 */
function ProductsGrid({ products }) {
  return (
    <div className="products-grid">
      {products.map((product, index) => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            loading={index < 8 ? 'eager' : undefined}
          />
        )
      })}
    </div>
  )
}

/**
 * @param {{
 *   product: ProductItemFragment;
 *   loading?: 'eager' | 'lazy';
 * }}
 */
function ProductItem({ product, loading }) {
  const variant = product.variants.nodes[0]
  const variantUrl = useVariantUrl(product.handle, variant.selectedOptions)
  return (
    <Link
      className="product-item"
      key={product.id}
      prefetch="intent"
      to={variantUrl}
    >
      {product.featuredImage && (
        <Image
          alt={product.featuredImage.altText || product.title}
          aspectRatio="1/1"
          data={product.featuredImage}
          loading={loading}
          sizes="(min-width: 45em) 400px, 100vw"
        />
      )}
      <h4>{product.title}</h4>
      <small>
        <Money data={product.priceRange.minVariantPrice} />
      </small>
    </Link>
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
        selectedOptions {
          name
          value          
        }
      }
    }
  }
`
