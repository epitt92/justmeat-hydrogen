import React from 'react'

export const CustomerReviews = () => {
  return (
    <section className="bg-[#EFEEED] text-[#231B19] pb-8 sm:pt-[98px] pt-[62px]">
      <div className="">
        <div className="mx-auto text-center mb-3">
          <h2 className="font-dunbar text-[#231B19] text-[36px] font-bold uppercase px-[10px] py-[0]">
            What JUST MEATS customers are Cooking up
          </h2>
        </div>
        <div className="customer-reviews px-3">
          <div id="looxReviews" data-loox-aggregate></div>
        </div>
      </div>
    </section>
  )
}
