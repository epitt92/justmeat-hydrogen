import React from 'react'
import Video from './Video'
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react'
function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? 'rotate-180' : ''} h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  )
}
const QuickSimpleRecipes = () => {
  const [open, setOpen] = React.useState(0)

  const handleOpen = (value) => setOpen(open === value ? 0 : value)

  return (
    <section className="bg-white text-black py-8">
      <div className="w-[85%] mx-auto bg-[url('https://cdn.shopify.com/s/files/1/0555/1751/1961/files/Mask_Group_161.png')] bg-center text-white py-8">
        <div className="mt-0 md:mt-[170px] text-center mb-0 md:mb-[42px] px-2 md:px-[66px] lg:px-[166px] pt-0 md:pt-[19px] pb-[1px]">
          <p>
            The hardest part of meal prepping has never been easier! Just Meats
            takes care of the protein, so you don’t have to waste time, energy,
            and money prepping it yourself. Plus it’s delicious, nutritious, and
            goes perfectly with your favorite sides. Follow our recipes for some
            simple, balanced meals you can make at home!
          </p>
        </div>
      </div>
      <div className="w-[85%] mx-auto p-4">
        <h1 className="font-Roboto text-3xl font-semibold mt-2 mb-4 leading-5">
          Quick & Simple Recipes
        </h1>
        <div className="">
          <div className="">
            <div className="mx-auto mt-4 grid max-w-lg gap-12 lg:max-w-none lg:grid-cols-3 justify-center items-center">
              <div className="">
                <div className="">
                  <div className="flex items-center justify-center mt-4">
                    <Video
                      videoId="videoId2"
                      url="https://cdn.shopify.com/videos/c/o/v/ee592ed8c3f44de6a78ad3fd619433b0.mp4"
                      poster="https://cdn.shopify.com/s/files/1/0672/4776/7778/files/poster-1.png?v=1710347717"
                      width="250px"
                      height="250px"
                    />
                  </div>
                  <h3 className="text-center mt-2">
                    Beef Teriyaki Rice And Stir Fry
                  </h3>
                </div>
                <div className="mt-5 px-3">
                  <Accordion
                    open={open === 1}
                    icon={<Icon id={1} open={open} />}
                  >
                    <AccordionHeader
                      onClick={() => handleOpen(1)}
                      className="flex justify-between border-b border-black mb-6 leading-5"
                    >
                      Instructions
                    </AccordionHeader>
                    <AccordionBody>
                      <p className="font-Roboto text-base font-normal leading-6 text-black mb-2">
                        1) Prepare rice to your specifications{' '}
                      </p>
                      <p className="font-Roboto text-base font-normal leading-6 text-black mb-2">
                        2) Chop Broccoli, red pepper, and green onions{' '}
                      </p>
                      <p className="font-Roboto text-base font-normal leading-6 text-black] mb-2">
                        3) Add Soy sauce and green onions to rice{' '}
                      </p>
                      <p className="font-Roboto text-base font-normal leading-6 text-black mb-2">
                        4) Cook broccoli to your specification{' '}
                      </p>
                      <p className="font-Roboto text-base font-normal leading-6 text-black mb-2">
                        5) Remove plastic from thawed Hawaiian Teriyaki Beef. In
                        a skillet add 1/4 of a container of protein, add a
                        portion of the teriyaki marinade and heat for 2 minutes.
                        Plate and serve!{' '}
                      </p>
                    </AccordionBody>
                  </Accordion>
                </div>
              </div>
              <div className="">
                <div className="">
                  <div className="flex items-center justify-center mt-4">
                    <Video
                      videoId="videoId3"
                      url="https://cdn.shopify.com/videos/c/o/v/b727288188c74169bb4532185ef85f8c.mp4"
                      poster="https://cdn.shopify.com/s/files/1/0672/4776/7778/files/poster-2.png?v=1710349245"
                      width="250px"
                      height="250px"
                    />
                  </div>
                  <h3 className="text-center mt-2">
                    Sweet & Spicy Pork and Broccoli Slaw
                  </h3>
                </div>
                <div className="mt-5 px-3">
                  <Accordion
                    open={open === 1}
                    icon={<Icon id={1} open={open} />}
                  >
                    <AccordionHeader
                      onClick={() => handleOpen(1)}
                      className="flex justify-between border-b border-black mb-6 leading-5"
                    >
                      Instructions
                    </AccordionHeader>
                    <AccordionBody>
                      <p className="font-Roboto text-base font-normal leading-6 text-black mb-2">
                        1) Prepare rice to your specifications.{' '}
                      </p>
                      <p className="font-Roboto text-base font-normal leading-6 text-black mb-2">
                        2)Chop red pepper and add to rice.Sauté broccoli slaw,
                        green onions, and soy sauce until tender.{' '}
                      </p>
                      <p className="font-Roboto text-base font-normal leading-6 text-black] mb-2">
                        3) Remove plastic from Sweet & Spicy Pork package. In a
                        skillet, add one serving of protein and a portion of the
                        sweet & spicy marinade and heat for 2 minutes, stirring
                        every 30 seconds.{' '}
                      </p>
                      <p className="font-Roboto text-base font-normal leading-6 text-black mb-2">
                        4) Plate up and serve!{' '}
                      </p>
                    </AccordionBody>
                  </Accordion>
                </div>
              </div>
              <div className="">
                <div className="">
                  <div className="flex items-center justify-center mt-4">
                    <Video
                      videoId="videoId4"
                      url="https://cdn.shopify.com/videos/c/o/v/7fd09d26054540d9a203114550d017c4.mp4"
                      poster="https://cdn.shopify.com/s/files/1/0672/4776/7778/files/poster-3.png?v=1710349244"
                      width="250px"
                      height="250px"
                    />
                  </div>
                  <h3 className="text-center mt-2">
                    Buffalo Chicken Thigh and Asparagus
                  </h3>
                </div>
                <div className="mt-5 px-3">
                  <Accordion
                    open={open === 1}
                    icon={<Icon id={1} open={open} />}
                  >
                    <AccordionHeader
                      onClick={() => handleOpen(1)}
                      className="flex justify-between border-b border-black mb-6 leading-5"
                    >
                      Instructions
                    </AccordionHeader>
                    <AccordionBody>
                      <p className="font-Roboto text-base font-normal leading-6 text-black mb-2">
                        1) Prepare potatoes and boil until soft and mash.{' '}
                      </p>
                      <p className="font-Roboto text-base font-normal leading-6 text-black mb-2">
                        2) Add sour cream, milk, garlic, and parsley to
                        potatoes. Stir.{' '}
                      </p>
                      <p className="font-Roboto text-base font-normal leading-6 text-black] mb-2">
                        3) Chop off ends of asparagus and steam, sauté, or boil.{' '}
                      </p>
                      <p className="font-Roboto text-base font-normal leading-6 text-black mb-2">
                        4) Remove plastic from Buffalo Chicken Breast package.
                        In a skillet, add one serving of protein and a portion
                        of the buffalo marinade and heat for 2 minutes, stirring
                        every 30 seconds.{' '}
                      </p>
                      <p className="font-Roboto text-base font-normal leading-6 text-black mb-2">
                        5) Plate up and serve!{' '}
                      </p>
                    </AccordionBody>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QuickSimpleRecipes
