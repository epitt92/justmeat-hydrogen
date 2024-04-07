import { Cooking } from '~/icons/Cooking'
import { SmilingSun } from '~/icons/SmilingSun'
import { Weighter } from '~/icons/Weighter'
import { MeatRecycle } from '~/icons/MeatRecycle'

export const FirstInfo = () => {
  return (
    <section>
      <div className="bg-[#222222] sm:pb-[100px] pb-[66px]">
        <div className="container relative">
          <div className="flex justify-center sm:mb-[6px]">
            <div className="sm:w-[512px] sm:text-[14px] text-[12px] font-normal text-[#E47A0F] tracking-[3px]">
              LEARN HOW YOU CAN EARN ANYWHERE FROM{' '}
              <span className="text-white">$5K - $10K</span> IN ADDITIONAL
              REVENUE IN AS LITTLE AS 3 MONTHS!
            </div>
          </div>
          <div className="sm:text-[36px] text-[24px] font-bold text-center text-white">
            CLAIM YOUR 6 FREE MEATS, AND WE WILL SHOW YOU HOW
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="absolute w-full sm:h-1/2 h-[calc((100%-12px)/4)] bg-[#222222]"></div>
        <div className="container relative">
          <div className="w-full grid sm:grid-cols-4 grid-cols-2 sm:gap-[20px] gap-[12px]">
            <div
              className="aspect-[23/25] rounded-[8px] bg-white flex flex-col justify-end items-center sm:pt-[30px] pt-[25px] sm:pb-[50px] pb-[30px]"
              style={{ boxShadow: '0px 40px 45px -14px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="flex items-center flex-1">
                <div className="sm:w-[112px] w-[72px]">
                  <Cooking />
                </div>
              </div>
              <div className="sm:text-[36px] text-[23px] font-bold tracking-[2px] sm:mb-[22px] mb-[14px]">
                1,006,928
              </div>
              <div className="sm:text-[14px] text-[12px] text-[#7A392D] font-bold tracking-[3px]">
                MEATS SOLD
              </div>
            </div>
            <div
              className="aspect-[23/25] rounded-[8px] bg-white flex flex-col justify-end items-center sm:pt-[30px] pt-[25px] sm:pb-[50px] pb-[30px]"
              style={{ boxShadow: '0px 40px 45px -14px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="flex items-center flex-1">
                <div className="sm:w-[76px] w-[50px]">
                  <SmilingSun />
                </div>
              </div>
              <div className="sm:text-[36px] text-[23px] font-bold tracking-[2px] sm:mb-[22px] mb-[14px]">
                84,097
              </div>
              <div className="sm:text-[14px] text-[12px] text-[#7A392D] font-bold tracking-[3px]">
                CUSTOMERS
              </div>
            </div>
            <div
              className="aspect-[23/25] rounded-[8px] bg-white flex flex-col justify-end items-center sm:pt-[30px] pt-[25px] sm:pb-[50px] pb-[30px]"
              style={{ boxShadow: '0px 40px 45px -14px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="flex items-center flex-1">
                <div className="sm:w-[68px] w-[43px]">
                  <Weighter />
                </div>
              </div>
              <div className="sm:text-[36px] text-[23px] font-bold tracking-[2px] sm:mb-[22px] mb-[14px]">
                345,431 LBS
              </div>
              <div className="sm:text-[14px] text-[12px] text-[#7A392D] font-bold tracking-[3px]">
                COOKED MEATS
              </div>
            </div>
            <div
              className="aspect-[23/25] rounded-[8px] bg-white flex flex-col justify-end items-center sm:pt-[30px] pt-[25px] sm:pb-[50px] pb-[30px]"
              style={{ boxShadow: '0px 40px 45px -14px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="flex items-center flex-1">
                <div className="sm:w-[66px] w-[42px]">
                  <MeatRecycle />
                </div>
              </div>
              <div className="sm:text-[36px] text-[23px] font-bold tracking-[2px] sm:mb-[22px] mb-[14px]">
                14,000+
              </div>
              <div className="sm:text-[14px] text-[12px] text-[#7A392D] font-bold tracking-[3px]">
                SUBSCRIPTIONS
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
