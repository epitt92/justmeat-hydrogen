
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Navigation  } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { NavLink } from '@remix-run/react';


 function ProductSlider() {
    return (
        <>
          <Swiper navigation={true} 
           breakpoints={{
            360: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
            1440: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          slidesPerView={4} autoplay spaceBetween={30} modules={[Navigation]} loop className="mySwiper">
            <SwiperSlide className='flex justify-center items-start'><NavLink end prefetch="intent" to="/products/custom-bundle"><img src="https://cdn.shopify.com/s/files/1/0672/4776/7778/files/chicken_thigh.webp" alt="" /></NavLink> </SwiperSlide>
            <SwiperSlide className='flex justify-center items-start'><NavLink end prefetch="intent" to="/products/custom-bundle"><img src="https://cdn.shopify.com/s/files/1/0672/4776/7778/files/pulled_pork.webp" alt="" /></NavLink></SwiperSlide>
            <SwiperSlide className='flex justify-center items-start'><NavLink end prefetch="intent" to="/products/custom-bundle"><img src="https://cdn.shopify.com/s/files/1/0672/4776/7778/files/texas_brisket.webp" alt="" /></NavLink></SwiperSlide>
            <SwiperSlide className='flex justify-center items-start'><NavLink end prefetch="intent" to="/products/custom-bundle"><img src="https://cdn.shopify.com/s/files/1/0672/4776/7778/files/chicken_breast.webp" alt="" /></NavLink></SwiperSlide>
            <SwiperSlide className='flex justify-center items-start'><NavLink end prefetch="intent" to="/products/custom-bundle"><img src="https://cdn.shopify.com/s/files/1/0672/4776/7778/files/beef_tritip.webp" alt="" /></NavLink></SwiperSlide>
          </Swiper>
        </>
      );
}

export default ProductSlider;


