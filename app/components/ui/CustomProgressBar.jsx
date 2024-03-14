import React, { useEffect, useState } from 'react'
// import { Progress } from './progress'



const CustomProgressBar = () => {
    const [progress, setProgress] = useState(13)

    useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500)
        return () => clearTimeout(timer)
      }, [])

      return ( 
        <div className='py-4'>
            {/* <Progress value={progress} className="w-[90%] min-h-7" /> */}
        </div>
      )



}

export default CustomProgressBar