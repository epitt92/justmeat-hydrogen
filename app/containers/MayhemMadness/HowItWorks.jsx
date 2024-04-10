import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import stepImage1 from '~/assets/images/how-it-works-step-1.png'
import stepImage2 from '~/assets/images/how-it-works-step-2.png'
import stepImage3 from '~/assets/images/how-it-works-step-3.png'
import { PremiumSeal } from '~/icons/PremiumSeal'

const swiperBreakpoints = {
  360: {
    slidesPerView: 3,
    spaceBetween: 24,
  },
  768: {
    slidesPerView: 3,
    spaceBetween: 30,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 40,
  },
  1440: {
    slidesPerView: 3,
    spaceBetween: 48,
  },
}

const steps = [
  {
    image: stepImage1,
    text: 'Select whatever flavor that you feel in the mood for',
  },
  {
    image: stepImage2,
    text: 'Reheat the meat with its included Cooking Sauce in a hot skillet',
  },
  {
    image: stepImage3,
    text: 'Pair with your favorite sides and enjoy amazing flavor',
  },
]

export const HowItWorks = () => {
  return (
    <section className="bg-[#222222] text-white sm:pt-[100px] sm:pb-[110px] pt-[50px] pb-[60px]">
      <div className="absolute w-[133px] xl:block hidden 2xl:right-[300px] xl:right-[140px]">
        <PremiumSeal />
      </div>
      <div className="container text-center">
        <div className="sm:text-[14px] text-[12px] font-normal tracking-[3px] sm:mb-[6px] mb-[4px]">
          HOW IT WORKS SECTION HERE
        </div>
        <div className="sm:text-[36px] text-[24px] font-bold sm:mb-[23px] mb-[17px]">
          THE ULTI-MEAT EXPERIENCE
        </div>
        <div className="sm:text-[18px] text-[16px] sm:leading-[26px] leading-[25px] font-nunito max-w-[710px] w-full mx-auto sm:mb-[43px] mb-[35px]">
          Here&rsquo;s how having <span className="font-bold">JUST MEATS</span>{' '}
          delivered to your door changes the game.
          <br />
          Our meats marinate on the way to your door and our innovative Cooking
          Sauce preserves the moisture and finishes the meat with an infusion of
          flavor.
        </div>
      </div>
      <div className="relative flex justify-center overflow-x-hidden sm:mb-[56px] mb-[10px]">
        <div className="sm:w-[891px] w-[843px] mx-auto">
          <Swiper
            loop
            autoplay
            pagination={{ clickable: true }}
            slidesPerView={3}
            modules={[Pagination]}
            breakpoints={swiperBreakpoints}
            className="how-it-works-slider"
          >
            {steps.map((step, index) => (
              <SwiperSlide key={index}>
                <div className="relative rounded-[8px] overflow-hidden sm:mb-0 mb-[50px]">
                  <img className="w-full" src={step.image} alt="" />
                  <div className="relative bg-white font-nunito sm:px-[22px] sm:py-[30px] px-[22px] py-[20px] sm:text-[16px] font-normal tracking-[2px] min-h-[132px]">
                    <span className="absolute -translate-x-1/2 left-1/2 rounded-[4px] bg-[#231B19] px-[13px] py-[5px] text-[14px] font-bold top-[-15px]">
                      STEP {index + 1}
                    </span>
                    <div className="text-[#231B19]">{step.text}</div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
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
