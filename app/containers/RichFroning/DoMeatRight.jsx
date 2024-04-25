import OrderButton from 'app/components/OrderButton'

import BuffaloIllustration from '~/assets/images/BuffaloIllustration.png'
import RichsPhoto1 from '~/assets/images/RichsPhoto1.png'
import RichsPhoto from '~/assets/images/RichsPhoto.png'
import TrayPhoto from '~/assets/images/TrayPhoto.png'

import { FaqAccordion } from './FaqAccordion'

export const DoMeatRight = () => {
  return (
    <section
      className="bg-[#efeeed] sm:pt-[10px]  sm:pb-[25px]  pb-[32px] relative"
      style={{ overflowX: 'hidden' }}
    >
      <div className="container-1120 z-50 relative w-[90%] sm:w-[80%] mx-auto">
        <div
          className="flex flex-col items-center bg-brown-pattern z-50 text-white sm:py-[45px] py-[22px] rounded-[8px]"
          style={{ boxShadow: '0px 32px 43px -8px rgba(0, 0, 0, 0.20)' }}
        >
          <div className="font-dunbar text-[14px] font-medium text-center sm:text-left tracking-[2.8px] leading-[23px] uppercase text-[#CCBDB1]">
            Do Meat Right
          </div>
          <div className="text-[#EFEEED] font-dunbar uppercase mt-2 px-3 sm:flex sm:text-[36px] sm:text-center text-center text-[24px] font-bold sm:mb-[4px] mb-[3px] leading-normal tracking-[1.8px] ">
            The hardest part of the meal is done
          </div>
          <div className="w-[70%] font-nunito text-center font-lg font-normal leading-[26px]  mt-4">
            No longer sacrifice flavor and quality for time and money. Now, you
            can have restaurant-quality meats on your table in minutes without
            the frustration and while honoring your budget.
          </div>
          <div className="py-8 mt-3">
            <OrderButton className="font-dunbar text-base font-medium leading-normal tracking-[0.8px] uppercase bg-[#EFEEED] hover:bg-[#f5f3f1] rounded-md text-[#7A392D] hover:text-[#8d3a2b]  " />
          </div>
        </div>
      </div>
      <img
        src={BuffaloIllustration}
        className="absolute top-[30%] scale-150 -left-[50px] sm:scale-100 z-10 sm:w-auto w-2/5 sm:top-[-427px]  sm:left-0 "
      />
      <img
        src={TrayPhoto}
        className="absolute z-10 sm:w-auto w-[250px] sm:top-[-122px] top-[-150px] sm:scale-100 sm:right-0 -right-[15%] scale-125 "
      />
      <div className="relative z-50 pt-12">
        <div className="font-dunbar uppercase sm:mt-8 mt-2 pb-8 text-[24px] sm:text-[36px] text-center  font-bold sm:mb-[4px] mb-[3px] leading-normal tracking-[1.8px]">
          YOU ASK. WE ANSWER.
        </div>
        <div className="relative z-50 w-[90%] xl:w-[50%] md:w-[70%] mx-auto pb-4  sm:pb-20">
          <FaqAccordion />
        </div>
        <img
          src={RichsPhoto}
          className="hidden sm:block absolute z-10 sm:w-auto w-[100px] bottom-[-25px]  left-0 "
        />
        <img
          src={RichsPhoto1}
          className="hidden sm:block absolute z-10 sm:w-[auto] w-[100px] h-[85%] bottom-[0px] right-0 "
        />
      </div>
    </section>
  )
}
