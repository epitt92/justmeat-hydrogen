import { redirect } from '@shopify/remix-oxygen'

// fallback wild card for all unauthenticated routes in account section
/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({ request, context, params }) {
  const { cart } = context
  await context.customerAccount.handleAuthStatus()

  // Save discountCode into session
  if (params.code) {
    context.session.set('discountCode', params.code.toUpperCase())
  }

  // Get redirect path from the URL query string
  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const redirectPath = searchParams.get('redirect') || '/'

  const result = await cart.updateDiscountCodes([params.code])
  const headers = cart.setCartId(result.cart.id)

  return redirect(redirectPath, {
    headers: {
      ...headers,
      'Set-Cookie': await context.session.commit(),
    },
  })
}

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
