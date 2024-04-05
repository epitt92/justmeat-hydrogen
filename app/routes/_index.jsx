import { defer } from '@shopify/remix-oxygen'
import { RECOMMENDED_PRODUCTS_QUERY } from '~/graphql/Product'
import { FEATURED_COLLECTION_QUERY } from '~/graphql/Collection'
import { Banner } from '~/containers/Home/Banner'
import { Featured } from '~/containers/Home/Featured'

export async function loader({ context }) {
  const { storefront } = context
  const { collections } = await storefront.query(FEATURED_COLLECTION_QUERY)
  const featuredCollection = collections.nodes[0]
  const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY)

  return defer({ featuredCollection, recommendedProducts })
}

export default function Homepage() {
  return (
    <main className="relative">
      <Banner />
      <Featured />
    </main>
  )
}
