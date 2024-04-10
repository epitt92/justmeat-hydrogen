import { useContext } from 'react'

import { Progress } from '~/components/Progress'
import { CustomBundleContext } from '~/contexts'
import { cn } from '~/lib/utils'

export function ProgressBar() {
  const { totalCost } = useContext(CustomBundleContext)

  const progressValue = (totalCost / 150) * 100 // Calculate the progress value based on the total and the target amount

  return (
    <>
      <div className="relative mx-8 my-4 sm:mx-10">
        <Progress
          value={progressValue >= 100 ? 100 : progressValue}
          className="w-[100%] border border-[#000]"
        />
        <div className="absolute top-0 left-0 w-full h-full">
          <Milestone className="left-[50%]">
            <div className="block sm:hidden">$75</div>
          </Milestone>
          <Milestone className="left-[83%]">
            <div className="block sm:hidden">$125</div>
          </Milestone>
        </div>
      </div>
      <div className="relative justify-end hidden gap-1 px-2 sm:flex flex-column">
        <p className="flex flex-col mr-3 text-base text-center">
          <span className="text-[16px] uppercase leading-normal">$75 </span>
          <span className="text-[11px] uppercase leading-normal">
            Unlock Order{' '}
          </span>
        </p>
        <p className="relative flex flex-col mr-5 text-base text-center">
          <span className="text-[16px] leading-normal">$125 </span>
          <span className="text-[11px] uppercase leading-normal">
            Free Meat{' '}
          </span>
          <span className="text-[11px] leading-normal">(UNLOCKED AT $125)</span>
        </p>
      </div>
      <div className="relative block mx-8 my-4 sm:hidden sm:mx-10">
        <div className="absolute text-[12px] translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]">
          Minimum
        </div>
        <div className="absolute text-[12px] translate-x-[-50%] translate-y-[-50%] top-[50%] left-[83%] w-[66px]">
          Bonus Meat
        </div>
      </div>
    </>
  )
}

const Milestone = ({ className, children }) => (
  <div
    className={cn(
      'absolute rounded-full flex justify-center items-center bg-[#425b34] sm:bg-[#1b6f84] w-[28px] h-[28px] sm:w-[20px] sm:h-[20px] translate-x-[-50%] translate-y-[-50%] top-[50%] text-xs text-white border border-solid border-black',
      className,
    )}
  >
    {children}
  </div>
)
