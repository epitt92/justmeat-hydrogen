import {Suspense} from 'react';
import {defer, json, redirect} from '@shopify/remix-oxygen';
import {Await, Link, useLoaderData} from '@remix-run/react';

import {
  Image,
  Money,
  VariantSelector,
  getSelectedProductOptions,
  CartForm,
  getPaginationVariables,
  Pagination
} from '@shopify/hydrogen';
import {getVariantUrl} from '~/lib/variants';
import PlanPicker from '~/components/OrderComponents/PlanPicker';
import CustomCollection from '~/components/OrderComponents/CustomCollection';
import {useVariantUrl} from '~/lib/variants';
import Notification from '~/components/Notification';


/**
 * @type {MetaFunction<typeof loader>}
 */

// export const meta = ({data}) => {
//   return [{title: `Hydrogen | ${data?.product.title ?? ''}`}];
// };




/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({request, params, context}) {
  const handle = 'all-products';
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 15,
  });

  if (!handle) {
    return redirect('/collections');
  }

  const {collection} = await storefront.query(COLLECTION_QUERY, {
    variables: {handle, ...paginationVariables},
  });

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }
  return json({collection});
}



export default function Product() {
  /** @type {LoaderReturnData} */

  const data =  useLoaderData()
  const customCollectionProducts = data.collection.products

  return (
    <>
      <Notification />
      <div className='bg-cover h-[100%] w-[100%] bg-fixed	flex justify-center sm:bg-[url("https://cdn.shopify.com/s/files/1/0672/4776/7778/files/orderpage_bg.png")]'>
      <div className='max-w-[1440px] w-[100%] px-5 sm:px-10'>
      <PlanPicker/>
      <div className='custom-collection-wrap'>
      <CustomCollection col={customCollectionProducts}/>
      </div>
      </div>
      </div>
    </>
   
  );
}

/**
 * @param {{image: ProductVariantFragment['image']}}
 */
function ProductImage({image}) {
  if (!image) {
    return <div className="product-image" />;
  }
  return (
    <div className="product-image">
      <Image
        alt={image.altText || 'Product Image'}
        aspectRatio="1/1"
        data={image}
        key={image.id}
        sizes="(min-width: 45em) 50vw, 100vw"
      />
    </div>
  );
}

/**
 * @param {{
 *   product: ProductFragment;
 *   selectedVariant: ProductFragment['selectedVariant'];
 *   variants: Promise<ProductVariantsQuery>;
 * }}
 */
// function ProductMain({selectedVariant, product, variants}) {
//   const {title, descriptionHtml} = product;
//   return (
//     <div className="product-main">
//       <h1>{title}</h1>
//       <ProductPrice selectedVariant={selectedVariant} />
//       <br />
//       <Suspense
//         fallback={
//           <ProductForm
//             product={product}
//             selectedVariant={selectedVariant}
//             variants={[]}
//           />
//         }
//       >
//         <Await
//           errorElement="There was a problem loading product variants"
//           resolve={variants}
//         >
//           {(data) => (
//             <ProductForm
//               product={product}
//               selectedVariant={selectedVariant}
//               variants={data.product?.variants.nodes || []}
//             />
//           )}
//         </Await>
//       </Suspense>
//       <br />
//       <br />
//       <p>
//         <strong>Description</strong>
//       </p>
//       <br />
//       <div dangerouslySetInnerHTML={{__html: descriptionHtml}} />
//       <br />
//     </div>
//   );
// }

/**
 * @param {{
 *   selectedVariant: ProductFragment['selectedVariant'];
 * }}
 */
// function ProductPrice({selectedVariant}) {
//   return (
//     <div className="product-price">
//       {selectedVariant?.compareAtPrice ? (
//         <>
//           <p>Sale</p>
//           <br />
//           <div className="product-price-on-sale">
//             {selectedVariant ? <Money data={selectedVariant.price} /> : null}
//             <s>
//               <Money data={selectedVariant.compareAtPrice} />
//             </s>
//           </div>
//         </>
//       ) : (
//         selectedVariant?.price && <Money data={selectedVariant?.price} />
//       )}
//     </div>
//   );
// }

/**
 * @param {{
 *   product: ProductFragment;
 *   selectedVariant: ProductFragment['selectedVariant'];
 *   variants: Array<ProductVariantFragment>;
 * }}
 */
// function ProductForm({product, selectedVariant, variants}) {
//   return (
//     <div className="product-form">
//       <VariantSelector
//         handle={product.handle}
//         options={product.options}
//         variants={variants}
//       >
//         {({option}) => <ProductOptions key={option.name} option={option} />}
//       </VariantSelector>
//       <br />
//       <AddToCartButton
//         disabled={!selectedVariant || !selectedVariant.availableForSale}
//         onClick={() => {
//           window.location.href = window.location.href + '#cart-aside';
//         }}
//         lines={
//           selectedVariant
//             ? [
//                 {
//                   merchandiseId: selectedVariant.id,
//                   quantity: 1,
//                 },
//               ]
//             : []
//         }
//       >
//         {selectedVariant?.availableForSale ? 'Add to cart' : 'Sold out'}
//       </AddToCartButton>
//     </div>
//   );
// }

/**
 * @param {{option: VariantOption}}
 */
// function ProductOptions({option}) {
//   return (
//     <div className="product-options" key={option.name}>
//       <h5>{option.name}</h5>
//       <div className="product-options-grid">
//         {option.values.map(({value, isAvailable, isActive, to}) => {
//           return (
//             <Link
//               className="product-options-item"
//               key={option.name + value}
//               prefetch="intent"
//               preventScrollReset
//               replace
//               to={to}
//               style={{
//                 border: isActive ? '1px solid black' : '1px solid transparent',
//                 opacity: isAvailable ? 1 : 0.3,
//               }}
//             >
//               {value}
//             </Link>
//           );
//         })}
//       </div>
//       <br />
//     </div>
//   );
// }

/**
 * @param {{
 *   analytics?: unknown;
 *   children: React.ReactNode;
 *   disabled?: boolean;
 *   lines: CartLineInput[];
 *   onClick?: () => void;
 * }}
 */
// function AddToCartButton({analytics, children, disabled, lines, onClick}) {
//   return (
//     <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
//       {(fetcher) => (
//         <>
//           <input
//             name="analytics"
//             type="hidden"
//             value={JSON.stringify(analytics)}
//           />
//           <button
//             type="submit"
//             onClick={onClick}
//             disabled={disabled ?? fetcher.state !== 'idle'}
//           >
//             {children}
//           </button>
//         </>
//       )}
//     </CartForm>
//   );
// }

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
`;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    options {
      name
      values
    }
    selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    variants(first: 1) {
      nodes {
        ...ProductVariant
      }
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
`;

const PRODUCT_VARIANTS_FRAGMENT = `#graphql
  fragment ProductVariants on Product {
    variants(first: 250) {
      nodes {
        ...ProductVariant
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const VARIANTS_QUERY = `#graphql
  ${PRODUCT_VARIANTS_FRAGMENT}
  query ProductVariants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...ProductVariants
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('@remix-run/react').FetcherWithComponents} FetcherWithComponents */
/** @typedef {import('storefrontapi.generated').ProductFragment} ProductFragment */
/** @typedef {import('storefrontapi.generated').ProductVariantsQuery} ProductVariantsQuery */
/** @typedef {import('storefrontapi.generated').ProductVariantFragment} ProductVariantFragment */
/** @typedef {import('@shopify/hydrogen').VariantOption} VariantOption */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').CartLineInput} CartLineInput */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').SelectedOption} SelectedOption */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */



// custom collection qusery 


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
  }
`;

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
`;
