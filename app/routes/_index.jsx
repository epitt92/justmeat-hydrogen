import { defer } from '@shopify/remix-oxygen'
import { useLoaderData, Link, NavLink } from '@remix-run/react'
import { cn } from '~/lib/utils'
import OrderButton from 'app/components/OrderButton'
import ProductSlider from '~/components/ProductSlider'
import FaqAccordion from '~/components/FaqAccordion'
import { RECOMMENDED_PRODUCTS_QUERY } from '~/graphql/Product'
import { FEATURED_COLLECTION_QUERY } from '~/graphql/Collection'
import BannerCharacter from '~/assets/images/Copy-of-JustMeats_Partnerships_Stills_RichFroning_202MAR25_SethH-7.png'
import { MayhemNation } from '~/icons/MayhemNation'
import { Image } from '@shopify/hydrogen'

export async function loader({ context }) {
  const { storefront } = context
  const { collections } = await storefront.query(FEATURED_COLLECTION_QUERY)
  const featuredCollection = collections.nodes[0]
  const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY)

  return defer({ featuredCollection, recommendedProducts })
}

export default function Homepage() {
  return (
    <main className="relative">
      <section className="relative">
        <div className="banner bg-cover sm:h-[calc(100vh-120px)] h-[780px]"></div>
        <div className="absolute left-0 top-0 w-full h-full">
          <div className="container relative h-full">
            <div className="relative h-full">
              <div className="sm:h-[40px] h-[30px]"></div>
              <div className="sm:mb-[66px] mb-[44px] w-[340px] sm:w-[663px]">
                <MayhemNation />
              </div>
              <div className="">
                <div className="font-nunito font-bold sm:text-[27px] text-[20px] text-yellow mb-[6px] sm:mb-[8px]">
                  6 lbs of meat FOR FREE!
                </div>
                <div className="sm:text-[36px] text-[27px] font-bold text-white leading-tight">
                  MAYHEM AFFILIATE
                  <br />
                  OWNERS ONLY!
                </div>
              </div>
              <div className="absolute sm:w-auto w-[300px] sm:right-[100px] sm:translate-x-0 -translate-x-1/2 left-1/2 bottom-0">
                <Image src={BannerCharacter} />
              </div>
              <div className="flex flex-col items-center bg-brown-pattern shadow absolute w-full sm:bottom-[-84px] left-0 text-white bottom-[-20px] sm:pt-[28px] pt-[21px] sm:pb-[24px] pb-[18px] sm:rounded-[8px] rounded-[6px]">
                <div className="sm:flex sm:text-[48px] sm:text-left text-center text-[36px] font-bold sm:mb-[4px] mb-[3px]">
                  EARN ANYWHERE FROM
                  <span className="text-yellow ml-[6px] sm:ml-[8px]">
                    $5K - $10K
                  </span>
                </div>
                <div className="sm:text-[28px] text-[21px] text-center sm:text-left font-bold tracking-[3px] sm:mb-[16px] mb-[12px]">
                  IN ADDITIONAL REVENUE IN AS LITTLE AS 3 MONTHS!
                </div>
                <div className="sm:text-[13px] text-[10px] text-center sm:text-left tracking-[3px] text-[#ccbdb1]">
                  CLAIM YOUR 6 FREE MEATS, AND WE WILL SHOW YOU HOW
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#222222] h-[300px]"></section>
    </main>
  )
}
