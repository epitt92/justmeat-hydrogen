import { useEffect, useState } from 'react'

import OrderButton from 'app/components/OrderButton'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

import { Carousel, IconButton } from '@material-tailwind/react'
import { Link, NavLink, useLoaderData } from '@remix-run/react'
import { defer } from '@shopify/remix-oxygen'

import carneAsasaImage from '~/assets/images/BodyBulding_Recipie_CarneAsasa.webp'
import tutorialImage2 from '~/assets/images/Hannah_Tall2.webp'
import tutorialImage3 from '~/assets/images/Hannah_Zoomed3.webp'
import tutorialImage1 from '~/assets/images/Hannah_Zoomed.webp'
import mosaicImage from '~/assets/images/Mosaic.webp'
import subscriptionBannerImage from '~/assets/images/april_banner_Desktop.jpg'
import subscriptionBannerMobileImage from '~/assets/images/april_banner_Mobile.jpg'
import video1 from '~/assets/videos/32c027bc585340199844575c5e85cf42.mp4'
import FaqAccordion from '~/components/FaqAccordion'
import ProductSlider from '~/components/ProductSlider'
import ProductsSlider from '~/components/ProductsSlider'
import { FEATURED_COLLECTION_QUERY } from '~/graphql/Collection'
import { RECOMMENDED_PRODUCTS_QUERY } from '~/graphql/Product'

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
  const [froningVisited, setFroningVisited] = useState(true)

  const tutorialImages = [tutorialImage1, tutorialImage2, tutorialImage3]

  useEffect(() => {
    setFroningVisited(
      JSON.parse(window.localStorage.getItem('_froning_visited')) === true,
    )
  }, [])

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
            <source src={video1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex flex-col z-10 justify-center items-center p-5 gap-6 w-max-[1440px] before:content-[''] before:absolute before:top-[0] before:left-[0] before:w-full before:h-full before:bg-[rgba(0,_0,_0,_0.4)]">
          <div className="flex flex-col justify-center items-center gap-4 py-16 sm:py-44 mt-[-30px] w-full sm:w-8/12 z-20">
            <p className="sm:text-5xl text-3xl leading-[55px] font-bold text-white">
              No Fuss, All Flavor <br></br>
              Ready & Delivered
            </p>
            <p className="text-base text-center text-white sm:text-2xl">
              Leave the protein to the professionals: choose from our lineup of
              12 premium meats with new flavors releasing regularly.
            </p>
            <div className="mt-6">
              <OrderButton />
            </div>
          </div>
        </div>
      </section>
      {!froningVisited && (
        <section className="flex justify-center items-center text-[28px] sm:text-[35px] font-Roboto font-bold py-8 px-[15px] underline text-center">
          <NavLink end prefetch="intent" to="/rich-froning">
            Click here to revisit our Rich Froning specials.
          </NavLink>
        </section>
      )}
      <section>
        <NavLink
          className={'w-full'}
          end
          prefetch="intent"
          to="/products/custom-bundle"
        >
          <img
            src={subscriptionBannerImage}
            className="hidden sm:block"
            width="100%"
            alt=""
          />
          <img
            src={subscriptionBannerMobileImage}
            className="block sm:hidden"
            width="100%"
            alt=""
          />
        </NavLink>
      </section>

      <section className="flex items-center justify-center my-5 bg-white bg-center bg-no-repeat bg-contain min-h-72 sm:min-h-96 sm:bg-left bg-pig">
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

      <section className="flex items-center justify-center bg-cover bg-pnser product-list-slider">
        <div className="w-[100%] py-10 sm:py-20 px-4 sm:px-20 max-w-[1440px] relative">
          <ProductsSlider />
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
            <div className="md:grid hidden md:grid-cols-3 gap-[16px] xl:gap-[30px]">
              {tutorialImages.map((item, index) => {
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
            <Carousel
              className="rounded-xl md:hidden order-now-carousel"
              prevArrow={({ handlePrev }) => (
                <IconButton
                  variant="text"
                  color="white"
                  size="lg"
                  onClick={handlePrev}
                  className="!absolute top-2/4 left-4 -translate-y-2/4 bg-[rgba(0,_0,_0,_.4)] rounded-full w-[40px] h-[40px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="-ml-1 h-7 w-[18px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    ></path>
                  </svg>
                </IconButton>
              )}
              nextArrow={({ handleNext }) => (
                <IconButton
                  variant="text"
                  color="white"
                  size="lg"
                  onClick={handleNext}
                  className="!absolute top-2/4 !right-4 -translate-y-2/4 bg-[rgba(0,_0,_0,_.4)] rounded-full w-[40px] h-[40px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="ml-1 h-7 w-[18px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    ></path>
                  </svg>
                </IconButton>
              )}
            >
              {tutorialImages.map((item, index) => {
                return (
                  <img
                    src={item}
                    key={index}
                    className="object-cover w-full h-full"
                  />
                )
              })}
            </Carousel>
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
        <div className="max-w-[100%] flex flex-col justify-end items-end p-5 gap-6 bg-cover bg-farm">
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
        <img src={mosaicImage} width="100%" alt="" />
      </section>
      <section className="w-full px-2 py-10 bg-white border md:px-20 ">
        <div>
          <h1 className="font-Roboto sm:text-[40px] text-[31px] font-bold text-center mb-3">
            Customers Say:
          </h1>
        </div>
        <div id="looxReviews" data-loox-aggregate></div>
      </section>
      <section className="bg-[#eeeeee] flex justify-center items-center ">
        <div className="max-w-[1440px] w-[100%] flex justify-start gap-20 px-5 xl:px-10 sm:py-20 py-10 ">
          <div className="flex-col items-center hidden w-4/12 gap-10 ml-10 xl:flex">
            <img className="" src={carneAsasaImage} alt="" />
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
      <section className="heroSection bg-[#c5972d] px-4 py-10 flex justify-center items-center bg-no-repeat min-h-96 bg-contain bg-cock">
        <div className="max-w-[1440px] flex justify-center items-center ">
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
