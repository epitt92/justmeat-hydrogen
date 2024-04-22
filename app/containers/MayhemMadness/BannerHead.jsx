import React from 'react'
import BannerCharacter from '~/assets/images/Copy-of-JustMeats_Partnerships_Stills_RichFroning_202MAR25_SethH-7.png'
import MayhemNationImage from '~/assets/images/Mayhem-Nation-W.png'
import BgBannerHead from '~/assets/images/BgBannerHead.png'

export const BannerHead = () => {
  return (
    <section className="bg-image bg-[url('../assets/images/BgBannerHead.png')] bg-cover bg-bottom">
        <div className='w-[80%] mx-auto'>
            <div className='flex flex-col md:flex-row pt-3'>
                <div className='basis-3/5'>
                    <div className='flex flex-col-reverse md:flex-col md:items-left'>
                        <div className="w-full md:w-[70%] h-auto ">
                            <img
                                className=""
                                src={MayhemNationImage}
                            />
                        </div>
                        <div className="py-8">
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
                </div>
               
                <div className='basis-2/5'>
                    <div className='w-full'>
                        <img
                            src={BannerCharacter}
                            className="w-full"
                            
                        />
                    </div>
                </div>
            </div>
        </div>
  </section>
  )
}
