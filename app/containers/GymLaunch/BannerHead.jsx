import React from 'react'
import BannerCharacter from '~/assets/images/Copy-of-JustMeats_Partnerships_Stills_RichFroning_202MAR25_SethH-7.png'
import GymLaunch from '~/assets/images/Gym_Launch_Logo_GoldWhite.png'
import JustMeatsLogo from '~/assets/images/justmeatslogoWhite.png'


export const BannerHead = () => {
  return (
    <section className="bg-[url('../assets/images/Gym_Banner.png')] bg-cover bg-black bg-center">
        <div className='w-[80%] mx-auto'>
            <div className='flex flex-col md:flex-row pt-3'>
                <div className='basis-1/3'>
                    <div className='flex flex-col-reverse md:flex-col md:items-left'>
                        <div className="w-full md:w-[100%] h-auto  lg:pt-[100px] md:pt-[50px]">
                            <img
                                className=""
                                src={GymLaunch}
                            />
                        </div>
                        <div className="w-full md:w-[100%] h-auto  lg:pt-[50px] md:pt-[50px]">
                            <img
                                className=""
                                src={JustMeatsLogo}
                            />
                        </div>
                        <div className="py-8">
                            <div className="font-nunito font-bold sm:text-[27px] text-[20px] text-yellow">
                            6 lbs of meat FOR FREE!
                            </div>
                            <div className="sm:text-[36px] text-[27px] font-bold text-white leading-tight md:pb-[50px]">
                            FOR FREE GYM LAUNCH
                                <br />
                            SECRETS EXCLUSIVE DEAL!
                            </div>
                        </div>
                    </div>
                </div>
               
                <div className='basis-2/3'>
                    <div className='w-full'>
                        
                    </div>
                </div>
            </div>
        </div>
  </section>
  )
}
