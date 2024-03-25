import { CartForm, Image, Money } from '@shopify/hydrogen'
import { Link } from '@remix-run/react'
import { useVariantUrl } from '~/lib/variants'

/**
 * @param {CartMainProps}
 */
export function CartMain({ layout, cart }) {
  const linesCount = Boolean(cart?.lines?.nodes?.length || 0)
  const withDiscount =
    cart &&
    Boolean(cart?.discountCodes?.filter((code) => code.applicable)?.length)
  const className = `cart-main ${withDiscount ? 'with-discount' : ''}`

  return (
    <div className={className}>
      <CartEmpty hidden={linesCount} layout={layout} />
      <CartDetails cart={cart} layout={layout} />
    </div>
  )
}

/**
 * @param {CartMainProps}
 */
function CartDetails({ layout, cart }) {
  const cartHasItems = !!cart && cart.totalQuantity > 0

  return (
    <div className="cart-details flex flex-col md:flex-row justify-center gap-8 md:gap-[30px] w-full mb-28">
      <CartLines lines={cart?.lines} layout={layout} />
      {cartHasItems && (
        <CartSummary cost={cart.cost} layout={layout}>
          {/* <CartDiscounts discountCodes={cart.discountCodes} /> */}
          <CartCheckoutActions checkoutUrl={cart.checkoutUrl} />
        </CartSummary>
      )}
    </div>
  )
}

/**
 * @param {{
 *   layout: CartMainProps['layout'];
 *   lines: CartApiQueryFragment['lines'] | undefined;
 * }}
 */
function CartLines({ lines, layout }) {
  if (!lines) return null

  return (
    <div
      aria-labelledby="cart-lines"
      className="basis-8/12 border border-gray p-0 rounded-[13px] "
    >
      <table className="w-full flex flex-col ">
        <thead className="pb-2 ">
          <tr className="w-full flex px-9 rounded-t-xl text-center bg-gray-200 py-3 border-b-2 text-start ">
            <th className="w-1/5 text-center">Product</th>
            <th className="w-2/5 text-center">Title</th>
            <th className="w-1/5 text-center">Remove</th>
            <th className="w-1/5 text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          {lines.nodes.map((line) => (
            <CartLineItem key={line.id} line={line} layout={layout} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

/**
 * @param {{
 *   layout: CartMainProps['layout'];
 *   line: CartLine;
 * }}
 */
function CartLineItem({ layout, line }) {
  const { id, merchandise } = line
  const { product, title, image, selectedOptions } = merchandise
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions)

  return (
    <tr className="w-full flex text-start  items-center px-8 py-3 text-center">
      <td className="w-1/5 text-center">
        {image && (
          <Image
            alt={title}
            aspectRatio="1/1"
            data={image}
            height={70}
            loading="lazy"
            width={70}
          />
        )}
      </td>
      <td className="text-sm w-2/5 text-center">
        <Link
          prefetch="intent"
          to={lineItemUrl}
          className="font-semibold text-[14px] text-center "
          onClick={() => {
            if (layout === 'aside') {
              // close the drawer
              window.location.href = lineItemUrl
            }
          }}
        >
          <p>
            <strong>{product.title}</strong>
          </p>
        </Link>
      </td>
      <td className="text-center w-1/5 ">
        <CartLineQuantity line={line} />
      </td>
      <td className="w-1/5 text-center">
        <CartLinePrice line={line} as="span" />
      </td>
    </tr>
  )
}

/**
 * @param {{checkoutUrl: string}}
 */
function CartCheckoutActions({ checkoutUrl }) {
  if (!checkoutUrl) return null

  return (
    <div className="">
      <a
        href={checkoutUrl}
        target="_self"
        className="border border-black bg-[#FFFFFF] cursor-pointer hover:bg-[#862e1b] hover:text-white transition font-bold text-base py-3 block w-full text-center"
      >
        Check out
      </a>
    </div>
  )
}

/**
 * @param {{
 *   children?: React.ReactNode;
 *   cost: CartApiQueryFragment['cost'];
 *   layout: CartMainProps['layout'];
 * }}
 */
export function CartSummary({ cost, layout, children = null }) {
  const className =
    layout === 'page'
      ? 'cart-summary-page basis-4/12 border-2 border-gray p-6 rounded-[13px]'
      : 'cart-summary-aside w-30 border border-gray p-10 rounded-[5px] ml-10'

  return (
    <div aria-labelledby="cart-summary" className={className}>
      <div>
        <h4 className="text-gray-600">Subtotal</h4>
        <dl className="cart-total">
          <dd className="font-Roboto text-[42px] md:text-[28px] font-medium mb-3">
            {cost?.subtotalAmount?.amount ? (
              <Money data={cost?.subtotalAmount} />
            ) : (
              '-'
            )}
          </dd>
        </dl>
      </div>
      <div>
        <h4 className="text-gray-600 ">Discounts</h4>
        <h4 className="font-semibold">save50 ( -$86.98 )</h4>
      </div>

      <div className="mt-5">
        <h4 className="text-gray-600">Total</h4>
        <dl className="cart-total">
          <dd className="font-Roboto text-[42px] md:text-[38px] font-medium  mb-3">
            {cost?.subtotalAmount?.amount ? (
              <Money data={cost?.subtotalAmount} />
            ) : (
              '-'
            )}
          </dd>
        </dl>
      </div>
      <p className="mb-5 text-xs text-gray-500 font-medium pb-2">
        Taxes and shipping calculated at checkout
      </p>
      {children}
    </div>
  )
}

/**
 * @param {{lineIds: string[]}}
 */
function CartLineRemoveButton({ lineIds }) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{ lineIds }}
    >
      <button
        className="text-[14px] text-center text-[#862e1b] font-bold w-[100%]"
        type="submit"
      >
        Remove
      </button>
    </CartForm>
  )
}

/**
 * @param {{line: CartLine}}
 */
function CartLineQuantity({ line }) {
  if (!line || typeof line?.quantity === 'undefined') return null
  const { id: lineId, quantity } = line
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0))
  const nextQuantity = Number((quantity + 1).toFixed(0))

  return (
    <div className="cart-line-quantity">
      {/* <small>Quantity: {quantity} &nbsp;&nbsp;</small> */}
      {/* <CartLineUpdateButton lines={[{id: lineId, quantity: prevQuantity}]}>
        <button
          aria-label="Decrease quantity"
          disabled={quantity <= 1}
          name="decrease-quantity"
          value={prevQuantity}
          className="text-[#862e1b] w-[25px] flex justify-center items-center h-[25px] bg-white rounded-[5px] p-[3px] "
        >
          <span>&#8722; </span>
        </button>
      </CartLineUpdateButton> */}

      {/* <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
        <button
        className="text-[#862e1b] bg-white flex justify-center items-center rounded-[5px] p-[3px] w-[25px] h-[25px]"
          aria-label="Increase quantity"
          name="increase-quantity"
          value={nextQuantity}
        >
          <span>&#43;</span>
        </button>
      </CartLineUpdateButton> */}

      <CartLineRemoveButton lineIds={[lineId]} />
    </div>
  )
}

/**
 * @param {{
 *   line: CartLine;
 *   priceType?: 'regular' | 'compareAt';
 *   [key: string]: any;
 * }}
 */
function CartLinePrice({ line, priceType = 'regular', ...passthroughProps }) {
  if (!line?.cost?.amountPerQuantity || !line?.cost?.totalAmount) return null

  const moneyV2 =
    priceType === 'regular'
      ? line.cost.totalAmount
      : line.cost.compareAtAmountPerQuantity

  if (moneyV2 == null) {
    return null
  }

  return (
    <div className="font-bold text-center text-[25px] ">
      <Money withoutTrailingZeros {...passthroughProps} data={moneyV2} />
    </div>
  )
}

/**
 * @param {{
 *   hidden: boolean;
 *   layout?: CartMainProps['layout'];
 * }}
 */
export function CartEmpty({ hidden = false, layout = 'aside' }) {
  return (
    <div hidden={hidden} className="mb-20 max-w-[1170px] mx-auto">
      <br />
      <p className="font-Roboto text-[19px]">Your cart is currently empty.</p>
      <br />
      <br />
      <Link
        to="/collections"
        className="bg-[#1d1d1d] rounded-[8px] cursor-pointer text-[#fff] hover:bg-[#862E1B] transition text-xl font-bold py-5 px-9 "
        onClick={() => {
          if (layout === 'aside') {
            window.location.href = '/collections'
          }
        }}
      >
        Continue shopping →
      </Link>
      <br />
      <br />
    </div>
  )
}

/**
 * @param {{
 *   discountCodes: CartApiQueryFragment['discountCodes'];
 * }}
 */
function CartDiscounts({ discountCodes }) {
  const codes =
    discountCodes
      ?.filter((discount) => discount.applicable)
      ?.map(({ code }) => code) || []

  return (
    <div>
      {/* Have existing discount, display it with a remove option */}
      <dl hidden={!codes.length}>
        <div>
          <dt>Discount(s)</dt>
          <UpdateDiscountForm>
            <div className="cart-discount">
              <code>{codes?.join(', ')}</code>
              &nbsp;
              <button>Remove</button>
            </div>
          </UpdateDiscountForm>
        </div>
      </dl>

      {/* Show an input to apply a discount */}
      <UpdateDiscountForm discountCodes={codes}>
        <div>
          <input type="text" name="discountCode" placeholder="Discount code" />
          &nbsp;
          <button type="submit">Apply</button>
        </div>
      </UpdateDiscountForm>
    </div>
  )
}

/**
 * @param {{
 *   discountCodes?: string[];
 *   children: React.ReactNode;
 * }}
 */
function UpdateDiscountForm({ discountCodes, children }) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{
        discountCodes: discountCodes || [],
      }}
    >
      {children}
    </CartForm>
  )
}

/**
 * @param {{
 *   children: React.ReactNode;
 *   lines: CartLineUpdateInput[];
 * }}
 */
function CartLineUpdateButton({ children, lines }) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{ lines }}
    >
      {children}
    </CartForm>
  )
}

/** @typedef {CartApiQueryFragment['lines']['nodes'][0]} CartLine */
/**
 * @typedef {{
 *   cart: CartApiQueryFragment | null;
 *   layout: 'page' | 'aside';
 * }} CartMainProps
 */

/** @typedef {import('@shopify/hydrogen/storefront-api-types').CartLineUpdateInput} CartLineUpdateInput */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
