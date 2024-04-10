import { CartForm } from '@shopify/hydrogen'
import { json } from '@shopify/remix-oxygen'

import { useRootLoaderData } from '~/root'

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{ title: `Hydrogen | Cart` }]
}

/**
 * @param {ActionFunctionArgs}
 */
export async function action({ request, context }) {
  const { cart } = context

  const formData = await request.formData()

  const { action, inputs } = CartForm.getFormInput(formData)

  if (!action) {
    throw new Error('No action provided')
  }

  let status = 200
  let result

  switch (action) {
    case CartForm.ACTIONS.LinesAdd:
      result = await cart.addLines(inputs.lines)
      break
    case CartForm.ACTIONS.LinesUpdate:
      result = await cart.updateLines(inputs.lines)
      break
    case CartForm.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds)
      break
    case CartForm.ACTIONS.DiscountCodesUpdate: {
      const formDiscountCode = inputs.discountCode

      // User inputted discount code
      const discountCodes = formDiscountCode ? [formDiscountCode] : []

      // Combine discount codes already applied on cart
      discountCodes.push(...inputs.discountCodes)

      result = await cart.updateDiscountCodes(discountCodes)
      break
    }
    case CartForm.ACTIONS.BuyerIdentityUpdate: {
      result = await cart.updateBuyerIdentity({
        ...inputs.buyerIdentity,
      })
      break
    }
    default:
      throw new Error(`${action} cart action is not defined`)
  }

  const cartId = result.cart.id
  const headers = cart.setCartId(result.cart.id)
  const { cart: cartResult, errors } = result

  const redirectTo = formData.get('redirectTo') ?? null
  if (typeof redirectTo === 'string') {
    status = 303
    headers.set('Location', redirectTo)
  }

  headers.append('Set-Cookie', await context.session.commit())

  return json(
    {
      cart: cartResult,
      errors,
      analytics: {
        cartId,
      },
    },
    { status, headers },
  )
}

export default function Cart() {
  const rootData = useRootLoaderData()
  const cartPromise = rootData.cart

  return (
    <div className="cart w-[95%] md:w-[80%] max-w-[1170px] mx-auto">
      <h1 className="font-Roboto text-[32px] md:text-[48px] text-gray-900 pl-8 md:pl-0 font-medium mb-3 mt-8">
        Shopping Cart
      </h1>
    </div>
  )
}
