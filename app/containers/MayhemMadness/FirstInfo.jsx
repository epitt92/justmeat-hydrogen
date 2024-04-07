import { Cooking } from '~/icons/Cooking'
import { SmilingSun } from '~/icons/SmilingSun'
import { Weighter } from '~/icons/Weighter'
import { MeatRecycle } from '~/icons/MeatRecycle'

import mayhemNation from '~/assets/images/mayhem-nation-1.png'
import justmeatsBlack from '~/assets/images/justmeats-black.png'
import traningCommunityNutrition from '~/assets/images/traning-community-nutrition.png'
import skillet from '~/assets/images/Skillet.png'

export const FirstInfo = () => {
  return (
    <section className="bg-[#efeeed] overflow-x-hidden">
      <div className="bg-[#222222] sm:pb-[100px] pb-[66px]">
        <div className="relative container-1120">
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
        <div className="absolute w-full sm:h-1/2 h-[calc((100%-12px)/4)] bg-[#222222]">
          <img
            className="absolute sm:top-[-130px] top-[-110px] sm:right-[-30px] right-0 sm:w-auto w-[148px]"
            src={skillet}
          />
        </div>
        <div className="relative container-1120">
          <div className="w-full grid sm:grid-cols-4 grid-cols-2 sm:gap-[20px] gap-[12px]">
            <div
              className="aspect-[23/25] rounded-[8px] bg-white flex flex-col justify-end items-center sm:pt-[18px] pt-[12px] sm:pb-[50px] pb-[30px]"
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
              className="aspect-[23/25] rounded-[8px] bg-white flex flex-col justify-end items-center sm:pt-[18px] pt-[12px] sm:pb-[50px] pb-[30px]"
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
              className="aspect-[23/25] rounded-[8px] bg-white flex flex-col justify-end items-center sm:pt-[18px] pt-[12px] sm:pb-[50px] pb-[30px]"
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
              className="aspect-[23/25] rounded-[8px] bg-white flex flex-col justify-end items-center sm:pt-[18px] pt-[12px] sm:pb-[50px] pb-[30px]"
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
      <div className="sm:pt-[98px] pt-[62px]">
        <div className="container-1120">
          <div className="sm:text-[36px] text-[24px] font-bold tracking-[2px] text-center sm:mb-[100px] mb-[52px]">
            <div>A SUCCESFUL GYM...</div>
            <div>IS DETERMINED BY THE RESULTS IT DELIVERS ITS MEMBERS</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3">
            <div className="sm:h-[225px] h-[260px] flex flex-col justify-end">
              <div className="flex-1 sm:mb-[15px] mb-[27px] flex justify-center items-center">
                <div className="w-[260px]">
                  <img src={mayhemNation} />
                </div>
              </div>
              <div className="text-[14px] leading-[24px] tracking-[2px] font-normal text-center max-w-[304px]">
                <div className="opacity-0">EMPTY STRING TO MATCH HEIGHT</div>
                TAKES CARE OF THE FITNESS PROGRAMMING TO DELIVER OPTIMAL RESULTS
                INSIDE THE GYM{' '}
              </div>
            </div>
            <div className="sm:h-[225px] h-[260px] flex flex-col justify-end">
              <div className="flex-1 sm:mb-[15px] mb-[27px] flex justify-center items-center">
                <div className="text-[60px] tracking-[2px] font-bold">YOU</div>
              </div>
              <div className="text-[14px] leading-[24px] tracking-[2px] font-normal text-center max-w-[300px]">
                YOUR COACHING, YOUR PERSONALITY, YOUR GROUP OF MEMBERS BUILD THE
                COMMUNITY YOUR MEMBERS NEED
              </div>
            </div>
            <div className="sm:h-[225px] h-[260px] flex flex-col justify-end">
              <div className="flex-1 sm:mb-[15px] mb-[27px] flex justify-center items-center">
                <div className="w-[362px]">
                  <img src={justmeatsBlack} />
                </div>
              </div>
              <div className="text-[14px] leading-[24px] tracking-[2px] font-normal text-center max-w-[336px]">
                THE ONLY NUTRITION SOLUTION YOU NEED IN ORDER TO FUEL YOUR
                MEMBERS WORKOUTS, ENABLE THEM TO RECOVER, AND SUPPORT ALL THEIR
                GOALS
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:py-[104px] py-[64px] overflow-x-hidden relative">
        <div className="w-[2520px] ml-[-880px]">
          <img src={traningCommunityNutrition} />
        </div>
      </div>
    </section>
  )
}