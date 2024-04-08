import justmeatsBoxPart from '~/assets/images/justmeants-box-part.png'

import { Button } from '~/components/Button'

import videoThumbnail from '~/assets/images/second-contact-video-thumbnail.png'
import videoPlayButton from '~/assets/images/video-play-button.png'

export const SecondContact = () => {
  return (
    <section className="bg-[#efeeed] sm:pt-[110px] sm:pb-[25px] pt-[70px] pb-[32px] relative">
      <div className="container-1120">
        <div
          className="flex flex-col items-center bg-brown-pattern text-white sm:py-[45px] py-[22px] sm:rounded-[8px] rounded-[6px]"
          style={{ boxShadow: '0px 32px 43px -8px rgba(0, 0, 0, 0.20)' }}
        >
          <div className="text-[14px] text-center sm:text-left tracking-[3px] leading-[23px] text-[#ccbdb1]">
            PRE COOKED RESTAURANT QUALITY MEATS
          </div>
          <div className="sm:flex sm:text-[36px] sm:text-left text-center text-[24px] font-bold sm:mb-[4px] mb-[3px] leading-tight">
            AT GROCERY STORE PRICES
          </div>
        </div>
      </div>
      <img
        src={justmeatsBoxPart}
        className="absolute sm:w-auto w-[100px] sm:top-[-180px] top-[-4px] sm:left-0 left-[-25px]"
      />
      <div className="container-1120 sm:pt-[104px] pt-[62px]">
        <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-[55px] gap-[70px] items-end">
          <div className="flex flex-col justify-between aspect-square">
            <div className="sm:mb-0 mb-[24px]">
              <div className="xl:text-[14px] text-[12px] text-[#7A392D] font-normal text-center sm:mb-[6px] tracking-[3px]">
                CLAIM YOUR
              </div>
              <div className="xl:text-[36px] text-[24px] font-bold text-center">
                6 LBS OF FREE MEAT
              </div>
            </div>
            <div className="xl:pt-[46px] xl:pb-[36px] xl:px-[50px] pt-[30px] pb-[30px] px-[33px] rounded-[8px] bg-white flex flex-col items-start gap-[16px]">
              <input
                type="text"
                className="bg-[#efeeed] rounded-[4px] font-nunito text-[17px] font-bold lg:px-[17px] lg:py-[10px] px-[10px] py-[3px] border-none w-full"
                placeholder="Enter your name"
              />
              <input
                type="email"
                className="bg-[#efeeed] rounded-[4px] font-nunito text-[17px] font-bold lg:px-[17px] lg:py-[10px] px-[10px] py-[3px] border-none w-full"
                placeholder="Enter your email"
              />
              <input
                type="phone"
                className="bg-[#efeeed] rounded-[4px] font-nunito text-[17px] font-bold lg:px-[17px] lg:py-[10px] px-[10px] py-[3px] border-none w-full"
                placeholder="Enter your phone"
              />
              <textarea
                rows={3}
                className="bg-[#efeeed] rounded-[4px] font-nunito text-[17px] font-bold lg:px-[17px] lg:py-[10px] px-[10px] py-[3px] border-none w-full"
                placeholder="Enter your message"
              />
              <Button className="text-[16px] font-normal px-[24px] py-[12px] rounded-[4px] text-white bg-[#223661]">
                SUBMIT
              </Button>
            </div>
          </div>
          <div className="relative flex aspect-square">
            <img src={videoThumbnail} />
            <div className="absolute flex items-center justify-center w-full h-full">
              <button>
                <img src={videoPlayButton} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}