import React, { useContext, useEffect, useState } from 'react'
// import { Progress } from './progress';
import * as Progress from '@radix-ui/react-progress';
import HeaderContext from '../HeaderContext';



const CustomProgressBar = () => {
    const [progress, setProgress] = useState(13)

    const { cartTotal } = useContext(HeaderContext);

    let total = parseInt(cartTotal);

    console.log(total)


    useEffect(() => {
        const timer = setTimeout(() => setProgress(total), 500)
        return () => clearTimeout(timer)
      }, [cartTotal])

      // return ( 
      //   <div className='py-4'>
      //       <Progress value={progress} className="w-[90%] min-h-7" />
      //   </div>
      // )

      return (
        <>
          <Progress.Root className="ProgressRoot w-[70%] h-3 mx-auto my-2 rounded-lg border border-solid  border-black" value={progress} max={100}>
            <Progress.Indicator
              className="ProgressIndicator"
              style={{ transform: `translateX(-${100 - progress}%)` }}
            />
          </Progress.Root>
          <div className='flex flex-column '>
            <p style={{textAlign: "center"}}>$75<br/><span style={{fontSize: "14px"}}>Unlock Order</span></p>
            <p style={{marginRight: "20%", marginLeft: "20px", textAlign: "center"}}>$125<br/><span style={{fontSize: "14px"}}>Free Meat</span></p>
          </div>
        </>
        
      )



}

export default CustomProgressBar