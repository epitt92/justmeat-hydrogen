import React from 'react'

const Passion = () => {
  return (
    <section className="bg-white text-[#000] pt-10 pb-28">
      <div className="w-[85%] mx-auto">
        <div className="flex flex-col md:flex-row justify-center gap-0 md:gap-[30px] w-full">
          <div className=" md:basis-2/6 justify-start ">
            <h1 className="font-Roboto text-[30px] sm:text-8 md:text-[30px] font-bold leading-[36.415px] md:leading-[40px] lg:leading-[60px] -tracking-[0.6px] md:tracking-[-1.12px]  text-[#061C3D] mb-2">
              Born from a Passion
            </h1>
            <p className="font-Roboto text-[16px] font-normal leading-[24px] text-[#42526B] mb-[24px]">
              Just Meats was born from a passion to bring no-nonsense, delicious
              proteins to the masses! Prepping clean protein every week can be
              challenging, expensive, and time-consuming. Our precooked meat
              promises a healthy, easy solution for those protein-related
              problems faced on a daily basis.
            </p>
          </div>
          <div className=" md:basis-4/6 justify-center items-center">
            <img
              src="https://cdn.shopify.com/s/files/1/0555/1751/1961/files/Image_3.png?v=1697582302"
              className="object-fill object-center h-[100%] lg:h-auto  max-w-full "
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:flex-row-reverse justify-center gap-0 md:gap-[30px] w-full mt-[35px] md:mt-[65px]">
          <div className="flex flex-col md:basis-2/6 justify-start ">
            <h1 className="font-Roboto text-[30px] sm:text-8 md:text-[30px] font-bold leading-[36.415px] md:leading-[40px] lg:leading-[60px] -tracking-[0.6px] md:tracking-[-1.12px]  text-[#061C3D] mb-2">
              Real MeatReal Ranches
            </h1>
            <p className="font-Roboto text-[16px] font-normal leading-[24px] text-[#42526B] mb-[24px]">
              Our beef, chicken, and pork are locally sourced from ranches in
              Utah (where our production facility is located). Sage Valley Ranch
              is family-operated and has been around for 175 years. They take
              great pride in humane animal treatment and promise grass-fed, 100%
              natural meat from animals. This quality protein means fresh and
              tender meat that is rich in flavor.
            </p>
          </div>
          <div className="flex flex-col md:basis-4/6 justify-center items-center">
            <img
              src="https://cdn.shopify.com/s/files/1/0555/1751/1961/files/Group_4643_1c0821c1-1a1a-439e-b3e5-4410661bb20b.png?v=1697581968"
              className="object-fill object-center h-[100%] lg:h-auto max-w-full "
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-0 md:gap-[30px] w-full mt-[35px] md:mt-[65px]">
          <div className="flex flex-col md:basis-2/6 justify-start ">
            <h1 className="font-Roboto text-[30px] sm:text-8 md:text-[30px] font-bold leading-[36.415px] md:leading-[40px] lg:leading-[60px] -tracking-[0.6px] md:tracking-[-1.12px]  text-[#061C3D] mb-2">
              Farm to Table Life
            </h1>
            <p className="font-Roboto text-[16px] font-normal leading-[24px] text-[#42526B] mb-[24px]">
              Once it enters the production facility, the meat is hand trimmed,
              seasoned and cooked in a variety of ways that keep your tastebuds
              excited! We incorporate cooking styles and dishes from around the
              world like Texas-style brisket, Latin-inspired pollo asado, and
              the popular Kālua pork from Hawaii. There are never any added
              colors or artificial flavors – just clean ingredients that keep
              you feeling good, full, and fueled.
            </p>
          </div>
          <div className="flex flex-col md:basis-4/6 justify-center items-center">
            <img
              src="https://cdn.shopify.com/s/files/1/0555/1751/1961/files/Image_2.png?v=1697581968"
              className="object-fill object-center h-[100%] lg:h-auto max-w-full "
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Passion
