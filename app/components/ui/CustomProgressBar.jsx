import React, { useEffect, useState } from 'react'
// import { Progress } from './progress';
import * as Progress from '@radix-ui/react-progress';



const CustomProgressBar = () => {
    const [progress, setProgress] = useState(13)

    useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500)
        return () => clearTimeout(timer)
      }, [])

      // return ( 
      //   <div className='py-4'>
      //       <Progress value={progress} className="w-[90%] min-h-7" />
      //   </div>
      // )

      return (
        <Progress.Root className="ProgressRoot w-[70%] h-3 mx-auto my-2 rounded-lg border border-solid  border-black" value={progress}>
          <Progress.Indicator
            className="ProgressIndicator"
            style={{ transform: `translateX(-${100 - progress}%)` }}
          />
        </Progress.Root>
      )



}

export default CustomProgressBar