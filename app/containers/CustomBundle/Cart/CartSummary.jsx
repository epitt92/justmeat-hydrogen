import { useContext , useEffect , useState } from 'react'
import { CustomBundleContext } from '~/contexts'
import { useLoaderData } from '@remix-run/react'

export function CartSummary({ layout, children = null }) {
  const { freeProduct } = useLoaderData()
  const { totalCost } = useContext(CustomBundleContext)

  const [freeTag, setFreeTag] = useState('');

  useEffect(() => {
    let tags = freeProduct.tags;
    if (tags && tags.length > 0) {
      tags.forEach(tag => {
        if (tag.includes('free-')) {
          let priceForFreeProduct = tag.split("-");
          priceForFreeProduct = +priceForFreeProduct[1];
          setFreeTag(priceForFreeProduct);
        }
      });
    }
  }, [freeProduct]);

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
        {totalCost ? (
          <span className="text-[16px] pr-1 line-through decoration-[#000] decoration-[3px] text-[#919191] ">
            {`$${(totalCost + parseFloat(freeTag)).toFixed(2)}`}
          </span>
        ) : (
          '-'
        )}
        <dd>
          {totalCost ? (
            // <Money data={cost} />
            <span className="text-[16px] font-semibold text-center">
              ${totalCost.toFixed(2)}
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
