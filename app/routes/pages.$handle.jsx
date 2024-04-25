import { redirect } from '@shopify/remix-oxygen'

export async function loader({ params, context }) {
  if (!params.handle) {
    throw new Error('Missing page handle')
  }

  return redirect(`/${params.handle}`, {
    headers: {
      'Set-Cookie': await context.session.commit(),
    },
  })
}
