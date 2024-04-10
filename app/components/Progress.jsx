'use client'

import * as React from 'react'

import { cn } from 'app/lib/utils'

import * as ProgressPrimitive from '@radix-ui/react-progress'

const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative h-5 sm:h-4 w-full overflow-hidden rounded-full bg-primary/20 ',
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-[#425b34] sm:bg-[#1b6f84] transition-all content-[hellow]"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
