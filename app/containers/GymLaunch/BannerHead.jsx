import React from 'react'
import BannerCharacter from '~/assets/images/Copy-of-JustMeats_Partnerships_Stills_RichFroning_202MAR25_SethH-7.png'
import GymLaunch from '~/assets/images/Gym_Launch_Logo_GoldWhite.png'
import JustMeatsLogo from '~/assets/images/justmeatslogoWhite.png'


export const BannerHead = () => {
  return (
    <section className="bg-[url('../assets/images/Gym_Banner1.png')] sm:[background-size:110%] [background-size:250%] bg-black bg-right bg-no-repeat">
        <div className="bg-[url('../assets/images/fade-gym_launch.png')] bg-no-repeat bg-transparent bg-left [background-size:80%_100%]">
        <div className='w-[80%] mx-auto'>
            <div className='flex flex-col md:flex-row pt-3'>
                <div className='basis-2/2'>
                    <div className='flex flex-col-reverse md:flex-col md:items-left md:pb-0 pb-[80px]'>
                        <div className="w-full md:w-[100%] h-auto  lg:pt-[100px] md:pt-[50px] max-w-[70%] sm:max-w-[100%] m-auto">
                            <img
                                className=""
                                src={GymLaunch}
                            />
                        </div>
                        <div className="w-full md:w-[100%] h-auto  lg:pt-[50px] md:pt-[50px] max-w-[70%] sm:max-w-[100%] m-auto mb-[30px]">
                            <img
                                className=""
                                src={JustMeatsLogo}
                            />
                        </div>
                        <div className="py-8">
                            <div className="font-nunito font-bold sm:text-[27px] text-[20px] text-yellow">
                            6 lbs of meat FOR FREE!
                            </div>
                            <div className="sm:text-[36px] font-bold text-white sm:leading-tight md:pb-[150px] text-[22px] [word-spacing:4px] sm:[word-spacing:0] leading-[42px]">
                            GYM LAUNCH EXCLUSIVE DEAL!
                                <br />
                                
                            </div>
                        </div>
                    </div>
                </div>
               
                <div className='basis-2/2'>
                    <div className='w-full'>
                        
                    </div>
                </div>
            </div>
        </div>
        </div>
  </section>
  )
}
