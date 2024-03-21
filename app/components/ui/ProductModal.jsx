import React, { useEffect, useState, Fragment } from 'react'
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel'
import { Button } from '../ui/button'
import { Dialog, Transition } from '@headlessui/react'

const ProductModal = ({ product, onClose }) => {
  console.log('Product in Modal:', product)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (product) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [product])

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-[1120px] text-left align-middle transition-all transform bg-[#edeaea] text-[#1d1d1d] shadow-xl">
                {product && <DialogContent product={product} />}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

const DialogContent = ({ product }) => {
  const images = product.images
  const media = images.nodes

  return (
    <>
      <div className="grid grid-cols-3 pt-[50px] pb-[20px] ">
        <div className="overflow-hidden product-gallary">
          <ProductGallary media={media} />
        </div>
        <div className="col-span-2 content">
          <h1 className="title font-roboto_bold font-bold text-[50px]">
            {product.title}
          </h1>
          <p className="product-details  text-[14px] text-[#1d1d1d] leading-[24px] uppercase font-roboto_bold font-bold">
            {product.description}
          </p>
          <p className="custom-serving py-5 text-[28px] text-[#1d1d1d] font-bold">
            ${product.servings.value}
          </p>
          <div className="healthy grid grid-cols-2 max-w-[70%]">
            <div className="flex items-center gap-2 fresh ">
              <div className="ball-circle"></div>
              <p className="text text-[18px] text-[#1d1d1d] font-roboto_bold font-semibold">
                Healthy, Fresh
              </p>
            </div>
            <div className="flex items-center gap-2 2-minute">
              <div className="ball-circle"></div>
              <p className="text text-[18px] text-[#1d1d1d] font-roboto_bold font-semibold">
                Prep Time 2 Minutes
              </p>
            </div>
          </div>

          {/* ingredient */}
          <div className="ingridiant_metafield flex justify-between max-w-[40%] my-5">
            <div className="ingridiant_width">
              <div className="ingridiant_value text-[22px] font-bold text-[#1d1d1d] font-roboto_bold">
                {product.protein.value}
              </div>
              <div className="ingridiant_label font-roboto_medium text-lg  text-[#1d1d1d]  font-[400]">
                Protein
              </div>
            </div>

            <div className="ingridiant_width">
              <div className="ingridiant_value text-[22px] font-bold text-[#1d1d1d] font-roboto_bold">
                {product.fat.value}
              </div>
              <div className="ingridiant_label font-roboto_medium text-lg  text-[#1d1d1d]  font-[400]">
                Fat
              </div>
            </div>

            <div className="ingridiant_width">
              <div className="ingridiant_value text-[22px] font-bold text-[#1d1d1d] font-roboto_bold">
                {product.carbs.value}
              </div>
              <div className="ingridiant_label font-roboto_medium text-lg  text-[#1d1d1d]  font-[400]">
                Carbs
              </div>
            </div>
          </div>

          {/* ingredeitn end */}

          <div className="description-box">
            <h2 className="text-xl font-bold desc-title description font-roboto_bold">
              Product Information:
            </h2>
            <p className="font-roboto_medium text-[#1d1d1d] text-sm max-w-[520px]">
              {product.product_information.value}
            </p>
          </div>
          {/* ingredeints */}
          <div className="grid grid-cols-5 mt-4">
            <div className="col-span-4 ingredeints">
              <h1 className="font-roboto_medium text-[#1d1d1d] text-[16px] font-[600] ">
                INGREDIENTS:
              </h1>
              <p className="text-[17px] font-roboto_medium text-[#1d1d1d] text-sm max-w-[520px] font-[400]">
                {product.ingredients.value}
              </p>
            </div>
            <div className="col-span-1">
              <h1 className="font-roboto_medium text-[#1d1d1d] text-[16px] font-[600]">
                ALLERGENS:
              </h1>
              <p className="text-[17px] font-roboto_medium text-[#1d1d1d] text-sm font-[400]">
                {product.allergens.value}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-around py-2 " style={{borderTop: "3px solid #70707099"}}>
        <div className="flex items-center gap-6 money-back ">
          <img
            src="https://cdn.shopify.com/s/files/1/0555/1751/1961/files/1279px-Font_Awesome_5_solid_money-bill-wave_svg.png"
            alt="money"
            width={65}
          />
          <h1 className="text-[24px] font-roboto_bold text-[#1d1d1d] font-semibold">
            Money back guarantee
          </h1>
        </div>
        <div className="flex items-center justify-center gap-3 price-bottom">
          <div className="price-text text-[36px] font-roboto_bold text-[#1d1d1d] font-semibold">
            ${product.priceRange.minVariantPrice.amount}
          </div>
          <div className="cta-btn">
            <Button>+ADD</Button>
          </div>
        </div>
      </div>
    </>
  )
}

function Content({ slide }) {
  return (
    <div className="w-[100%]">
      <img
        className="mx-auto max-w-60"
        draggable="false"
        src={slide.url}
        style={{ maxHeight: '400px' }}
      />
    </div>
  )
}

function ProductGallary({ media }) {
  const [currentSlide, setCurrentSlide] = useState(0)

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

        <Thumbs
          media={media}
          currentSlide={currentSlide}
          onClick={setCurrentSlide}
        />
      </CarouselProvider>
    </>
  )
}

function Thumbs({ media, currentSlide, onClick }) {
  return (
    <div className="flex items-center justify-center gap-4 py-1 thumbnail-container">
      {media.map((slide, index) => (
        <button
          key={index}
          aria-label={`Go to slide ${index + 1}`}
          onClick={() => onClick(index)}
          className={`focus:ring ring-offset-2 ring-indigo-500 focus:outline-none w-16 h-16 relative ${
            currentSlide === index ? 'opacity-100' : 'opacity-50'
          }`}
        >
          <img
            src={slide.url}
            alt=""
            className="absolute top-0 bottom-0 left-0 right-0 object-contain w-full h-full"
          />
        </button>
      ))}
    </div>
  )
}

export default ProductModal
