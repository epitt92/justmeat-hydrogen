
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Navigation  } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


 function ProductSlider() {
    return (
        <>
          <Swiper navigation={true} slidesPerView={4} autoplay spaceBetween={30} modules={[Navigation]} className="mySwiper">
            <SwiperSlide className='flex justify-center items-start'><img src="https://cdn.shopify.com/s/files/1/0672/4776/7778/files/chicken_thigh.webp" alt="" /></SwiperSlide>
            <SwiperSlide className='flex justify-center items-start'><img src="https://cdn.shopify.com/s/files/1/0672/4776/7778/files/pulled_pork.webp" alt="" /></SwiperSlide>
            <SwiperSlide className='flex justify-center items-start'><img src="https://cdn.shopify.com/s/files/1/0672/4776/7778/files/texas_brisket.webp" alt="" /></SwiperSlide>
            <SwiperSlide className='flex justify-center items-start'><img src="https://cdn.shopify.com/s/files/1/0672/4776/7778/files/chicken_breast.webp" alt="" /></SwiperSlide>
            <SwiperSlide className='flex justify-center items-start'><img src="https://cdn.shopify.com/s/files/1/0672/4776/7778/files/beef_tritip.webp" alt="" /></SwiperSlide>
          </Swiper>
        </>
      );
}

export default ProductSlider;


