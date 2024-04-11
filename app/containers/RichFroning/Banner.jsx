import { DeliveryTruck } from '~/icons/DeliveryTruck'

export const Banner = () => {
  return (
    <section className="relative sm:h-[calc(100vh-120px)] flex flex-col">
      <div className="relative flex-1">
        <div className="absolute top-0 left-0 w-full h-full bg-cover -z-10 bg-rich-froning-banner">
          kkk
        </div>
      </div>
      <div className="font-nunito text-[#EFEEED]">
        <div className="bg-[#231b19] py-[10px] text-[15px] leading-[33px] tracking-[3px] font-normal overflow-x-hidden">
          <div className="container-small flex justify-between sm:gap-0 gap-[67px]">
            <div>FAMILY</div>
            <div>FITNESS</div>
            <div>FAITH</div>
            <div>SERVICE</div>
            <div>CONVENIENCE</div>
            <div>TASTE</div>
            <div>VERIETY</div>
            <div>PRICE</div>
          </div>
        </div>
        <div className="bg-[#7A392D]">
          <div className="container-small sm:pt-[50px] sm:pb-[50px] pt-[44px] pb-[55px] grid sm:grid-cols-3 grid-cols-1 sm:gap-0 gap-[38px]">
            <div className="flex justify-center">
              <div className="flex sm:gap-[26px] gap-[17px]">
                <div className="sm:w-[54px] w-[52px]">
                  <DeliveryTruck />
                </div>
                <div>
                  <div className="text-[16px]">Meats delivered</div>
                  <div className="sm:text-[29px] text-[28px] font-bold font-dunbar">
                    1,006,928
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex sm:gap-[26px] gap-[17px]">
                <div className="sm:w-[54px] w-[52px]">
                  <DeliveryTruck />
                </div>
                <div>
                  <div className="text-[16px]">Pounds cooked</div>
                  <div className="sm:text-[29px] text-[28px] font-bold font-dunbar">
                    345,431 Lbs
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex sm:gap-[26px] gap-[17px]">
                <div className="sm:w-[54px] w-[52px]">
                  <DeliveryTruck />
                </div>
                <div>
                  <div className="text-[16px]">Happy customers</div>
                  <div className="sm:text-[29px] text-[28px] font-bold font-dunbar">
                    84,097
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
