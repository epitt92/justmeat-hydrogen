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
    <div className="home relative">
      <div className=" p-[20px] xl:hidden hidden md:block text-center bg-[#c5972d] ">
        <h2 className="font-bold text-[35px]  text-[#f0f0f0] ">
          Premium Meat, Expertly Cooked, Chilled, & Delivered{' '}
        </h2>
      </div>
      <section className="heroSection relative flex justify-center items-center overflow-hidden">
        <div className="bg-video absolute top-0 left-0 w-[100%] h-[100%]">
          <video
            className="h-full w-full object-cover"
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
            <p className="text-white text-base sm:text-2xl text-center ">
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
            src="https://cdn.shopify.com/s/files/1/0672/4776/7778/files/subcription_banner.webp?v=1709994462"
            className="sm:block hidden"
            width="100%"
            alt=""
          />
          <img
            src="https://cdn.shopify.com/s/files/1/0672/4776/7778/files/Ranch_Rub_Mobile.webp?v=1710451473"
            className="sm:hidden block"
            width="100%"
            alt=""
          />
        </NavLink>
      </section>

      <section className=" bg-white flex justify-center items-center bg-no-repeat min-h-72 sm:min-h-96 bg-contain bg-center sm:bg-left bg-[url('https://cdn.shopify.com/s/files/1/0555/1751/1961/files/Group_4179_2x_c20de474-5eef-421d-a248-f3a6c09ae36a.png')] my-5">
        <div className="flex flex-col justify-center items-center p-5 gap-6 w-max-[1440px] ">
          <div className="flex flex-col justify-center items-center gap-6 w-full sm:w-8/12">
            <p className="sm:text-5xl text-3xl leading-[55px] font-bold text-black ">
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

      <section className="flex justify-center items-center bg-cover bg-[url('https://cdn.shopify.com/s/files/1/0555/1751/1961/files/PNSER.png')] ">
        <div className="w-[100%] py-10 sm:py-20 px-5 sm:px-20 max-w-[1440px] ">
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
              
              <OrderButton />

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

      <section className="bg-black flex justify-center items-center  py-6">
        <div className=" flex justify-center p-5 sm:px-10 w-max-[1440px] w-[100%]">
          <div className=" w-full lg:w-9/12 flex sm:flex-row flex-col  lg:justify-center justify-between gap-5 sm:gap-0 lg:gap-48 items-center">
            <div className="flex justify-center items-center flex-col gap-4 sm:border-none border-b-2 sm:pb-0 pb-5 w-full sm:w-fit border-[#fff] text-center">
              <h2 className="text-white font-semibold text-2xl">
                MEATS DELIVERED
              </h2>
              <p className="text-white text-2xl">1,006,928</p>
            </div>
            <div className="flex justify-center items-center flex-col gap-4 sm:border-none border-b-2 sm:pb-0 pb-5 w-full sm:w-fit border-[#fff] text-center">
              <h2 className="text-white font-semibold text-2xl">
                POUNDS COOKED
              </h2>
              <p className="text-white text-2xl">345,431 Ib</p>
            </div>
            <div className="flex justify-center items-center flex-col gap-4 sm:border-none border-b-2 sm:pb-0 pb-5 w-full sm:w-fit border-[#fff] text-center">
              <h2 className="text-white font-semibold text-2xl">
                HAPPY CUSTOMERS
              </h2>
              <p className="text-white text-2xl">84,097</p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full heroSection border bg-white flex justify-center hidden sm:block items-center p-20  ">
        <div className="max-w-[100%] flex flex-col justify-end items-end p-5 gap-6 bg-cover bg-[url('https://cdn.shopify.com/s/files/1/0555/1751/1961/files/Farm_BG_Just_Meats.png')]">
          <div className="lg:w-[60%] md:w-[90%] xl:w-[38%] md:w-[60%] bg-[#00000040] pl-12 pr-4 py-5 mt-[200px]">
            <h2 className="text-white text-5xl leading-tight font-semibold mb-5 ">
              REAL MEAT<br></br>REAL RANCHES
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
      <section className="w-full border bg-white flex justify-center hidden sm:block items-center p-20  ">
      <div id="looxReviews" data-loox-aggregate="true" data-mode="" data-limit="20" data-upgraded="true" className="h-96">
      <iframe id="looxReviewsFrame" title="All product reviews widget" src="https://loox.io/widget/qZPveP9mjj/reviews?h=1712178000000&amp;limit=20" height="3685px" width="100%" frameBorder="0" scrolling="no" margin="0" className="overflow-hidden h-full w-full"></iframe>
    </div>
      </section>
      <section className="bg-[#eeeeee] flex justify-center items-center ">
        <div className="max-w-[1440px] w-[100%] flex justify-start gap-20 px-5 xl:px-10 sm:py-20 py-10 ">
          <div className="flex-col items-center gap-10 hidden xl:flex  w-4/12 ml-10">
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
            <h1 className=" xl:px-4 py-2 lg:px-2 sm:text-5xl text-3xl px-3 font-bold leading-tight bg-[#000] text-white">
              Skip the Protein Bar, <br></br>Have a Real Meal
            </h1>
            <ul className="px-4">
              <li className="flex justify-start gap-2 items-center text-base sm:text-lg mb-3 text-black">
                <span className=" w-[15px] sm:w-[18px] h-[15px] sm:h-[18px] rounded-[100%] bg-black"></span>
                Fuel for the entire day
              </li>
              <li className="flex justify-start gap-2 items-center text-base sm:text-lg mb-3 text-black">
                <span className=" w-[15px] sm:w-[18px] h-[15px] sm:h-[18px] rounded-[100%] bg-black"></span>
                30g of protein per serving
              </li>
              <li className="flex justify-start gap-2 items-center text-base sm:text-lg mb-3 text-black">
                <span className=" w-[15px] sm:w-[18px] h-[15px] sm:h-[18px] rounded-[100%] bg-black"></span>
                Sustains a health lifestyle
              </li>
              <li className="flex justify-start gap-2 items-center text-base sm:text-lg mb-3 text-black">
                <span className=" w-[15px] sm:w-[18px] h-[15px] sm:h-[18px] rounded-[100%] bg-black"></span>
                Saves time and money
              </li>
              <li className="flex justify-start gap-2 items-center text-base sm:text-lg mb-3 text-black">
                <span className=" w-[15px] sm:w-[18px] h-[15px] sm:h-[18px] rounded-[100%] bg-black"></span>
                Promotes muscle growth and development
              </li>
              <li className="flex justify-start gap-2 items-center text-base sm:text-lg mb-3 text-black">
                <span className=" w-[15px] sm:w-[18px] h-[15px] sm:h-[18px] rounded-[100%] bg-black"></span>
                Shakes and bars leave you hungry and bloated
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="heroSection bg-[#c5972d] px-4 py-10 flex justify-center items-center bg-no-repeat min-h-96 bg-contain bg-[url('https://cdn.shopify.com/s/files/1/0555/1751/1961/files/Group_4161.png')]">
        <div className="max-w-[1440px] flex justify-center items-center ">
          <div className="xl:w-[40%] lg:w-[100%] ">
            <h2 className="text-black text-5xl mt-2 ">You Ask. We Answer.</h2>
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
