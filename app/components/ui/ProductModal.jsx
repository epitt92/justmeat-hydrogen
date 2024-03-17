import React, { useState } from 'react';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup
} from 'pure-react-carousel';
import {Button} from '../ui/button'

const ProductModal = ({product}) => {
  const {images} = product;
  const media = images.nodes;

  return (
    <>
      <main className="dialog-box border border-red-700 grid grid-cols-2">
        <div className="product-gallary overflow-hidden">
          <ProductGallary media={media} />
        </div>
        <div className="content">
          <h1 className="title font-roboto_bold font-bold text-[55px]">
            {product.title}
          </h1>
          <p className="product-details  text-[16px] text-[#1d1d1d] leading-[24px] uppercase font-roboto_bold ">
            90% lean ground chuck roast with a tasty spice rub
          </p>
          <p className="custom-serving py-5 text-[28px] text-[#1d1d1d] font-roboto_bold">
            $3.99 per Serving
          </p>
          <div className="healthy grid grid-cols-2 max-w-[60%]">
            <div className="fresh  flex items-center gap-2 ">
              <div className="ball-circle"></div>
              <p className="text text-[18px] text-[#1d1d1d] font-roboto_bold ">
                Healthy, Fresh
              </p>
            </div>
            <div
              className="2-minute flex items-center gap-2"
              flex
              items-center
              gap-2
            >
              <div className="ball-circle"></div>
              <p className="text text-[18px] text-[#1d1d1d] font-roboto_bold ">
                Prep Time 2 Minutes
              </p>
            </div>
          </div>

          {/* ingredient */}
          <div className="ingridiant_metafield flex justify-between max-w-[40%] my-5">
            <div className="ingridiant_width">
              <div className="ingridiant_value text-[26px] font-bold text-[#1d1d1d] font-roboto_bold">34g</div>
              <div className="ingridiant_label font-roboto_medium text-xl  text-[#1d1d1d]  font-[400]">Protein</div>
            </div>

            <div className="ingridiant_width">
              <div className="ingridiant_value text-[26px] font-bold text-[#1d1d1d] font-roboto_bold">14g</div>
              <div className="ingridiant_label font-roboto_medium text-xl  text-[#1d1d1d]  font-[400]">Fat</div>
            </div>

            <div className="ingridiant_width">
              <div className="ingridiant_value text-[26px] font-bold text-[#1d1d1d] font-roboto_bold">8g</div>
              <div className="ingridiant_label font-roboto_medium text-xl  text-[#1d1d1d]  font-[400]">Carbs</div>
            </div>
          </div>

          {/* ingredeitn end */}

          <div className="description-box">
            <h2 className="desc-title description font-bold text-xl font-roboto_bold">
              Product Information:
            </h2>
            <p className="font-roboto_medium text-[#1d1d1d] text-sm">
              {product.description}
            </p>

          </div>
          {/* ingredeints */}
          <div className="ingredeints mt-4">
            <h1 className='font-roboto_medium text-[#1d1d1d] text-[16px] font-[600]'>INGREDIENTS:</h1>
            <p className='text-[17px] font-roboto_medium text-[#1d1d1d] font-[400]'>Ground Beef, Beef Rendering, Water, Carrots, Celery, Onions, Spg Rub (Spice)</p>
          </div>


        </div>
      </main>
      <div className='flex justify-around py-4'>
        <div className="money-back flex gap-6 items-center ">
          <img src="https://cdn.shopify.com/s/files/1/0555/1751/1961/files/1279px-Font_Awesome_5_solid_money-bill-wave_svg.png" alt="money" width={65} />
          <h1 className='text-[28px] font-roboto_bold text-[#1d1d1d]'>Money back guarantee</h1>
        </div>
        <div className="price-bottom flex gap-3 justify-center items-center">
          <div className="price-text text-[40px] font-roboto_bold text-[#1d1d1d]">
            ${product.priceRange.minVariantPrice.amount}
          </div>
          <div className="cta-btn">
            <Button>+ADD</Button>
          </div>
        </div>
      </div>
    </>
  );
};

function Content({slide}) {
  return (
    <div tabIndex="0">
      <div className="w-[100%]">
        <img className="max-w-full w-96" draggable="false" src={slide.url} />
      </div>
    </div>
  );
}

function ProductGallary({media}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <>
      <CarouselProvider
        naturalSlideWidth={100}
        isIntrinsicHeight={true}
        totalSlides={media.length}
        visibleSlides={1}
        step={1}
        dragStep={1}
        touchEnabled={false}
        dragEnabled={false}
        currentSlide={currentSlide}
        infinite={true}
      >

        <Slider classNameTray="tray">
          {media.map((slide, index) => (
            <Slide className="slide" index={index} key={index}>
              <Content slide={slide} />
            </Slide>
          ))}
        </Slider>

        <Thumbs media={media} currentSlide={currentSlide} onClick={setCurrentSlide} />

      </CarouselProvider>
    </>
  );
}



function Thumbs({ media, currentSlide, onClick }) {
  return (
    <div className="thumbnail-container flex gap-4 items-center justify-center">
      {media.map((slide, index) => (
        <button
          key={index}
          aria-label={`Go to slide ${index + 1}`}
          onClick={() => onClick(index)}
          className={`focus:ring ring-offset-2 ring-indigo-500 focus:outline-none w-16 h-16 relative ${currentSlide === index ? 'opacity-100' : 'opacity-50'}`}
        >
          <img
            src={slide.url}
            alt=""
            className="object-contain absolute left-0 top-0 bottom-0 right-0 w-full h-full"
          />
        </button>
      ))}
    </div>
  );
}



export default ProductModal;
