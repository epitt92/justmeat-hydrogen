import React from 'react'

import { NavLink } from '@remix-run/react'

export const Video = () => {
  return (
    <section className="bg-[url('https://cdn.shopify.com/s/files/1/0555/1751/1961/files/Group_4677_2x_b4bf7720-0529-4907-b3d6-8ecc83b37a23.png')] bg-[#111213] text-white py-8">
      <div className="w-[85%] max-w-[1170px] mx-auto">
        <div className="grid items-center justify-center max-w-lg gap-8 mx-auto mt-4 lg:max-w-none lg:grid-cols-3">
          <div className="text-center md:text-start">
            <h3 className="text-[50px] font-Roboto font-extrabold">
              THE
              <br /> UltiMEAT
              <br />
              EXPERIENCE
            </h3>
          </div>
          <div className="text-center md:text-start">
            <p className="mb-8 font-normal font-Roboto">
              100% MEAT • NO ADDED COLORS OR FLAVORS Make the easiest, most
              delicious choice of your life and leave the protein to the pros
              (yes, that’s us!).
            </p>
            <NavLink
              end
              prefetch="intent"
              className="py-[12px] px-[20px] bg-[#862e1b] btn-order"
              to="/products/custom-bundle"
            >
              ORDER NOW
            </NavLink>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="https://cdn.shopify.com/s/files/1/0555/1751/1961/files/Group_4657.png?v=1697487376"
              className="w-[212px] h-auto"
              alt=""
            />
          </div>
        </div>
        <div className="my-8">
          <video className="w-full h-full " autoPlay muted loop>
            <source
              src="https://cdn.shopify.com/videos/c/o/v/f00391470df74c73af8172c9d0140764.mov"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  )
}
