import { redirect } from '@shopify/remix-oxygen'

// fallback wild card for all unauthenticated routes in account section
/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({ context }) {
  return redirect('/rich-froning', {
    headers: {
      'Set-Cookie': await context.session.commit(),
    },
  })
}

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
