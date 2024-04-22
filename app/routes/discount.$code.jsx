import { redirect } from '@shopify/remix-oxygen'

export async function loader({ request, context, params }) {
  const { cart } = context
  await context.customerAccount.handleAuthStatus()

  // Save discountCode into session
  if (params.code) {
    context.session.set('discountCode', params.code.toUpperCase())
  }

  const redirectPath =
    params.code.toUpperCase() === 'FRONING' ? '/rich-froning' : '/'

  const result = await cart.updateDiscountCodes([params.code])
  const headers = cart.setCartId(result.cart.id)

  return redirect(redirectPath, {
    headers: {
      ...headers,
      'Set-Cookie': await context.session.commit(),
    },
  })
}
