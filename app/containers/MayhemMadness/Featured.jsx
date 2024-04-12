import { useState } from 'react'

import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useLoaderData } from '@remix-run/react'

const swiperBreakpoints = {
  360: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  768: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  1024: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  1440: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
}

const sliderItemColors = ['#572d2d', '#7b4931', '#323e47', '#9d6938']

export const Featured = () => {
  const { collections } = useLoaderData()

  const [collection, setCollection] = useState(collections[0])

  const slides = {}

  for (const el of collections) {
    slides[el.id] = el.products.nodes.map((product, index) => (
      <SwiperSlide key={index}>
        <div className="relative flex flex-col aspect-square mt-[24%] mb-[20%]">
          <div
            className="relative px-[25px] pt-[12%] pb-[8%] rounded-t-[8px] h-[69%] flex text-white"
            style={{ backgroundColor: sliderItemColors[index % 4] }}
          >
            <div className="relative flex items-end justify-center flex-1">
              <div className="absolute w-[80%] top-0 -translate-y-1/2">
                <img src={product.images.nodes[1].url} className="rotate-90" />
              </div>
              <div className="xl:mb-[2%]">Everyday Meats</div>
            </div>
          </div>
          <div className="flex-1 bg-white py-[22px] px-[10px] flex justify-center items-center text-[20px] rounded-b-[8px] font-bold tracking-normal">
            {product.title}
          </div>
        </div>
      </SwiperSlide>
    ))
  }

  return (
    <section className="bg-[#222222]  pt-[120px] sm:pt-[150px]  pb-[45px] sm:pb-[40px] font-nunito">
      <div className="flex flex-col items-center overflow-hidden container-small sm:block">
        <div className="sm:w-auto w-[835px]">
          <Swiper
            loop
            autoplay
            pagination={{ clickable: true }}
            slidesPerView={4}
            spaceBetween={30}
            modules={[Pagination]}
            breakpoints={swiperBreakpoints}
            className="featured-slider"
          >
            {slides[collection.id]}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
