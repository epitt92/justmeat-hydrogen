import { CartForm, Image, Money } from '@shopify/hydrogen'
import { Link } from '@remix-run/react'
import { useVariantUrl } from '~/lib/variants'
import { useRootLoaderData } from '~/root'
import { useEffect, useState } from 'react'
import CustomProgressBar from './ui/CustomProgressBar'

/**
 * @param {CartMainProps}
 */

export function CartMain({
  layout,
  cart,
  selectedProducts,
  setSelectedProducts,
}) {
  const [subTotal, setSubTotal] = useState(0)
  const linesCount = Boolean(selectedProducts.length || 0)
  useEffect(() => {
    // Calculate the total cost of all products in selectedProducts
    const totalCost = selectedProducts.reduce(
      (acc, curr) => acc + parseFloat(curr.totalAmount),
      0,
    )
    // Update the mainCart state with the total cost
    setSubTotal(totalCost)
  }, [selectedProducts])

  const withDiscount =
    cart &&
    Boolean(cart?.discountCodes?.filter((code) => code.applicable)?.length)
  const className = `cart-main ${withDiscount ? 'with-discount' : ''}`

  const handleRemove = (productId) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.filter((product) => product.id !== productId),
    )
  }

  return (
    <div className={className}>
      <ProgessBar cost={subTotal} />
      <CartDetails
        cart={cart}
        layout={layout}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        onRemove={handleRemove}
        subTotal={subTotal}
      />
      <CartEmpty hidden={linesCount} layout={layout} />
    </div>
  )
}

/**
 * @param {CartMainProps}
 */
function CartDetails({
  layout,
  cart,
  selectedProducts,
  onRemove,
  setSelectedProducts,
  subTotal,
}) {
  const cartHasItems = selectedProducts.length > 0
  // const cartHasItems = !!cart && cart.totalQuantity < 0;
  return (
    <div className="cart-details flex flex-col justify-between">
      <CartLines
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        onRemove={onRemove}
      />
      {cartHasItems && (
        <div className="p-5 pb-3 bg-white">
          <div className="border-b-4 pb-[10px] border-black">
            <CartSummary cost={subTotal} layout={layout}>
              {/* <CartDiscounts discountCodes={cart.discountCodes} /> */}
              <CartCheckoutActions
                // checkoutUrl={cart.checkoutUrl}
                cost={subTotal}
              />
            </CartSummary>
          </div>
          <div className=" pt-4 flex gap-3 justify-end ">
            <div className="flex flex-1 flex-col items-end gap-1 justify-end">
              <p className="text-[14px] font-semibold text-black">
                Free Bonus Meat (unlocked at $125)
              </p>
              <LockedItem cost={subTotal} />
            </div>
            <img
              className="w-[80px] h-[80px] object-contain "
              src="https://cdn.shopify.com/s/files/1/0672/4776/7778/files/free-meat-unlocked-at-125-536967_medium_d6071a01-575e-4b92-99c9-67caead4140f.png"
              alt=""
            />
          </div>
        </div>
      )}
    </div>
  )
}

function ProgessBar({ cost }) {
  return (
    <div>
      <div className="progress-bar ">
        <CustomProgressBar cost={cost} />
      </div>
      <div className="free-item pl-[10px] mb-5">
        <img
          src="https://cdn.shopify.com/s/files/1/0555/1751/1961/files/Ranch_Rub_Chicken_Breast_Free.png"
          alt="cart free"
        />
      </div>
    </div>
  )
}

function LockedItem({ cost }) {
  return (
    <>
      {addAmount(cost, '0') >= 125 ? (
        <select
          className="text-[12px] py-[8px] w-[70%] rounded-[5px] outline-none focus:outline-none bg-auto  focus:border-none bg-[url('https://cdn.shopify.com/s/files/1/0672/4776/7778/files/select_svg.svg')] shadow-none  focus:shadow-none focus:border-[#1d1d1d99] border border-[#1d1d1d49] text-[#131515]  "
          name=""
          id=""
        >
          <option value="">Hawaiian Shredded Pork</option>
          <option value="">Raspberry BBQ Chicken Breast</option>
          <option value="">Hawaiian Teriyaki Beef</option>
          <option value="">Smoked Texas Brisket</option>
        </select>
      ) : (
        <span className="text-[12px] font-semibold uppercase mb-1 py-2 w-fit bg-[#E4E4E4] px-5 border border-[#949494]  ">
          Locked
        </span>
      )}
    </>
  )
}

function CartLines({ selectedProducts, onRemove, setSelectedProducts }) {
  if (!selectedProducts) return null

  return (
    <div aria-labelledby="cart-lines" className="h-[260px] overflow-auto">
      <ul>
        {selectedProducts.map((product) => (
          <CartLineItem
            key={product.id}
            line={product}
            onRemove={onRemove}
            setSelectedProducts={setSelectedProducts}
            selectedProducts={selectedProducts}
          />
        ))}
      </ul>
    </div>
  )
}
// /**
//  * @param {{
//  *   layout: CartMainProps['layout'];
//  *   lines: CartApiQueryFragment['lines'] | undefined;
//  * }}
//  */
// function CartLines({lines, layout, selectedProducts}) {
//   if (!lines) return null;

//   return (
//     <div aria-labelledby="cart-lines" className="h-[260px] overflow-auto">
//       <ul>
//         {lines.nodes.map((line) => (
//           <CartLineItem
//             key={line.id}
//             line={line}
//             selectedProducts={selectedProducts}
//             layout={layout}
//           />
//         ))}
//       </ul>
//     </div>
//   );
// }

function CartLineItem({
  line,
  onRemove,
  selectedProducts,
  setSelectedProducts,
}) {
  const { id, title, featuredImage, priceRange } = line
  const image = featuredImage.url
  const price = priceRange?.maxVariantPrice?.amount
  const [updateQty, setUpdatedQty] = useState(1)
  const [productAmount, setProductAmount] = useState(price)

  const handleRemove = () => {
    onRemove(id)
  }

  useEffect(() => {
    // Update the selected products array when the quantity changes
    const updatedProducts = selectedProducts.map((product) => {
      if (product.id === id) {
        return { ...product, quantity: updateQty, totalAmount: productAmount }
      }
      return product
    })
    setSelectedProducts(updatedProducts)
  }, [updateQty])

  const updateQuantity = (value) => {
    setUpdatedQty(value)
    setProductAmount((value * price).toFixed(2))
  }
  return (
    <li key={id} className="cart-line pl-[10px] mb-5 flex gap-4">
      {featuredImage && (
        <img src={image} alt="" height={100} loading="lazy" width={72} />
      )}

      <div className="flex  flex-1 pr-[10px] justify-between items-center ">
        <div className="h-fit flex-1">
          <p className="font-semibold text-[14px]  text-center ">
            <strong className="pr-[10px] flex justify-center">{title}</strong>
          </p>

          <p className="font-bold text-center text-[25px]">
            ${priceRange.maxVariantPrice.amount}
          </p>
          {/* <CartLinePrice line={line} as="span" /> */}
        </div>
        <div className="cart-line-quantity">
          <div className="flex gap-[5px] items-center bg-[#862e1b] justify-between p-[5px]">
            <button
              onClick={() => updateQuantity(updateQty <= 1 ? 1 : updateQty - 1)}
              aria-label="Decrease quantity"
              disabled={updateQty <= 1}
              name="decrease-quantity"
              // value={prevQuantity}
              className="text-[#862e1b] w-[25px] flex justify-center items-center h-[25px] bg-white rounded-[5px] p-[3px] "
            >
              <span>&#8722; </span>
            </button>
            <small className="text-[#000] font-bold text-[14px] text-center bg-white flex justify-center items-center w-[32px] h-[25px] p-[3px] ">
              {updateQty}
            </small>
            <button
              onClick={() => updateQuantity(updateQty + 1)}
              className="text-[#862e1b] bg-white flex justify-center items-center rounded-[5px] p-[3px] w-[25px] h-[25px]"
              aria-label="Increase quantity"
              name="increase-quantity"
              // value={nextQuantity}
            >
              <span>&#43;</span>
            </button>
          </div>
          <button
            className="text-[14px] text-center text-[#862e1b] font-bold w-[100%]"
            type="submit"
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>
        {/* <CartLineQuantity line={line} onRemove={onRemove} /> */}
      </div>
    </li>
  )
}

// /**
//  * @param {{
//  *   layout: CartMainProps['layout'];
//  *   line: CartLine;
//  * }}
//  */
// function CartLineItem({layout, line, selectedProducts}) {
//   console.log(selectedProducts);
//   const {id, merchandise, cost} = line;
//   const {amountPerQuantity} = cost;
//   const {product, title, image, selectedOptions} = selectedProducts;
//   const lineItemUrl = useVariantUrl(product.handle, selectedOptions);

//   return (
//     <li key={id} className="cart-line pl-[10px] mb-5 flex gap-4">
//       {image && (
//         <Image
//           // alt={title}
//           // aspectRatio="1/1"
//           data={image}
//           height={100}
//           loading="lazy"
//           width={72}
//         />
//       )}

//       <div className="flex  flex-1 pr-[10px] justify-between items-center ">
//         <div className="h-fit flex-1">
//           <Link
//             prefetch="intent"
//             to={lineItemUrl}
//             className="font-semibold text-[14px]  text-center "
//             // onClick={() => {
//             //   if (layout === 'aside') {
//             //     // close the drawer
//             //     window.location.href = lineItemUrl;
//             //   }
//             // }}
//           >
//             <p>
//               <strong className="pr-[10px] flex justify-center">{title}</strong>
//             </p>
//           </Link>
//           <p className="font-bold text-center text-[25px]">
//             ${amountPerQuantity.amount}
//           </p>
//           {/* <CartLinePrice line={line} as="span" /> */}
//         </div>
//         {/* <ul>
//           {selectedOptions.map((option) => (
//             <li key={option.name}>
//               <small>
//                 {option.name}: {option.value}
//               </small>
//             </li>
//           ))}
//         </ul> */}
//         <CartLineQuantity line={line} />
//       </div>
//     </li>
//   );
// }

// /**
//  * @param {{checkoutUrl: string}}
//  */
function CartCheckoutActions({ cost }) {
  // if (!checkoutUrl) return null;
  return (
    <>
      {addAmount(cost, '0') >= 75 ? (
        <div className="flex justify-center items-center w-1/2 bg-[#425b34]">
          <a
            // href={checkoutUrl}
            className="bg-[#425b34] text-[15px] py-[10px] font-semibold text-white"
            target="_self"
          >
            <p>Continue to Checkout </p>
          </a>
        </div>
      ) : (
        <div className="flex justify-center items-center w-6/12 pointer-events-none select-none  bg-[#6e6e6e]">
          <a
            // href={checkoutUrl}
            className=" text-[15px] text-center py-[10px] font-semibold text-white"
            target="_self"
          >
            Spend $75 to Continue
          </a>
        </div>
      )}
    </>
  )
}

export function CartSummary({ cost, layout, children = null }) {
  const className =
    layout === 'page' ? 'cart-summary-page' : 'cart-summary-aside'
  return (
    <div
      aria-labelledby="cart-summary"
      className={`${className} flex justify-between items-end `}
    >
      {/* <h4>Totals</h4> */}
      <dl className="cart-subtotal flex font-semibold text-base">
        <dt>Total: </dt>
        {cost ? (
          <span className="text-[20px] pr-1 line-through decoration-[#000] decoration-[3px] text-[#919191] ">
            {addAmount(cost, '11.45')}
          </span>
        ) : (
          '-'
        )}
        <dd>
          {cost ? (
            // <Money data={cost} />
            <span className="font-semibold text-center text-base">
              {cost.toFixed(2)}
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

function addAmount(baseAmount, additionalAmount) {
  // Parse the base amount and additional amount as floats
  const base = parseFloat(baseAmount['amount'])
  const additional = parseFloat(additionalAmount)

  // Check if the base amount is a valid number
  if (isNaN(base)) {
    console.error('Invalid base amount:', baseAmount)
    return null
  }

  // Check if the additional amount is a valid number
  if (isNaN(additional)) {
    console.error('Invalid additional amount:', additionalAmount)
    return null
  }

  // Calculate the sum of base and additional amounts
  let sum = base + additional

  // Round the sum to 2 decimal places
  sum = Math.round((sum + Number.EPSILON) * 100) / 100

  // Convert the sum to a string
  let sumStr = sum.toString()

  // Check if the sum has decimal part
  const decimalIndex = sumStr.indexOf('.')
  if (decimalIndex === -1) {
    // If no decimal part, add '.00' to the end
    sumStr += '.00'
  } else {
    // If decimal part exists, ensure there are always two digits after the decimal point
    const decimalDigits = sumStr.length - decimalIndex - 1
    if (decimalDigits === 1) {
      // If only one digit after the decimal point, add a zero
      sumStr += '0'
    } else if (decimalDigits > 2) {
      // If more than two digits after the decimal point, round to two digits
      sumStr = sum.toFixed(2)
    }
  }
  const finalResult = parseFloat(sumStr)
  return sumStr
}

// // Example usage:
// const result = addAmount("11.45", "11.45");
// console.log(result); // Output: "32.85"

// /**
//  * @param {{lineIds: string[]}}
//  */
// function CartLineRemoveButton({lineIds}) {
//   return (
//     <CartForm
//       route="/products/custom-bundle"
//       action={CartForm.ACTIONS.LinesRemove}
//       inputs={{lineIds}}
//     >
//       <button
//         className="text-[14px] text-center text-[#862e1b] font-bold w-[100%]"
//         type="submit"
//       >
//         Remove
//       </button>
//     </CartForm>
//   );
// }

// /**
//  * @param {{line: CartLine}}
//  */

// function CartLineQuantity({line , onRemove}) {

//   const {id,priceRange} = line;
//   const price = priceRange?.maxVariantPrice?.amount;
//   const [updateQty, setUpdatedQty] = useState(1);

//   const handleRemove = () => {
//     onRemove(id);
//   };

//   // useEffect(() => {
//   //   // Update the selected products array when the quantity changes
//   //   const updatedProducts = selectedProducts.map((product) => {
//   //     if (product.id === id) {
//   //       return { ...product, quantity: updateQty };
//   //     }
//   //     return product;
//   //   });
//   //   setSelectedProducts(updatedProducts);
//   // }, [updateQty]);

//   const updateQuantity = (value) => {
//     setUpdatedQty(value);
//   };

//   return (
//     <div className="cart-line-quantity">
//       <div className="flex gap-[5px] items-center bg-[#862e1b] justify-between p-[5px]">
//         {/* <CartLineUpdateButton lines={[{id: lineId, quantity: updateQty}]}> */}
//           <button
//             onClick={() => updateQuantity(updateQty <= 1 ? 1 : updateQty - 1)}
//             aria-label="Decrease quantity"
//             disabled={updateQty <= 1}
//             name="decrease-quantity"
//             // value={prevQuantity}
//             className="text-[#862e1b] w-[25px] flex justify-center items-center h-[25px] bg-white rounded-[5px] p-[3px] "
//           >
//             <span>&#8722; </span>
//           </button>
//         {/* </CartLineUpdateButton> */}
//         <small className="text-[#000] font-bold text-[14px] text-center bg-white flex justify-center items-center w-[32px] h-[25px] p-[3px] ">
//           {updateQty}
//         </small>
//         {/* <CartLineUpdateButton lines={[{id: lineId, quantity: updateQty}]}> */}
//           <button
//             onClick={() => updateQuantity(updateQty + 1)}
//             className="text-[#862e1b] bg-white flex justify-center items-center rounded-[5px] p-[3px] w-[25px] h-[25px]"
//             aria-label="Increase quantity"
//             name="increase-quantity"
//             // value={nextQuantity}
//           >
//             <span>&#43;</span>
//           </button>
//         {/* </CartLineUpdateButton> */}
//       </div>
//       {/* <CartLineRemoveButton lineIds={[lineId]} /> */}
//       <button
//         className="text-[14px] text-center text-[#862e1b] font-bold w-[100%]"
//         type="submit"
//         onClick={handleRemove}
//       >
//         Remove
//       </button>
//     </div>
//   );
// }

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

  const moneyV3 = line.cost.amountPerQuantity

  if (moneyV2 == null) {
    return null
  }

  return (
    <div className="font-bold text-center text-[25px] ">
      <Money withoutTrailingZeros {...passthroughProps} data={moneyV3} />
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
    <div hidden={hidden} className="h-[260px]">
      <br />
      <div className=" p-5 pb-3 absolute bottom-0 w-full ">
        <div className="border-b-4 flex justify-between items-end pb-[10px] border-black w-full ">
          <div className="w-4/12 flex">
            <p className="pr-1 text-base font-semibold">Total:</p>
            <p className="text-base font-semibold">$0.00</p>
          </div>
          <div className="flex justify-center items-center w-8/12 pointer-events-none select-none  bg-[#6e6e6e]">
            <a
              // href={checkoutUrl}
              className=" text-[15px] text-center py-[10px] font-semibold text-white"
              target="_self"
            >
              Spend $75 to Continue
            </a>
          </div>
        </div>
        <div className=" pt-6 flex gap-3 justify-end ">
          <div className="flex  flex-col items-end gap-1 justify-end">
            <p className="text-[14px] font-semibold text-black">
              Free Bonus Meat (unlocked at $125)
            </p>
            <span className="text-[12px] font-semibold uppercase mb-1 py-2 w-fit bg-[#E4E4E4] px-5 border border-[#949494]  ">
              Locked
            </span>
          </div>
          <img
            className="w-[80px] h-[80px] object-contain "
            src="https://cdn.shopify.com/s/files/1/0672/4776/7778/files/free-meat-unlocked-at-125-536967_medium_d6071a01-575e-4b92-99c9-67caead4140f.png"
            alt=""
          />
        </div>
      </div>
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
      route="/products/custom-bundle"
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
      route="/products/custom-bundle"
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
