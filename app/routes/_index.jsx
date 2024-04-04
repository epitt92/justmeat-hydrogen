import { defer } from '@shopify/remix-oxygen'
import { useLoaderData, Link, NavLink } from '@remix-run/react'
import OrderButton from 'app/components/OrderButton'
import ProductSlider from '~/components/ProductSlider'
import FaqAccordion from '~/components/FaqAccordion'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{ title: 'Hydrogen | Home' }]
}

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({ context }) {
  const { storefront } = context
  const { collections } = await storefront.query(FEATURED_COLLECTION_QUERY)
  const featuredCollection = collections.nodes[0]
  const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY)

  return defer({ featuredCollection, recommendedProducts })
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData()
  return (
    <div className="relative home">
      <div className=" p-[20px] xl:hidden hidden md:block text-center bg-[#c5972d] ">
        <h2 className="font-bold text-[35px]  text-[#f0f0f0] ">
          Premium Meat, Expertly Cooked, Chilled, & Delivered{' '}
        </h2>
      </div>
      <section className="relative flex items-center justify-center overflow-hidden heroSection">
        <div className="bg-video absolute top-0 left-0 w-[100%] h-[100%]">
          <video
            className="object-cover w-full h-full"
            autoPlay
            muted
            playsInline
            loop
          >
            <source
              src="https://cdn.shopify.com/videos/c/o/v/32c027bc585340199844575c5e85cf42.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex flex-col z-10 justify-center items-center p-5 gap-6 w-max-[1440px] overlay-css-cs">
          <div className="flex flex-col justify-center items-center gap-4 py-16 sm:py-44 mt-[-30px] w-full sm:w-8/12">
            <p className="sm:text-5xl text-3xl leading-[55px] font-bold text-white">
              No Fuss, All Flavor <br></br>
              Ready & Delivered
            </p>
            <p className="text-base text-center text-white sm:text-2xl ">
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
          <img
            src="https://cdn.shopify.com/s/files/1/0672/4776/7778/files/Ad_1_-_Desktop_1.jpg?v=1712239695"
            className="hidden sm:block"
            width="100%"
            alt=""
          />
          <img
            src="https://cdn.shopify.com/s/files/1/0672/4776/7778/files/Ad_1_-_Mobile_2.jpg?v=1712239740"
            className="block sm:hidden"
            width="100%"
            alt=""
          />
        </NavLink>
      </section>

      <section className=" bg-white flex justify-center items-center bg-no-repeat min-h-72 sm:min-h-96 bg-contain bg-center sm:bg-left bg-[url('https://cdn.shopify.com/s/files/1/0555/1751/1961/files/Group_4179_2x_c20de474-5eef-421d-a248-f3a6c09ae36a.png')] my-5">
        <div className="flex flex-col justify-center items-center p-5 gap-6 w-max-[1440px] ">
          <div className="flex flex-col items-center justify-center w-full gap-6 sm:w-8/12">
            <p className="sm:text-5xl text-3xl leading-[55px] font-bold text-black ">
              Elevate Your Plate
            </p>
            <div className="">
              <OrderButton />
            </div>
            <p className="text-center text-black text-1xl ">
              No Artificial Colors / No Artificial Flavors / Grass-Fed &
              Grass-Finished Beef Premium Quality / Money-back Guarantee
            </p>
          </div>
        </div>
      </section>

      <section className="flex justify-center items-center bg-cover bg-[url('https://cdn.shopify.com/s/files/1/0555/1751/1961/files/PNSER.png')] ">
        <div className="container py-10 sm:py-20">
          <ProductSlider />
          <div className="mt-[64px] flex flex-col lg:flex-row justify-between items-start gap-[24px]">
            <div className="flex flex-col">
              <h2 className="text-[30px] md:text-[48px] xl:text-[70px] leading-[100%] font-semibold text-white">
                Your Protein Routine
              </h2>
              <p className="mt-[12px] md:mt-[24px] xl:mt-[40px] text-[16px] xl:text-[18px] leading-[140%] text-white max-w-[440px]">
                The hardest part of meal prepping has never been easier! Simply
                order your meats, prepare for delivery, and reheat with the
                included directions. Plate up with your favorite sides a
                delicious and carefree meal.
              </p>
              <br />

              <OrderButton
                className={
                  'text-[28px] font-body mt-[38px] px-[40px] py-[10px]'
                }
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-[16px] xl:gap-[30px]">
              {[
                'https://cdn.shopify.com/s/files/1/0555/1751/1961/files/Hannah_Zoomed.jpg?v=1702934270',
                'https://cdn.shopify.com/s/files/1/0555/1751/1961/files/Hannah_Tall2.jpg?v=1701447856',
                'https://cdn.shopify.com/s/files/1/0555/1751/1961/files/Hannah_Zoomed3.jpg?v=1702934278',
              ].map((item, index) => {
                return (
                  <img
                    src={item}
                    width="274px"
                    height="447"
                    key={index}
                    className="w-full sm:w-[274px]"
                  />
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center py-6 bg-black">
        <div className=" flex justify-center p-5 sm:px-10 w-max-[1440px] w-[100%]">
          <div className="flex flex-col items-center justify-between w-full gap-5 lg:w-9/12 sm:flex-row lg:justify-center sm:gap-0 lg:gap-48">
            <div className="flex justify-center items-center flex-col gap-4 sm:border-none border-b-2 sm:pb-0 pb-5 w-full sm:w-fit border-[#fff] text-center">
              <h2 className="text-2xl font-semibold text-white">
                MEATS DELIVERED
              </h2>
              <p className="text-2xl text-white">1,006,928</p>
            </div>
            <div className="flex justify-center items-center flex-col gap-4 sm:border-none border-b-2 sm:pb-0 pb-5 w-full sm:w-fit border-[#fff] text-center">
              <h2 className="text-2xl font-semibold text-white">
                POUNDS COOKED
              </h2>
              <p className="text-2xl text-white">345,431 Ib</p>
            </div>
            <div className="flex justify-center items-center flex-col gap-4 sm:border-none border-b-2 sm:pb-0 pb-5 w-full sm:w-fit border-[#fff] text-center">
              <h2 className="text-2xl font-semibold text-white">
                HAPPY CUSTOMERS
              </h2>
              <p className="text-2xl text-white">84,097</p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center hidden w-full p-20 bg-white border heroSection sm:block ">
        <div className="max-w-[100%] flex flex-col justify-end items-end p-5 gap-6 bg-cover bg-[url('https://cdn.shopify.com/s/files/1/0555/1751/1961/files/Farm_BG_Just_Meats.png')]">
          <div className="lg:w-[60%] md:w-[90%] xl:w-[38%] md:w-[60%] bg-[#00000040] pl-12 pr-4 py-5 mt-[200px]">
            <h2 className="mb-5 text-5xl font-semibold leading-tight text-white ">
              REAL MEAT<br></br>REAL RANCHES
            </h2>
            <p className="mb-5 text-lg text-white">
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
      <section className="items-center justify-center hidden w-full p-20 bg-white border sm:block ">
        <div id="looxReviews" data-loox-aggregate></div>
      </section>
      <section className="bg-[#eeeeee] flex justify-center items-center ">
        <div className="container flex justify-start gap-20 py-10 xl:px-10 sm:py-20 ">
          <div className="flex-col items-center hidden w-4/12 gap-10 ml-10 xl:flex">
            <img
              className=""
              src="https://cdn.shopify.com/s/files/1/0555/1751/1961/files/BodyBulding_Recipie_CarneAsasa.png"
              alt=""
            />
            <div>
              <OrderButton />
            </div>
          </div>

          <div className="flex flex-col gap-10 lg:w-9/12 xl:w-5/12">
            <h1 className=" xl:px-4 py-2 lg:px-2 sm:text-5xl text-3xl px-3 font-bold leading-tight bg-[#000] text-white">
              Skip the Protein Bar, <br></br>Have a Real Meal
            </h1>
            <ul className="px-4">
              <li className="flex items-center justify-start gap-2 mb-3 text-base text-black sm:text-lg">
                <span className=" w-[15px] sm:w-[18px] h-[15px] sm:h-[18px] rounded-[100%] bg-black"></span>
                Fuel for the entire day
              </li>
              <li className="flex items-center justify-start gap-2 mb-3 text-base text-black sm:text-lg">
                <span className=" w-[15px] sm:w-[18px] h-[15px] sm:h-[18px] rounded-[100%] bg-black"></span>
                30g of protein per serving
              </li>
              <li className="flex items-center justify-start gap-2 mb-3 text-base text-black sm:text-lg">
                <span className=" w-[15px] sm:w-[18px] h-[15px] sm:h-[18px] rounded-[100%] bg-black"></span>
                Sustains a health lifestyle
              </li>
              <li className="flex items-center justify-start gap-2 mb-3 text-base text-black sm:text-lg">
                <span className=" w-[15px] sm:w-[18px] h-[15px] sm:h-[18px] rounded-[100%] bg-black"></span>
                Saves time and money
              </li>
              <li className="flex items-center justify-start gap-2 mb-3 text-base text-black sm:text-lg">
                <span className=" w-[15px] sm:w-[18px] h-[15px] sm:h-[18px] rounded-[100%] bg-black"></span>
                Promotes muscle growth and development
              </li>
              <li className="flex items-center justify-start gap-2 mb-3 text-base text-black sm:text-lg">
                <span className=" w-[15px] sm:w-[18px] h-[15px] sm:h-[18px] rounded-[100%] bg-black"></span>
                Shakes and bars leave you hungry and bloated
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="heroSection bg-[#c5972d] px-4 py-10 flex justify-center items-center bg-no-repeat min-h-96 bg-contain bg-[url('https://cdn.shopify.com/s/files/1/0555/1751/1961/files/Group_4161.png')]">
        <div className="container flex items-center justify-center ">
          <div className="xl:w-[40%] lg:w-[100%] ">
            <h2 className="mt-2 text-5xl text-black ">You Ask. We Answer.</h2>
            <div className="p-5">
              <FaqAccordion />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

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
`

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
`

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
