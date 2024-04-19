import BannerCharacter from '~/assets/images/Copy-of-JustMeats_Partnerships_Stills_RichFroning_202MAR25_SethH-7.png'
import MayhemNationImage from '~/assets/images/Mayhem-Nation-W.png'
export const Banner = () => {
  return (
    <section className="relative">
      <div className="banner bg-cover sm:h-[calc(100vh-120px)] h-[820px]"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="relative h-full container-small">
          <div className="relative h-full">
            <div className="sm:h-[40px] h-[15px]"></div>
            <div className="flex flex-col-reverse sm:flex-col-reverse lg:flex-col sm:gap-[0] lg:gap-[66px] ">
              <div className="w-[340px] sm:w-[520px] md:w-[663px] lg:w-[550px] h-[150px] sm:h-[200px] md:h-[240px] sm:mx-auto lg:mx-0">
                <img
              className=""
              src={MayhemNationImage}
            />
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
            <div className="relative w-full sm:flex sm:justify-center sm:items-center lg:absolute lg:w-auto lg:right-[100px] lg:translate-x-0 lg:bottom-[60px] flex justify-center items-center">
              <img
                src={BannerCharacter}
                className="w-[90%] sm:w-auto sm:max-w-[400px] h-auto"
                style={{ maxWidth: '400px' }} // Ensures max-width is respected on all screen sizes
              />
            </div>

            {/*<div*/}
            {/*  className="flex flex-col items-center bg-brown-pattern relative lg:absolute w-full sm:bottom-[100px] lg:bottom-[-84px] left-0 text-white bottom-[-120px]  sm:pt-[28px] pt-[21px] sm:pb-[24px] pb-[18px] sm:rounded-[8px] rounded-[6px]"*/}
            {/*  style={{ boxShadow: '0px 32px 43px -8px rgba(0, 0, 0, 0.20)' }}*/}
            {/*>*/}
            <div
              className="flex flex-col items-center bg-brown-pattern relative w-full text-white left-0
    pt-[21px] pb-[18px] rounded-[6px]
    sm:(pt-[28px] pb-[24px] rounded-[8px] bottom-[100px])
    lg:absolute lg:bottom-[-84px] lg:left-0 lg:w-full lg:pt-[21px] lg:pb-[18px] lg:rounded-[6px]"
              style={{ boxShadow: '0px 32px 43px -8px rgba(0, 0, 0, 0.20)' }}
            >
              <div className="text-center text-[30px]  lg:text-[48px] font-bold mb-[3px] leading-tight px-4 sm:mb-[4px]">
                EARN ANYWHERE FROM
                <span className="text-yellow ml-[6px] sm:ml-[8px]">
                  $5K - $10K
                </span>
              </div>
              <div className="text-center lg:text-[28px] text-[18px] font-bold px-4 lg:px-0 tracking-[3px] sm:mb-[16px] mb-[12px] leading-tight">
                IN ADDITIONAL REVENUE <br className="block sm:hidden" />
                IN AS LITTLE AS 3 MONTHS!
              </div>
              <div className="text-[14px] lg:text-[14px] text-center tracking-[3px] leading-[23px] text-[#ccbdb1]">
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
