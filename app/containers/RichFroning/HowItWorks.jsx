import { NavLink } from '@remix-run/react'
import { HowItWorksStepsSlider } from '~/components/HowItWorksStepsSlider'
import { QualitySeal } from '~/icons/QualitySeal'

export const HowItWorks = () => {
  return (
      <section
        className="relative bg-[#efeeed] sm:py-[110px] py-[70px] bg-no-repeat sm:bg-[url(https://cdn.shopify.com/s/files/1/0672/4776/7778/files/richs-photo.png?v=1713377936)] bg-none overflow-hidden"
        style={{
          backgroundSize: '32%',
          backgroundPositionY: '-175px'
        }}
      >
      <div className="relative w-full max-w-[1120px] mx-auto my-0 sm:px-[20px] py-0">
        <div className="w-[133px] absolute top-[60px] right-[-20px] z-10 sm:block hidden">
          <QualitySeal />
        </div>
        <div
          className="bg-yellow-pattern flex flex-col items-center sm:rounded-[8px] sm:pt-[62px] pt-[54px] sm:pb-[60px] pb-[60px] overflow-x-hidden relative"
          style={{
            boxShadow: '0px 49px 79.1px -32px rgba(0, 0, 0, 0.25)',
          }}
        >
          <div className="sm:text-[14px] font-normal leading-[23px] sm:tracking-[2.8px] text-[12px] tracking-[2.8px] text-[#7A392D] text-center font-dunbar">
            HOW JUST MEATS WORKS
          </div>
          <div className="text-center sm:text-[36px] text-[24px] font-bold leading-tight sm:tracking-[1.8px] tracking-[1.2px] sm:mb-[20px] mb-[17px] font-dunbar">
            THE ULTI-MEAT EXPERIENCE
          </div>
          <div className="max-w-[645px] text-[#231b19] text-center sm:text-[18px] text-[16px] font-normal sm:leading-[26px] leading-[25px] tracking-[0.16px] font-nunito sm:mb-[43px] mb-[35px] sm:px-0 px-[12px]">
            Here&rsquo;s how having
            <span className="font-bold"> JUST MEATS </span>delivered to your
            door changes the game. Our meats marinate on the way to your door
            and our innovative Cooking Sauce preserves the moisture and finishes
            the meat with an infusion of flavor.
          </div>
          <div className="text-[#EFEEED]">
            <HowItWorksStepsSlider />
          </div>
          <div className="flex justify-center sm:gap-[20px] gap-[8px] text-[#EFEEED]">
            <NavLink end prefetch="intent" to="/about">
              <button className="px-[24px] py-[12px] rounded-[4px] bg-[#7A392D] tracking-[1px]">
                HOW IT WORKS
              </button>
            </NavLink>
            <NavLink end prefetch="intent" to="/products/custom-bundle">
              <button className="px-[24px] py-[12px] rounded-[4px] bg-[#637160] tracking-[1px]">
                ORDER NOW
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  )
}
