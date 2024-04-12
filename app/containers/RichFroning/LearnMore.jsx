import { NavLink } from '@remix-run/react'

export const LearnMore = () => {
  return (
    <section className="grid sm:grid-cols-2 grid-cols-1 sm:h-[719px] relative font-dunbar">
      <div className="bg-rich-froning-learn-more bg-cover sm:h-auto h-[407px] sm:order-first order-last"></div>
      <div className="bg-rich-froning-learn-more-lightPattern1 bg-cover">
        <div className="sm:pt-[110px] pt-[62px] sm:pb-0 pb-[40px] sm:pl-[66px] text-[#231B19] sm:pr-0 pl-[18px] pr-[18px] sm:max-w-[512px]">
          <div className="sm:text-[36px] text-[24px] sm:tracking-[1.8px] tracking-[1.2px] font-bold sm:mb-[26px] mb-[17px]">
            FARM - TO - TABLE FRESH
          </div>
          <div className="font-nunito sm:text-[18px] text-[16px] sm:leading-[26px] leading-[25px] sm:mb-[39px] mb-[24px]">
            <span className="font-bold">JUST MEATS</span> is committed to
            ethical sourcing. Our meats are sourced from local farms where
            animals are raised in humane, stress-free environments, allowing us
            to provide not only healthier choices but also support sustainable
            farming practices. We believe in the transparency of our supply
            chain, from the lush pastures to your plate. This farm-to-table
            approach not only enhances the flavor and quality of our meats but
            also aligns with our values of honesty, health, and sustainability.
            At <span className="font-bold">JUST MEATS</span>, we&apos;re proud
            to offer a delicious, ethically sourced product as a commitment to
            our customers.
          </div>
          <div className="flex sm:justify-start justify-center">
            <NavLink end prefetch="intent" to="/about">
              <button className="bg-[#647160] text-white rounded-[4px] px-[24px] py-[12px] text-[16px] tracking-[0.8px]">
                LEARN MORE
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  )
}
