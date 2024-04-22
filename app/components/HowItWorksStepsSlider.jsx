import Slider from "react-slick";
import stepImage1 from '~/assets/images/how-it-works-step-1.png'
import stepImage2 from '~/assets/images/how-it-works-step-2.png'
import stepImage3 from '~/assets/images/how-it-works-step-3.png'



const steps = [
  {
    image: stepImage1,
    text: 'Select whatever flavor that you feel in the mood for',
  },
  {
    image: stepImage2,
    text: 'Reheat the meat with its included Cooking Sauce in a hot skillet',
  },
  {
    image: stepImage3,
    text: 'Pair with your favorite sides and enjoy amazing flavor',
  },
]


export const HowItWorksStepsSlider = () => {
  var settings = {
    className: "center",
    centerMode: true,
    centerPadding: "0px",
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    adaptiveHeight:true,
    arrows: false,
    responsive: [

      {
        breakpoint: 678,
        settings: {
          slidesToShow: 1,
         
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
         
        }
      }
    ]
  };
  return (
    <>
    <div className='hidden md:block md:w-[98%] xl:w-[55%] mx-auto'>
        <div className=" relative flex flex-row justify-center gap-3 md:mb-[56px]  w-full">
           
            {steps.map((step, index) => (
                  <div key={index} className="relative rounded-[8px] overflow-hidden basis-1/3"
                    style={{ boxShadow: '0px 30px 30px -9px rgba(0, 0, 0, 0.14)' }}
                  >
                    <img className="w-full h-[200px]" src={step.image} alt="" />
                    <div className="relative bg-white font-nunito px-[22px] py-[20px] font-bold tracking-[2px] ">
                      <span className="absolute -translate-x-1/2 left-1/2 rounded-[4px] bg-[#231B19] px-[13px] py-[5px] text-[14px] font-bold top-[-15px]">
                        STEP {index + 1}
                      </span>
                      <div className="text-[#231B19] text-center tracking-[1px] leading-[20px]">
                        {step.text}
                      </div>
                    </div>
                  </div>
              ))}
          </div>
    </div>
    <div className='md:hidden mb-8'>
          <div className="w-full mx-auto">

          <div className="slider-container howjustmeatSlider">
    <Slider {...settings}>
    {steps.map((step, index) => (
                <div key={index}>
                  <div
                    className="relative rounded-[8px] overflow-hidden sm:mb-0 mb-[50px] w-full"
                    style={{ boxShadow: '0px 30px 30px -9px rgba(0, 0, 0, 0.14)' }}
                  >
                    <img className="w-full" src={step.image} alt="" />
                    <div className="relative bg-white font-nunito sm:px-[26px] sm:py-[30px] px-[22px] py-[20px] font-bold tracking-[2px] min-h-[132px]">
                      <span className="absolute -translate-x-1/2 left-1/2 rounded-[4px] bg-[#231B19] px-[13px] py-[5px] text-[14px] font-bold top-[-15px]">
                        STEP {index + 1}
                      </span>
                      <div className="text-[#231B19] text-center tracking-[1px] leading-[20px]">
                        {step.text}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
    </Slider>
    </div>  
          </div>
       
</div>


       
    </>
  
  )
}
