import { useState } from 'react'
import { useLoaderData } from '@remix-run/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import { cn } from '~/lib/utils'
import { Image } from '@shopify/hydrogen'

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
    slidesPerView: 3,
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

  const products = collection.products.nodes
  console.log('🚀 ~ Featured ~ products:', products)

  return (
    <section className="bg-[#222222] sm:pt-[176px] pt-[190px] sm:pb-[82px] pb-[61px] font-nunito">
      <div className="container">
        <div className="sm:flex justify-center mb-[44px]">
          <div className="flex bg-black rounded-[6px] text-white sm:text-[14px] text-[13px] font-normal border-[3px] border-solid border-white">
            <div className="flex gap-[3px] bg-white">
              {collections.map((el, index) => (
                <button
                  key={index}
                  disabled={el.id === collection.id}
                  className={cn(
                    'sm:px-[24px] px-[18px] py-[13px] uppercase tracking-[1px]',
                    el.id === collection.id
                      ? 'text-black bg-white'
                      : 'text-white bg-black',
                  )}
                  onClick={() => setCollection(el)}
                >
                  {el.title}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="">
          <Swiper
            loop
            autoplay
            pagination
            slidesPerView={4}
            spaceBetween={30}
            modules={[Pagination]}
            breakpoints={swiperBreakpoints}
          >
            {products.map((product, index) => (
              <SwiperSlide key={index}>
                <div className="relative flex flex-col aspect-square mt-[24%]">
                  <div
                    className="relative px-[25px] pt-[40px] pb-[14px] rounded-t-[8px] h-[69%] flex text-white"
                    style={{ backgroundColor: sliderItemColors[index % 4] }}
                  >
                    <div className="relative flex items-end justify-center flex-1">
                      <div className="absolute w-[80%] top-[-90%]">
                        <Image
                          src={product.images.nodes[1].url}
                          className="rotate-90"
                        />
                      </div>
                      <div className="xl:mb-[6%]">Everyday Meats</div>
                    </div>
                  </div>
                  <div className="flex-1 bg-white py-[22px] px-[10px] flex justify-center items-center text-[20px] rounded-b-[8px] font-bold tracking-normal">
                    {product.title}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <br />
          <br />
          <br />
        </div>
      </div>
    </section>
  )
}
