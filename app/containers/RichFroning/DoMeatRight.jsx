import TrayPhoto from '~/assets/images/TrayPhoto.png'
import BuffaloIllustration from "~/assets/images/BuffaloIllustration.png"
import RichsPhoto from "~/assets/images/RichsPhoto.png"
import RichsPhoto1 from "~/assets/images/RichsPhoto1.png"
import {FaqAccordion} from './FaqAccordion'
import OrderButton from 'app/components/OrderButton'
export const DoMeatRight = () => {
  return (
    <section className="bg-[#efeeed] sm:pt-[10px]  sm:pb-[25px] pt-[70px] pb-[32px] relative">
      <div className="container-1120 z-50 relative w-[90%] sm:w-[80%] mx-auto">
        <div
          className="flex flex-col items-center bg-brown-pattern z-50 text-white sm:py-[45px] py-[22px] sm:rounded-[8px] rounded-[6px]"
          style={{ boxShadow: '0px 32px 43px -8px rgba(0, 0, 0, 0.20)' }}
        >
          <div className="text-[14px] font-medium text-center sm:text-left tracking-[3px] leading-[23px] uppercase text-[#ccbdb1]">
          Do Meat Right
          </div>
          <div className="font-dunbar uppercase mt-2 px-3 sm:flex sm:text-[36px] sm:text-left text-center text-[24px] font-bold sm:mb-[4px] mb-[3px] leading-tight">
          The hardest part of the meal is done
          </div>
          <div className="w-[70%] text-center font-nunito mt-4">
                No longer sacrifice flavor and quality for time and money. Now, you can have restaurant-quality meats on your table in minutes without the frustration and while honoring your budget.
          </div>
          <div className="py-8 mt-3">
              <OrderButton className="bg-[#EFEEED] hover:bg-[#f5f3f1] rounded-md text-[#7A392D] hover:text-[#8d3a2b]  "/>
            </div>
        </div>
      </div>
      <img
        src={BuffaloIllustration}
        className="absolute z-10 sm:w-auto w-[100px] top-[-427px]  left-0 "
      />
      <img
        src={TrayPhoto}
        className="absolute z-10 sm:w-auto w-[100px] sm:top-[-122px] top-[-4px] right-0 "
      />
    <div className='relative z-50 pt-12'>
        <div className='font-dunbar uppercase mt-8 pb-8  sm:text-[36px] text-center text-[24px] font-bold sm:mb-[4px] mb-[3px] leading-normal tracking-[1.8px]'>YOU ASK. WE ANSWER.</div>
        <div className="relative z-50 w-[90%] sm:w-[50%] mx-auto pb-20">
              <FaqAccordion />

        </div>
        <img
        src={RichsPhoto}
        className="absolute z-10 sm:w-auto w-[100px] bottom-[-25px]  left-0 "
      />
      <img
        src={RichsPhoto1}
        className="absolute z-10 sm:w-[auto] w-[100px] h-[85%] bottom-[0px] right-0 "
      />
    </div>
    </section>
  )
}

