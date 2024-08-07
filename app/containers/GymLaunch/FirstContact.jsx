import videoThumbnail from '~/assets/images/first-contact-video-thumbnail.png'
import videoPlayButton from '~/assets/images/video-play-button.png'

import { ContactForm } from './ContactForm'

export const FirstContact = () => {
  return (
    <section className="relative bg-[#222222] text-white sm:pb-[80px] pb-[60px]">
      <div className="absolute w-full left-0 top-0 sm:h-full h-[730px] bg-[#121315]"></div>
      <div className="relative container-small">
        <div className="sm:text-[36px] text-[21px] font-bold text-center sm:mb-[96px] mb-[55px]">
          WORLD CLASS FITNESS JOINS WORLD CLASS NUTRITION
        </div>
        <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-[55px] gap-[52px] items-center justify-center">
          <div className="relative aspect-video border-[3px] border-solid border-white overflow-hidden">
            <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center">
              <iframe
                src="https://player.vimeo.com/video/937966988?h=83f08bf634&cc_load_policy=0"
                className="w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
                title="contact video 1"
              />
            </div>
          </div>
          <div className="flex flex-col justify-between aspect-square">
            <div className="sm:mb-0 mb-[24px]">
              <div className="xl:text-[14px] text-[12px] text-[#E47A0F] font-normal text-center sm:mb-[6px] tracking-[3px]">
                CLAIM YOUR
              </div>
              <div className="xl:text-[36px] text-[24px] font-bold text-center">
                6 LBS OF FREE MEAT
              </div>
            </div>
            <ContactForm formName="first" />
          </div>
        </div>
      </div>
    </section>
  )
}
