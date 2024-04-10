import { Link, useLoaderData } from '@remix-run/react'
import { Image, Pagination, getPaginationVariables } from '@shopify/hydrogen'
import { json } from '@shopify/remix-oxygen'

import { ALL_COLLECTIONS_QUERY } from '~/graphql/Collection'

export async function loader({ context, request }) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 4,
  })

  const { collections } = await context.storefront.query(
    ALL_COLLECTIONS_QUERY,
    {
      variables: paginationVariables,
    },
  )

  return json({ collections })
}

export default function Collections() {
  /** @type {LoaderReturnData} */
  const { collections } = useLoaderData()

  return (
    <div className="collections">
      <h1>Collections</h1>
      <Pagination connection={collections}>
        {({ nodes, isLoading, PreviousLink, NextLink }) => (
          <div>
            <PreviousLink>
              {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
            </PreviousLink>
            <CollectionsGrid collections={nodes} />
            <NextLink>
              {isLoading ? 'Loading...' : <span>Load more ↓</span>}
            </NextLink>
          </div>
        )}
      </Pagination>
    </div>
  )
}

/**
 * @param {{collections: CollectionFragment[]}}
 */
function CollectionsGrid({ collections }) {
  return (
    <div className="collections-grid">
      {collections.map((collection, index) => (
        <CollectionItem
          key={collection.id}
          collection={collection}
          index={index}
        />
      ))}
    </div>
  )
}

/**
 * @param {{
 *   collection: CollectionFragment;
 *   index: number;
 * }}
 */
function CollectionItem({ collection, index }) {
  return (
    <Link
      className="collection-item"
      key={collection.id}
      to={`/collections/${collection.handle}`}
      prefetch="intent"
    >
      {collection?.image && (
        <Image
          alt={collection.image.altText || collection.title}
          aspectRatio="1/1"
          data={collection.image}
          loading={index < 3 ? 'eager' : undefined}
        />
      )}
      <h5>{collection.title}</h5>
    </Link>
  )
}
