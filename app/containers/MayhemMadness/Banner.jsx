import BannerCharacter from '~/assets/images/Copy-of-JustMeats_Partnerships_Stills_RichFroning_202MAR25_SethH-7.png'
import { MayhemNation } from '~/icons/MayhemNation'

export const Banner = () => {
  return (
    <section className="relative">
      <div className="banner bg-cover sm:h-[calc(100vh-120px)] h-[820px]"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="relative h-full container-small">
          <div className="relative h-full">
            <div className="sm:h-[40px] h-[15px]"></div>
            <div className="flex flex-col-reverse sm:flex-col sm:gap-[66px] gap-0">
              <div className="w-[340px] sm:w-[663px] lg:w-[550px] h-[240px]">
                <MayhemNation />
              </div>
              <div className="">
                <div className="font-nunito font-bold sm:text-[27px] text-[20px] text-yellow">
                  6 lbs of meat FOR FREE!
                </div>
                <div className="sm:text-[36px] text-[27px] font-bold text-white leading-tight">
                  MAYHEM AFFILIATE
                  <br />
                  OWNERS ONLY!
                </div>
              </div>
            </div>
            <div className="absolute sm:w-auto w-[400px] sm:right-[100px] sm:translate-x-0 -translate-x-1/2 left-1/2 sm:bottom-[60px] bottom-[120px]">
              <img src={BannerCharacter} />
            </div>
            <div
              className="flex flex-col items-center bg-brown-pattern absolute w-full sm:bottom-[-84px] left-0 text-white bottom-[-120px] sm:pt-[28px] pt-[21px] sm:pb-[24px] pb-[18px] sm:rounded-[8px] rounded-[6px]"
              style={{ boxShadow: '0px 32px 43px -8px rgba(0, 0, 0, 0.20)' }}
            >
              <div className="sm:flex sm:text-[48px] sm:text-left text-center text-[36px] font-bold sm:mb-[4px] mb-[3px] leading-tight">
                EARN ANYWHERE FROM
                <span className="text-yellow ml-[6px] sm:ml-[8px]">
                  $5K - $10K
                </span>
              </div>
              <div className="sm:text-[28px] text-[21px] text-center sm:text-left font-bold tracking-[3px] sm:mb-[16px] mb-[12px] leading-tight">
                IN ADDITIONAL REVENUE <br className="block sm:hidden" />
                IN AS LITTLE AS 3 MONTHS!
              </div>
              <div className="text-[14px] text-center sm:text-left tracking-[3px] leading-[23px] text-[#ccbdb1]">
                CLAIM YOUR 6 FREE MEATS, <br className="block sm:hidden" />
                AND WE WILL SHOW YOU HOW
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
