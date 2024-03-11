import React from 'react'
const Easydelicious = () => {
  return (
    <section className="bg-[url('https://cdn.shopify.com/s/files/1/0555/1751/1961/files/Group_4677_2x_b4bf7720-0529-4907-b3d6-8ecc83b37a23.png')] text-white py-8">
        <div className="w-[85%] mx-auto">
            <div className='mx-auto mt-4 grid max-w-lg gap-8 lg:max-w-none lg:grid-cols-3 justify-center items-center'>
                <div className='text-center md:text-start'>
                    <h3 className='text-[50px] font-Roboto font-extrabold'>Welcome to<br/>Easy Delicious.</h3>
                </div>
                <div className='text-center md:text-start'>
                    <p className='mb-8 font-Roboto font-normal'>Leave the protein to the chef’s & choose from our lineup of 12 different meats with new flavors releasing regularly.</p>
                    <a href="" className='py-[12px] px-[20px] bg-[#862e1b]'>ORDER NOW</a>
                </div>
                <div className="flex justify-center items-center">
                    <img src="https://cdn.shopify.com/s/files/1/0555/1751/1961/files/Group_4657.png?v=1697487376" className="w-[212px] h-auto" alt="" />
                </div>
            </div>
            <div  className="my-8 bg-[#fff] text-[#141517] p-5">
                <div className="flex flex-col md:flex-row justify-center gap-0 md:gap-[30px] w-full">
                    <div className=" md:basis-4/6 justify-start ">
                        <h1 className="font-Roboto text-3xl sm:text-8 md:text-3xl font-bold leading-[36.415px] md:leading-[40px] lg:leading-[60px] -tracking-[0.6px] md:tracking-[-1.12px]  text-[#061C3D] mb-2">Our Latest Recipe</h1>
                        <p className="font-Roboto text-base font-normal leading-6 text-[#42526B] mb-2">Beef Teriyaki Rice And Stir Fry</p>
                        <p className="font-Roboto text-base font-normal leading-6 text-[#42526B] mb-2">Preparation Instructions</p>
                        <p className="font-Roboto text-base font-normal leading-6 text-[#42526B] mb-2">1) Prepare rice to your specifications </p>
                        <p className="font-Roboto text-base font-normal leading-6 text-[#42526B] mb-2">2) Chop Broccoli, red pepper, and green onions </p>
                        <p className="font-Roboto text-base font-normal leading-6 text-[#42526B] mb-2">3) Add Soy sauce and green onions to rice  </p>
                        <p className="font-Roboto text-base font-normal leading-6 text-[#42526B] mb-2">5) Remove plastic from thawed Hawaiian Teriyaki Beef. In a skillet add 1/4 of a</p>
                        <p className="font-Roboto text-base font-normal leading-6 text-[#42526B] mb-2">container of protein, add a portion of the teriyaki marinade and heat for 2 minutes. Plate and serve!  </p>
                    </div>
                    <div className=" md:basis-2/6 justify-center items-center">
                   
                    <video className="h-full w-full "  autoPlay muted loop>
                    <source src="https://cdn.shopify.com/videos/c/o/v/f00391470df74c73af8172c9d0140764.mov" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Easydelicious