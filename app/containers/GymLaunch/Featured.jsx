import { useState } from 'react'
import Slider from "react-slick";
import { useLoaderData } from '@remix-run/react'

var settings = {
  dots: true,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 3000,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        infinite: true,
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 768,
      settings: {
        infinite: true,
        slidesToShow: 2,
       
      }
    },
    {
      breakpoint: 640,
      settings: {
        className: "center",
        centerMode: true,
        infinite: true,
        slidesToShow: 2,
        centerPadding: "20px",
        
      }
    },
    {
      breakpoint: 420,
      settings: {
        className: "center",
        centerMode: true,
        infinite: true,
        slidesToShow: 1,
        centerPadding: "30px",
        
      }
    }
    
  ]
};
const sliderItemColors = ['#572d2d', '#7b4931', '#323e47', '#9d6938']

export const Featured = () => {
  const { collections } = useLoaderData()
  const [collection, setCollection] = useState(collections[0])

  const [activeIndex, setActiveIndex] = useState(0);

  const handleCollectionClick = (index , collection) => {
    setActiveIndex(index);
    setCollection(collection);
  };


  const slides = {}

  for (const el of collections) {
    slides[el.id] = el.products.nodes.map((product, index) => (
      <div key={index}>
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
            <div className="truncate">{product.title}</div>
          </div>
        </div>
      </div>
    ))
  }

  return (
    <section className="bg-[#121315] py-6 font-nunito">
      <div className="flex flex-col items-center overflow-hidden container-small sm:block">
        <div className="w-[360px] sm:w-auto pt-6">
        <div className="slider-container featuredSlider">
        <Slider {...settings}>
          {slides[collection.id]}
        </Slider>
      </div>
        </div>
      </div>
    </section>
  )
}
