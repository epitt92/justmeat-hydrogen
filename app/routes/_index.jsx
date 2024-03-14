import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link, NavLink} from '@remix-run/react';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import OrderButton from 'app/components/OrderButton';
import ProductSlider from '~/components/ProductSlider';
import FaqAccordion from '~/components/FaqAccordion';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'Hydrogen | Home'}];
};

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({context}) {
  const {storefront} = context;
  const {collections} = await storefront.query(FEATURED_COLLECTION_QUERY);
  const featuredCollection = collections.nodes[0];
  const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);

  return defer({featuredCollection, recommendedProducts});
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  return (
    <div className="home relative">
      <section className="heroSection relative flex justify-center items-center overflow-hidden">
        <div className="bg-video absolute top-0 left-0 w-[100%] h-[100%]">
          <video className="h-full w-full object-cover" autoPlay muted playsInline loop>
            <source
              src="https://cdn.shopify.com/videos/c/o/v/32c027bc585340199844575c5e85cf42.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex flex-col z-10 justify-center items-center p-5 gap-6 w-max-[1440px] ">
          <div className="flex flex-col justify-center items-center gap-4 py-44 mt-[-30px] w-8/12">
            <p className="text-5xl leading-[55px] font-bold text-white">
              No Fuss, All Flavor <br></br>
              Ready & Delivered
            </p>
            <p className="text-white text-2xl text-center ">
              Leave the protein to the professionals: choose from our lineup of
              12 premium meats with new flavors releasing regularly.
            </p>
            <div className="mt-6">
              <OrderButton />
            </div>
          </div>
        </div>
      </section>

      <section>
      <NavLink end prefetch="intent" to="/products/custom-bundle">
        
        <img src="/subcription_banner.webp" width="100%" alt="" />
                </NavLink>
      </section>

      <section className=" bg-white flex justify-center items-center bg-no-repeat min-h-96 bg-contain bg-[url('https://cdn.shopify.com/s/files/1/0555/1751/1961/files/Group_4179_2x_c20de474-5eef-421d-a248-f3a6c09ae36a.png')] my-5">
        <div className="flex flex-col justify-center items-center p-5 gap-6 w-max-[1440px] ">
          <div className="flex flex-col justify-center items-center gap-6  w-8/12">
            <p className="text-5xl leading-[55px] font-bold text-black ">
              Elevate Your Plate
            </p>
            <div className="">
              <OrderButton />
            </div>
            <p className="text-black text-1xl text-center ">
              No Artificial Colors / No Artificial Flavors / Grass-Fed &
              Grass-Finished Beef Premium Quality / Money-back Guarantee
            </p>
          </div>
        </div>
      </section>

      <section className="  flex justify-center items-center bg-cover bg-[url('https://cdn.shopify.com/s/files/1/0555/1751/1961/files/PNSER.png')] ">
        <div className="w-[100%] py-20 px-20 max-w-[1440px] ">
          <ProductSlider />
        </div>
      </section>

      <section className="bg-black flex justify-center items-center  py-6">
        <div className=" flex justify-center px-10 w-max-[1440px] w-[100%]">
          <div className="w-9/12 flex   justify-center gap-48 items-center">
            <div className="flex justify-center items-center flex-col gap-4">
              <h2 className="text-white font-semibold text-2xl">
                MEATS DELIVERED
              </h2>
              <p className="text-white text-2xl">1,006,928</p>
            </div>
            <div className="flex justify-center hidden xl:block items-center flex-col gap-4 ">
              <h2 className="text-white font-semibold text-2xl">
                POUNDS COOKED
              </h2>
              <p className="text-white text-2xl">345,431 Ib</p>
            </div>
            <div className="flex justify-center items-center flex-col gap-4">
              <h2 className="text-white font-semibold text-2xl">
                HAPPY CUSTOMERS
              </h2>
              <p className="text-white text-2xl">84,097</p>
            </div>
          </div>
        </div>
      </section>
      <section className="heroSection border bg-white flex justify-center items-center p-20  ">
        <div className="flex flex-col justify-end items-end p-5 gap-6 max-w-[1440px] bg-cover bg-[url('https://cdn.shopify.com/s/files/1/0555/1751/1961/files/Farm_BG_Just_Meats.png')]">
          <div className="lg:w-[60%] md:w-[90%] xl:w-[38%] md:w-[60%] bg-[#00000040] pl-12 pr-4 py-5 mt-[200px]">
            <h2 className="text-white text-5xl leading-tight font-semibold mb-5 ">
              REAL MEAT <br></br> REAL RANCHES
            </h2>
            <p className="text-white text-lg mb-5">
              We take pride in supplying delicious, healthy, natural grass-fed
              meat to our consumers. We source all of our meat from local
              ranches across the Rocky Mountain Region of the USA where all
              animals are treated and fed in a humane manner.
            </p>
          </div>
        </div>
      </section>
      <section>
        <img
          src="https://cdn.shopify.com/s/files/1/0555/1751/1961/files/Mosaic.jpg"
          width="100%"
          alt=""
        />
      </section>

      <section className="bg-[#eeeeee] flex justify-center items-center ">
        <div className="max-w-[1440px] w-[100%] flex justify-start gap-20 px-5 xl:px-10 py-20 ">
          <div className="flex flex-col items-center gap-10 hidden xl:flex  w-4/12 ml-10">
            <img
              className=""
              src="https://cdn.shopify.com/s/files/1/0555/1751/1961/files/BodyBulding_Recipie_CarneAsasa.png"
              alt=""
            />
            <div>
              <OrderButton />
            </div>
          </div>

          <div className="flex lg:w-9/12 xl:w-5/12  flex-col gap-10">
            <h1 className=" xl:px-4 py-2 lg:px-2 text-5xl leading-tight bg-[#000] text-white">
              Skip the Protein Bar, <br></br>Have a Real Meal
            </h1>
            <ul className="px-4">
              <li className="flex justify-start gap-2 items-center text-lg mb-3 text-black">
                <span className="w-[18px] h-[18px] rounded-[100%] bg-black"></span>
                Fuel for the entire day
              </li>
              <li className="flex justify-start gap-2 items-center text-lg mb-3 text-black">
                <span className="w-[18px] h-[18px] rounded-[100%] bg-black"></span>
                30g of protein per serving
              </li>
              <li className="flex justify-start gap-2 items-center text-lg mb-3 text-black">
                <span className="w-[18px] h-[18px] rounded-[100%] bg-black"></span>
                Sustains a health lifestyle
              </li>
              <li className="flex justify-start gap-2 items-center text-lg mb-3 text-black">
                <span className="w-[18px] h-[18px] rounded-[100%] bg-black"></span>
                Saves time and money
              </li>
              <li className="flex justify-start gap-2 items-center text-lg mb-3 text-black">
                <span className="w-[18px] h-[18px] rounded-[100%] bg-black"></span>
                Promotes muscle growth and development
              </li>
              <li className="flex justify-start gap-2 items-center text-lg mb-3 text-black">
                <span className="w-[18px] h-[18px] rounded-[100%] bg-black"></span>
                Shakes and bars leave you hungry and bloated
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="heroSection bg-[#c5972d] px-4 py-10 flex justify-center items-center bg-no-repeat min-h-96 bg-contain bg-[url('https://cdn.shopify.com/s/files/1/0555/1751/1961/files/Group_4161.png')]">
         <div className='max-w-[1440px] flex justify-center items-center '>
        <div className='xl:w-[40%] lg:w-[100%]  bg-[#0001]'>
          <h2 className='text-black text-5xl mt-2 ' >You Ask. We Answer.</h2>
          <div className='p-5'>

        <FaqAccordion />
          </div>

        </div>
         </div>
      </section>
    </div>
  );
}

/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */
function FeaturedCollection({collection}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery>;
 * }}
 */

// function RecommendedProducts({products}) {
//   return (
//     <div className="recommended-products">
//       <h2>Recommended Products</h2>
//       <Suspense fallback={<div>Loading...</div>}>
//         <Await resolve={products}>
//           {({products}) => (
//             <div className="recommended-products-grid">
//               {products.nodes.map((product) => (
//                 <Link
//                   key={product.id}
//                   className="recommended-product"
//                   to={`/products/${product.handle}`}
//                 >
//                   <Image
//                     data={product.images.nodes[0]}
//                     aspectRatio="1/1"
//                     sizes="(min-width: 45em) 20vw, 50vw"
//                   />
//                   <h4>{product.title}</h4>
//                   <small>
//                     <Money data={product.priceRange.minVariantPrice} />
//                   </small>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </Await>
//       </Suspense>
//       <br />
//     </div>
//   );
// }

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
