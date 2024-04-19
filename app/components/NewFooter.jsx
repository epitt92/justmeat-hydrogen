import { NavLink, useMatches } from '@remix-run/react'

import { LogoWhite } from '~/icons/LogoWhite'

export const Footer = () => {
  const matches = useMatches()

  return (
    <footer className="bg-[#231b19]">
      <div className="container-small relative h-[88px] sm:h-[128px] flex items-center justify-between py-4">
        <div className="absolute-center">
          <NavLink to="/" end prefetch="intent">
            <div className="w-[148px] sm:w-[214px]">
              <LogoWhite />
            </div>
          </NavLink>
        </div>
      </div>
      {matches.at(-1).pathname === '/rich-froning' && (
        <div className="bg-lower-footer bg-cover text-center sm:[background-position-x:0] [background-position-x:-750px]">
          <div className="container-small relative text-[#EFEEED] sm:pt-[80px] sm:pb-[92px] pt-[113px] pb-[137px] lg:pl-0 lg:pr-0">
            <div className="sm:text-[18px] sm:leading-[26px] sm:tracking-[0.36px] text-[16px] leading-[150%] tracking-[0.48px] font-nunito sm:mb-[16px] mb-[18px]">
              “Nutrition is the foundation of Fitness, and the success of any
              training program starts in your kitchen. It takes time, and
              attention. But I love food, and I believe it&rsquo;s meant to be
              enjoyed. <span className="font-bold">JUST MEATS</span> has allowed
              me to eat delicious, high-quality protein at every meal, without
              compromising my responsibilities as a father, husband, business
              owner, and professional athlete.”
            </div>
            <div className="text-[16px] font-bold font-dunbar tracking-[0.8px]">
              RICH FRONING
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}
