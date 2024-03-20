import React, { useEffect, useState } from 'react'
import { Progress } from './progress';



const CustomProgressBar = ({cost}) => {
    // const [progress, setProgress] = useState(0);

      return ( 
        <>
        <div className='py-4 px-10 flex justify-center'>
            <Progress value={cost >= 100 ? 100 : cost } className="w-[100%] min-h-3 border border-[#000]" />
            {/* <Progress value={cost  } className="w-[100%] min-h-3 border border-[#000]" /> */}
        </div>
         <div className='flex flex-column justify-end gap-2  px-7 relative'>
            <p className='text-center text-base flex flex-col'><span className='text-[16px] uppercase leading-normal'>$75 </span><span className='text-[11px] uppercase leading-normal'>Unlock Order </span></p>
            <p className='text-base text-center flex flex-col'><span className='text-[16px] leading-normal'>$125 </span><span className='text-[11px] uppercase leading-normal'>Free Meat </span><span className='text-[11px] leading-normal'>(UNLOCKED AT $125)</span></p>
          </div>
        </>
      )

}

export default CustomProgressBar