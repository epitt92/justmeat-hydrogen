import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import stepImage1 from '~/assets/images/how-it-works-step-1.png'
import stepImage2 from '~/assets/images/how-it-works-step-2.png'
import stepImage3 from '~/assets/images/how-it-works-step-3.png'

const swiperBreakpoints = {
  360: {
    slidesPerView: 1.5,
    spaceBetween: 20,
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
    spaceBetween: 40,
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

export const HowItWorksStepsSlider = () => {
  return (
    <div className="relative flex justify-center overflow-x-hidden sm:mb-[56px] mb-[10px] sm:max-w-full max-w-[425px]">
      <div className="md:w-[600px] lg:w-[891px] w-full mx-auto">
        <Swiper
          loop
          autoplay
          pagination={{ clickable: true }}
          slidesPerView={3}
          modules={[Pagination]}
          breakpoints={swiperBreakpoints}
          centeredSlides
          initialSlide={1}
          className="how-it-works-slider"
        >
          {steps.map((step, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative rounded-[8px] overflow-hidden sm:mb-0 mb-[50px] w-full"
                style={{ boxShadow: '0px 30px 30px -9px rgba(0, 0, 0, 0.14)' }}
              >
                <img className="w-full" src={step.image} alt="" />
                <div className="relative bg-white font-nunito sm:px-[26px] sm:py-[30px] px-[22px] py-[20px] font-bold tracking-[2px] min-h-[132px]">
                  <span className="absolute -translate-x-1/2 left-1/2 rounded-[4px] bg-[#231B19] px-[13px] py-[5px] text-[14px] font-bold top-[-15px]">
                    STEP {index + 1}
                  </span>
                  <div className="text-[#231B19] text-center tracking-[1px] leading-[20px]">
                    {step.text}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
