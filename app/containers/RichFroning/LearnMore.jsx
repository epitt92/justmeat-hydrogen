import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { NavLink } from '@remix-run/react'

export const LearnMore = () => {
  const steps = [
    {
      text: `<span style="font-weight: 700">JUST MEATS</span> is committed to
      ethical sourcing. Our meats are sourced from local farms where
      animals are raised in humane, stress-free environments, allowing us
      to provide not only healthier choices but also support sustainable
      farming practices.`,
    },
    {
      text: `We believe in the transparency of our supply
      chain, from the lush pastures to your plate. This farm-to-table
      approach not only enhances the flavor and quality of our meats but
      also aligns with our values of honesty, health, and sustainability.`,
    },
    {
      text: `At <span style="font-weight: 700">JUST MEATS</span>, we&apos;re proud
      to offer a delicious, ethically sourced product as a commitment to
      our customers.`,
    },
  ]
  return (
    <section className="grid md:grid-cols-2 grid-cols-1 md:h-auto relative font-dunbar">
      <div className="bg-rich-froning-learn-more bg-cover bg-center md:h-full h-[407px] md:order-first order-last"></div>
      <div className="bg-rich-froning-learn-more-lightPattern1 bg-cover">
        <div className="md:pt-[110px] pt-[62px] md:pb-0 md:pr-5 pb-[40px] md:pl-[66px] text-[#231B19] md:pr-0 pl-[18px] pr-[18px] md:max-w-[512px]">
          <div className="md:text-[36px] text-[24px] md:tracking-[1.8px] tracking-[1.2px] font-bold md:mb-[26px] mb-[17px]">
            FARM - TO - TABLE FRESH
          </div>
          <Swiper
            loop
            autoHeight
            autoplay
            pagination={{ clickable: true }}
            slidesPerView={1}
            modules={[Pagination]}
            centeredSlides
            initialSlide={1}
            className="how-it-works-slider sm:hidden block"
          >
            {steps.map((step, index) => (
              <SwiperSlide key={index}>
                <div className="relative rounded-[8px] overflow-hidden sm:mb-0 mb-[20px] w-full">
                  <div
                    dangerouslySetInnerHTML={{ __html: step.text }}
                    className="font-nunito sm:text-[18px] text-[16px] sm:leading-[26px] leading-[25px] sm:mb-[39px] mb-[24px]"
                  ></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="font-nunito sm:text-[18px] text-[16px] sm:leading-[26px] leading-[25px] sm:mb-[39px] mb-[24px] sm:block hidden">
            <span className="font-extrabold">JUST MEATS</span> is committed to
            ethical sourcing. Our meats are sourced from local farms where
            animals are raised in humane, stress-free environments, allowing us
            to provide not only healthier choices but also support sustainable
            farming practices. <br />
            <br />
            We believe in the transparency of our supply chain, from the lush
            pastures to your plate. This farm-to-table approach not only
            enhances the flavor and quality of our meats but also aligns with
            our values of honesty, health, and sustainability.
            <br />
            <br />
            At <span className="font-extrabold">JUST MEATS</span>, we&apos;re
            proud to offer a delicious, ethically sourced product as a
            commitment to our customers.
          </div>
          <div className="flex sm:justify-start justify-center mt-[20px]">
            <NavLink end prefetch="intent" to="/about">
              <button className="bg-[#647160] text-white rounded-[4px] px-[24px] py-[12px] text-[16px] tracking-[0.8px]">
                LEARN MORE
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  )
}
