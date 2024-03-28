export function CartSummary({ cost, layout, children = null }) {
  const className =
    layout === 'page' ? 'cart-summary-page' : 'cart-summary-aside'
  return (
    <div
      aria-labelledby="cart-summary"
      className={`${className} flex justify-between items-end `}
    >
      {/* <h4>Totals</h4> */}
      <dl className="flex text-base font-semibold cart-subtotal">
        <dt>Total: </dt>
        {cost ? (
          <span className="text-[16px] pr-1 line-through decoration-[#000] decoration-[3px] text-[#919191] ">
            {`$${(cost + 11.45).toFixed(2)}`}
          </span>
        ) : (
          '-'
        )}
        <dd>
          {cost ? (
            // <Money data={cost} />
            <span className="text-[16px] font-semibold text-center">
              ${cost.toFixed(2)}
            </span>
          ) : (
            '-'
          )}
        </dd>
      </dl>
      {children}
    </div>
  )
}
