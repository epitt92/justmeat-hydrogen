import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import stepImage1 from '~/assets/images/how-it-works-step-1.png'
import stepImage2 from '~/assets/images/how-it-works-step-2.png'
import stepImage3 from '~/assets/images/how-it-works-step-3.png'

const desktopItems = [
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

const mobileItems = [
  { image: '', text: '' },
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
    <div className="relative flex justify-center overflow-x-hidden sm:mb-[56px] mb-[10px]">
      <div className="sm:block hidden w-[891px] mx-auto">
        <Slider steps={desktopItems} />
      </div>
      <div className="sm:hidden block w-[843px] mx-auto">
        <Slider steps={mobileItems} isMobile />
      </div>
    </div>
  )
}

const Slider = ({ steps, isMobile = false }) => (
  <Swiper
    loop
    autoplay
    pagination={{ clickable: true }}
    slidesPerView={3}
    spaceBetween={24}
    modules={[Pagination]}
    className={isMobile ? 'how-it-works-slider mobile' : 'how-it-works-slider'}
  >
    {steps.map((step, index) => (
      <SwiperSlide key={index}>
        {isMobile && index === 0 ? (
          <div></div>
        ) : (
          <div
            className="relative rounded-[8px] overflow-hidden sm:mb-0 mb-[50px]"
            style={{
              boxShadow: '0px 30px 30px -9px rgba(0, 0, 0, 0.14)',
            }}
          >
            <img className="w-full" src={step.image} alt="" />
            <div className="relative bg-white font-nunito sm:px-[26px] sm:py-[30px] px-[22px] py-[20px] font-bold tracking-[2px] min-h-[132px]">
              <span className="absolute -translate-x-1/2 left-1/2 rounded-[4px] bg-[#231B19] px-[13px] py-[5px] text-[14px] font-bold top-[-15px]">
                STEP {index}
              </span>
              <div className="text-[#231B19] text-center tracking-[1px] leading-[20px]">
                {step.text}
              </div>
            </div>
          </div>
        )}
      </SwiperSlide>
    ))}
  </Swiper>
)
