import ChefCooker from '~/assets/images/DanPhoto.png'

export const ChefCook = () => {
  return (
    <section className="relative bg-[#efeeed] text-white">
      <div className="relative">
        <div className="absolute w-full h-[87.6%] bottom-0 bg-[#121315]"></div>
        <div className="relative grid lg:grid-cols-2 grid-cols-1 gap-[62px] sm:gap-0">
          <div className="relative sm:px-0 px-[20px]">
            <div className="absolute sm:hidden block left-0 w-full h-[87.6%] bottom-0 bg-[#222222]"></div>
            <img
              className="relative w-full sm:rounded-none rounded-b-[8px]"
              src={ChefCooker}
            />
          </div>
          <div className="flex items-end">
            <div className="relative w-full sm:h-[87.5%] flex justify-center lg:block">
              <div className="lg:absolute max-w-[532px] w-full h-full lg:px-0 px-[20px] 2xl:pt-[53px] xl:pt-[30px] lg:pt-[30px] lg:pl-[64px] flex flex-col 2xl:gap-[26px] gap-[20px]">
                <div className="sm:text-[36px] text-[24px] font-bold tracking-[2px]">
                  FARM - TO - TABLE FRESH
                </div>
                <div className="sm:text-[18px] text-[16px] sm:leading-[26px] leading-[25px] font-nunito">
                  <span className="font-bold">JUST MEATS</span> is committed to
                  ethical sourcing. Our meats are sourced from local farms where
                  animals are raised in humane, stress-free environments,
                  allowing us to provide not only healthier choices but also
                  support sustainable farming practices.
                  <br />
                  <br />
                  We believe in the transparency of our supply chain, from the
                  lush pastures to your plate. This farm-to-table approach not
                  only enhances the flavor and quality of our meats but also
                  aligns with our values of honesty, health, and sustainability.
                  <br />
                  <br />
                  At JUST MEATS, we&apos;re proud to offer a delicious,
                  ethically sourced product as a commitment to our customers.
                </div>
                <div>
                  <div className="sm:text-[36px] text-[24px] font-bold tracking-[2px] 2xl:mb-[28px] xl:mb-[20px] mb-[28px]">
                    GRASS FED & FINISHED
                  </div>
                  <div className="text-[#E47A0F] sm:text-[14px] sm:leading-[22px] text-[12px] leading-[23px] font-nunito font-bold">
                    <span className="text-white">NEVER ANY: </span>ARTIFICIAL
                    COLORS, ARTIFICIAL FLAVORS, ANTI BIOTICS, HORMONES, OR SEED
                    OILS.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="2xl:h-0 xl:h-[100px] lg:h-[240px] bg-[#121315]"></div>
    </section>
  )
}
