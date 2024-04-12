import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { NavLink } from '@remix-run/react'

import sliderImage1 from '~/assets/images/rich-froning-banner.png'
import { DeliveryTruck } from '~/icons/DeliveryTruck'
import { SmileEmoji } from '~/icons/SmileEmoji'
import { WeighterLight } from '~/icons/WeighterLight'

const sliderImages = [
  { image: sliderImage1 },
  // { image: sliderImage1 },
  // { image: sliderImage1 },
]

export const Banner = () => {
  return (
    <section className="relative font-nunito text-[#EFEEED]">
      <div className="sm:h-[calc(100vh-120px)] flex flex-col">
        <div className="relative flex-1">
          <Swiper
            loop
            autoplay
            pagination={{ clickable: true }}
            slidesPerView={1}
            modules={[Pagination]}
            className="h-full rich-froning-banner-slider"
          >
            {sliderImages.map((slider, index) => (
              <SwiperSlide key={index}>
                <div
                  className="h-full bg-cover sm:[background-position-x:0] [background-position-x:1120px]"
                  style={{ backgroundImage: `url(${slider.image})` }}
                >
                  <div className="relative container-small sm:pt-[251px] pt-[270px] sm:text-center text-white tracking-[2px] sm:pb-0 pb-[156px] leading-normal">
                    <div className="font-bold sm:text-[36px] text-[30px] cursor-default">
                      ELITE FITNESS + <br className="block sm:hidden" />
                      ELITE NUTRITION
                    </div>
                    <div className="font-bold sm:text-[62px] text-[38px] sm:mb-[49px] mb-[45px] cursor-default">
                      <span className="text-[#E47A0F]">25% </span>
                      OFF <br className="block sm:hidden" />
                      FIRST ORDER
                      <span className="text-[#E47A0F]"> +$15</span>
                    </div>
                    <NavLink end prefetch="intent" to="/products/custom-bundle">
                      <button className="text-[18px] tracking-[1px] px-[28px] py-[14px] rounded-[4px] bg-[#637160]">
                        GET MEAT
                      </button>
                    </NavLink>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="bg-[#231b19] py-[10px] text-[15px] leading-[33px] tracking-[3px] font-normal overflow-x-hidden">
          <div className="container-small flex justify-between sm:gap-0 gap-[67px]">
            <div>FAMILY</div>
            <div>FITNESS</div>
            <div>FAITH</div>
            <div>SERVICE</div>
            <div>CONVENIENCE</div>
            <div>TASTE</div>
            <div>VARIETY</div>
            <div>PRICE</div>
          </div>
        </div>
      </div>
      <div
        className="bg-[#7A392D] relative z-10"
        style={{ boxShadow: '0px 30px 50px -10px rgba(0, 0, 0, 0.20)' }}
      >
        <div className="container-small sm:pt-[50px] sm:pb-[50px] pt-[44px] pb-[55px] grid sm:grid-cols-3 grid-cols-1 sm:gap-0 gap-[38px]">
          <div className="flex justify-center">
            <div className="flex items-center sm:gap-[26px] gap-[17px]">
              <div className="sm:w-[54px] w-[52px]">
                <DeliveryTruck />
              </div>
              <div>
                <div className="text-[16px]">Meats delivered</div>
                <div className="sm:text-[29px] text-[28px] font-bold font-dunbar">
                  1,006,928
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex items-center sm:gap-[26px] gap-[17px]">
              <div className="sm:w-[48px] w-[48px]">
                <WeighterLight />
              </div>
              <div>
                <div className="text-[16px]">Pounds cooked</div>
                <div className="sm:text-[29px] text-[28px] font-bold font-dunbar">
                  345,431 LBS
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex items-center sm:gap-[26px] gap-[17px]">
              <div className="sm:w-[43px] w-[39px]">
                <SmileEmoji />
              </div>
              <div>
                <div className="text-[16px]">Happy customers</div>
                <div className="sm:text-[29px] text-[28px] font-bold font-dunbar">
                  84,097
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
