import React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '~/lib/utils'

export const Button = ({
  onClick,
  children,
  className,
  loading,
  disabled,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className={cn('relative disabled:cursor-not-allowed', className)}
      {...rest}
    >
      {loading && (
        <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin" />
        </div>
      )}
      <div className={loading ? 'invisible' : ''}>{children}</div>
    </button>
  )
}
