import { useContext } from 'react'

import { CustomBundleContext } from '~/contexts'

export function CartSummary({ layout, children = null }) {
  const { cost, originalCost } = useContext(CustomBundleContext)

  const className =
    layout === 'page' ? 'cart-summary-page' : 'cart-summary-aside'

  return (
    <div
      aria-labelledby="cart-summary"
      className={`${className} flex justify-between items-end `}
    >
      <dl className="flex text-base font-semibold cart-subtotal">
        <dt>Total: </dt>
        <span className="text-[16px] pr-1 line-through decoration-[#000] decoration-[3px] text-[#919191] ">
          ${originalCost}
        </span>
        <dd>
          <span className="text-[16px] font-semibold text-center">${cost}</span>
        </dd>
      </dl>
      {children}
    </div>
  )
}
