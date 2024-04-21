import bg_second_info_image_1 from "../../assets/images/bg-second-info-image-1.png"
import bg_second_info_image_2 from "../../assets/images/bg-second-info-image-2.png"
export const SecondInfo = () => (
  <section className="bg-[#efeeed]">
    <div className="flex flex-col md:flex-row justify-center w-full">
      <div className="flex flex-col basis-1/2 justify-center items-center ">
        <img className="w-full h-full md:max-h-[612px] pr-[15px] md:pr-0" src={bg_second_info_image_1} alt="" />
      </div>
      <div className="flex flex-col basis-1/2 justify-start items-center ">
            <div className="w-[90%] md:w-[85%] xl:w-[75%] text-center md:text-left">
                <h1 className="lg:text-[28px] xl:text-[36px] sm:text-[22px] text-[24px] font-bold tracking-[1px] text-[#231B19] sm:mb-[12px] mb-[7px] pt-5">THE PROBLEM</h1>
                <p className="text-[14px] leading-[23px] tracking-[3px] font-normal text-[#7A392D] sm:mb-[25px] mb-[14px]">EVERYONE HAS DIFFERENT GOALS, HOUSEHOLD SIZES, LIFESTYLES & EATING
                  HABITS/NUTRITION PLANS. NO MEAL PREP, OR RESTAURANT CAN SATISFY
                  EVERYTHING AT THE SAME TIME.
                </p>
            </div>
          <div className="w-[90%] md:w-[85%] xl:w-[75%] pb-8 md:pb-0">
          <div className="sm:px-[18px] sm:py-[25px] px-[20px] py-[16px] rounded-[8px] bg-[#e6e3e0] font-nunito text-black">
              <div className="flex items-start gap-[8px] sm:text-[18px] text-[16px]">
                <div className="sm:h-[27px] h-[26px] flex justify-center items-center">
                  <span className="w-[9px] h-[9px] rounded-full bg-black" />
                </div>
                Meal prep sucks and tastes gross!
              </div>
              <div className="flex items-start gap-[8px] sm:text-[18px] text-[16px]">
                <div className="sm:h-[27px] h-[26px] flex justify-center items-center">
                  <span className="w-[9px] h-[9px] rounded-full bg-black" />
                </div>
                Doesn&rsquo;t satisfy on flavor, texture, or variety!
              </div>
              <div className="flex items-start gap-[8px] sm:text-[18px] text-[16px]">
                <div className="sm:h-[27px] h-[26px] flex justify-center items-center">
                  <span className="w-[9px] h-[9px] rounded-full bg-black" />
                </div>
                It&rsquo;s expensive!
              </div>
              <div className="flex items-start gap-[8px] sm:text-[18px] text-[16px]">
                <div className="sm:h-[27px] h-[26px] flex justify-center items-center">
                  <span className="w-[9px] h-[9px] rounded-full bg-black" />
                </div>
                Eating out is unhealthy, expensive, & not family friendly.
              </div>
              <div className="flex items-start gap-[8px] sm:text-[18px] text-[16px]">
                <div className="sm:h-[27px] h-[26px] flex justify-center items-center">
                  <span className="w-[9px] h-[9px] rounded-full bg-black" />
                </div>
                All families, couples, & individuals eat differently.
              </div>
          </div>
          </div>
          
      </div>

    </div>
    <div className="flex flex-col md:flex-row-reverse justify-center w-full">
      <div className="flex flex-col basis-1/2 justify-center items-center ">
        <img className="w-full h-full md:max-h-[612px] pl-[15px] md:pl-0" src={bg_second_info_image_2} alt="" />
      </div>
      <div className="flex flex-col basis-1/2 justify-start items-center ">
            <div className=" w-[90%] md:w-[85%] xl:w-[75%] text-center md:text-left">
                <h1 className="lg:text-[28px] xl:text-[36px] sm:text-[22px] text-[24px] font-bold tracking-[1px] text-[#231B19] sm:mb-[12px] mb-[7px] pt-5">THE JUST MEATS SOLUTION</h1>
                <p className="text-[14px] leading-[23px] tracking-[3px] font-normal text-[#7A392D] sm:mb-[25px] mb-[14px]">EVERYONE EATS MEAT, SO NO MATTER WHAT STYLE OF NUTRITION PLAN YOU
              FOLLOW, OR THE SIZE OF YOUR HOUSEHOLD, JUST MEATS WORKS FOR YOU!
                </p>
            </div>
          <div className=" w-[90%] md:w-[85%] xl:w-[75%] pb-8 md:pb-0">
          <div className="sm:px-[18px] sm:py-[25px] px-[20px] py-[16px] rounded-[8px] bg-[#e6e3e0] font-nunito text-black flex flex-col gap-[10px]">
              <div className="sm:text-[18px] text-[16px] text-end">
                <div className="font-bold">CONVENIENCE</div>
                <div className="tracking-normal">
                  Delivered to your home and ready to serve in minutes
                </div>
              </div>
              <div className="sm:text-[18px] text-[16px] text-end">
                <div className="font-bold">TASTE</div>
                <div className="tracking-normal">
                  Delicately prepared and cooked by our master chefs
                </div>
              </div>
              <div className="sm:text-[18px] text-[16px] text-end">
                <div className="font-bold">VARIETY</div>
                <div className="tracking-normal">
                  Choose from 12 delicious flavors with new ones added fairly
                  regularly
                </div>
              </div>
              <div className="sm:text-[18px] text-[16px] text-end">
                <div className="font-bold">PRICE</div>
                <div className="tracking-normal">
                  Restaurant quality taste at a fraction of the price
                </div>
              </div>
            </div>
          </div>
          
      </div>

    </div>
  </section>
)
