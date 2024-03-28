import React, { useEffect, useState } from 'react'
import Progress from './Progress'

const CustomProgressBar = ({ cost }) => {
  const progressValue = (cost / 150) * 100 // Calculate the progress value based on the total and the target amount

  return (
    <>
      <div className="flex justify-center px-10 py-4">
        <Progress
          value={progressValue >= 100 ? 100 : progressValue}
          className="w-[100%] min-h-3 border border-[#000]"
        />
      </div>
      <div className="flex justify-end gap-2 flex-column px-7 ">
        <p className="relative flex flex-col mr-3 text-base text-center">
          {' '}
          <span className="w-[10px] h-[10px] bg-black rounded-[100%] absolute top-[-27px] left-[50%] translate-x-[-50%]  "></span>{' '}
          <span className="text-[16px] uppercase leading-normal">$75 </span>
          <span className="text-[11px] uppercase leading-normal">
            Unlock Order{' '}
          </span>
        </p>
        <p className="relative flex flex-col mr-5 text-base text-center">
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
