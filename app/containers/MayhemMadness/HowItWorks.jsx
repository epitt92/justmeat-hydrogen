import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { HowItWorksStepsSlider } from '~/components/HowItWorksStepsSlider'
import { PremiumSeal } from '~/icons/PremiumSeal'

export const HowItWorks = () => {
  return (
    <section className="bg-[#222222] text-white sm:pt-[100px] sm:pb-[110px] pt-[50px] pb-[60px]">
      <div className="absolute w-[120px] xl:block hidden 2xl:right-[160px] xl:right-[140px]">
        <PremiumSeal />
      </div>
      <div className="container text-center">
        <div className=" font-nunito sm:text-[18px] text-[12px] font-semibold uppercase leading-[26px] mt-8">
          How JUST MEATS WORKS
        </div>
        <div className=" font-nunito text-[28px] sm:text-[36px]  font-bold uppercase leading-normal tracking-[1.8px] mt-2 sm:mb-[6px]">
        THE ULTI-MEAT EXPERIENCE
        </div>
        <div className=" font-nunito font-normal text-[16px] sm:text-[18px]  sm:leading-[26px] leading-[25px] max-w-[710px] w-full mx-auto sm:mb-[43px] mb-[35px]">
          Here&rsquo;s how having <span className="font-bold">JUST MEATS</span>{' '}
          delivered to your door changes the game.
          <br />
          Our meats marinate on the way to your door and our innovative Cooking
          Sauce preserves the moisture and finishes the meat with an infusion of
          flavor.
        </div>
      </div>
      <HowItWorksStepsSlider />
      {/* <div className="container">
        <div className="flex justify-center sm:gap-[20px] gap-[8px]">
          <button className="px-[24px] py-[12px] rounded-[4px] bg-[#7A392D] tracking-[1px]">
            HOW IT WORKS
          </button>
          <button className="px-[24px] py-[12px] rounded-[4px] bg-[#637160] tracking-[1px]">
            GET INSPIRED
          </button>
        </div>
      </div> */}
    </section>
  )
}
