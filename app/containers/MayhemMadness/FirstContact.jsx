import ReactPlayer from 'react-player'
import { ContactForm } from './ContactForm'

import videoThumbnail from '~/assets/images/first-contact-video-thumbnail.png'
import videoPlayButton from '~/assets/images/video-play-button.png'

// https://player.vimeo.com/video/927773921?title=0&h=dab2c18ae7

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
            <iframe
              src="https://player.vimeo.com/video/927773921?title=0&h=dab2c18ae7"
              className="w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
              title="contact video 1"
            />

            {/* <img src={videoThumbnail} />
            <div className="absolute flex items-center justify-center w-full h-full">
              <button>
                <img src={videoPlayButton} />
              </button>
            </div> */}
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
