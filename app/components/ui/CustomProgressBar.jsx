import React, { useEffect, useState } from 'react'
import Progress from './progress'

const CustomProgressBar = ({ cost }) => {
  const progressValue = (cost / 150) * 100 // Calculate the progress value based on the total and the target amount

  return (
    <>
      <div className="py-4 px-10 flex justify-center">
        <Progress
          value={progressValue >= 100 ? 100 : progressValue}
          className="w-[100%] min-h-3 border border-[#000]"
        />
      </div>
      <div className="flex flex-column justify-end gap-2  xl:px-7 px-10 ">
        <p className="text-center text-base flex flex-col mr-3 relative">
          {' '}
          <span className="w-[10px] h-[10px] bg-black rounded-[100%] absolute top-[-27px] left-[50%] translate-x-[-50%]  "></span>{' '}
          <span className="text-[16px] uppercase leading-normal">$75 </span>
          <span className="text-[11px] uppercase leading-normal">
            Unlock Order{' '}
          </span>
        </p>
        <p className="text-base text-center flex flex-col mr-5 relative">
          <span className="w-[10px] h-[10px] bg-black rounded-[100%] absolute top-[-27px] left-[50%] translate-x-[-50%]  "></span>
          <span className="text-[16px] leading-normal">$125 </span>
          <span className="text-[11px] uppercase leading-normal">
            Free Meat{' '}
          </span>
          <span className="text-[11px] leading-normal">(UNLOCKED AT $125)</span>
        </p>
      </div>
    </>
  )
}

export default CustomProgressBar
