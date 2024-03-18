import React, { useEffect, useState } from 'react'
import { Progress } from './progress';



const CustomProgressBar = () => {
    const [progress, setProgress] = useState(25);

    useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500)
        return () => clearTimeout(timer)
      }, [])

      return ( 
        <div className='py-4 px-7 flex justify-center'>
            <Progress value={progress} className="w-[90%] min-h-3 border border-[#000]" />
        </div>
      )



}

export default CustomProgressBar