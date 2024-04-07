import { Image } from '@shopify/hydrogen'
import { Button } from '~/components/Button'

import videoThumbnail from '~/assets/images/first-contact-video-thumbnail.png'
import videoPlayButton from '~/assets/images/video-play-button.png'

export const FirstContact = () => {
  return (
    <section className="relative bg-[#222222] text-white sm:pb-[80px] pb-[60px]">
      <div className="absolute w-full left-0 top-0 sm:h-full h-[730px] bg-us-flag bg-cover"></div>
      <div className="relative container-1120">
        <div className="sm:text-[36px] text-[24px] font-bold text-center sm:mb-[96px] mb-[55px]">
          WORLD CLASS FITNESS JOINS WORLD CLASS NUTRITION
        </div>
        <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-[55px] gap-[52px] items-end">
          <div className="relative flex aspect-square border-[3px] border-solid border-white">
            <Image src={videoThumbnail} />
            <div className="absolute flex items-center justify-center w-full h-full">
              <button>
                <Image src={videoPlayButton} />
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-between aspect-square">
            <div className="sm:mb-0 mb-[24px]">
              <div className="xl:text-[14px] text-[12px] text-[#E47A0F] font-normal text-center sm:mb-[6px]">
                CLAIM YOUR
              </div>
              <div className="xl:text-[36px] text-[24px] font-bold text-center">
                6 LBS OF FREE MEAT
              </div>
            </div>
            <div className="xl:pt-[46px] xl:pb-[36px] xl:px-[50px] pt-[30px] pb-[30px] px-[33px] rounded-[8px] bg-[#ffffff25] flex flex-col items-start gap-[16px]">
              <input
                type="text"
                className="bg-[#222] rounded-[4px] font-nunito text-[17px] font-bold lg:px-[17px] lg:py-[10px] px-[10px] py-[3px] border-none w-full"
                placeholder="Enter your name"
              />
              <input
                type="email"
                className="bg-[#222] rounded-[4px] font-nunito text-[17px] font-bold lg:px-[17px] lg:py-[10px] px-[10px] py-[3px] border-none w-full"
                placeholder="Enter your email"
              />
              <input
                type="phone"
                className="bg-[#222] rounded-[4px] font-nunito text-[17px] font-bold lg:px-[17px] lg:py-[10px] px-[10px] py-[3px] border-none w-full"
                placeholder="Enter your phone"
              />
              <textarea
                rows={3}
                className="bg-[#222] rounded-[4px] font-nunito text-[17px] font-bold lg:px-[17px] lg:py-[10px] px-[10px] py-[3px] border-none w-full"
                placeholder="Enter your message"
              />
              <Button className="text-[16px] font-normal px-[24px] py-[12px] rounded-[4px] text-white bg-[#223661]">
                SUBMIT
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
