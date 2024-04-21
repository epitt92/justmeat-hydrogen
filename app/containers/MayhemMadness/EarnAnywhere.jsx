import React from 'react'

export const EarnAnywhere = () => {
  return (
      <section className='bg-[#222]'>
    <div
    className="flex flex-col items-center bg-brown-pattern w-[85%] md:w-[70%] mx-auto text-white left-0
                pt-[21px] pb-[18px] rounded-[6px]"
    style={{ boxShadow: '0px 32px 43px -8px rgba(0, 0, 0, 0.20)' }}
  >
    <div className="text-center text-[30px]  lg:text-[48px] font-bold mb-[3px] leading-tight px-4 sm:mb-[4px]">
      EARN ANYWHERE FROM
      <span className="text-yellow ml-[6px] sm:ml-[8px]">
        $5K - $10K
      </span>
    </div>
    <div className="text-center lg:text-[28px] text-[18px] font-bold px-4 lg:px-0 tracking-[3px] sm:mb-[16px] mb-[12px] leading-tight">
      IN ADDITIONAL REVENUE <br className="block sm:hidden" />
      IN AS LITTLE AS 3 MONTHS!
    </div>
    <div className="text-[14px] lg:text-[14px] text-center tracking-[3px] leading-[23px] text-[#ccbdb1]">
      CLAIM YOUR 6 FREE MEATS, <br className="block sm:hidden" />
      AND WE WILL SHOW YOU HOW
    </div>
  </div>
      </section>

  )
}