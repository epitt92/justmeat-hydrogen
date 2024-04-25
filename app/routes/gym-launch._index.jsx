import { getPaginationVariables } from '@shopify/hydrogen'
import { json } from '@shopify/remix-oxygen'

import { BannerHead } from '~/containers/GymLaunch/BannerHead'
import { ChefCook } from '~/containers/GymLaunch/ChefCook'
import { EarnAnywhere } from '~/containers/GymLaunch/EarnAnywhere'
import { Featured } from '~/containers/GymLaunch/Featured'
import { FirstContact } from '~/containers/GymLaunch/FirstContact'
import { FirstInfo } from '~/containers/GymLaunch/FirstInfo'
import { HowItWorks } from '~/containers/GymLaunch/HowItWorks'
import { Reviews } from '~/containers/GymLaunch/Reviews'
import { SecondContact } from '~/containers/GymLaunch/SecondContact'
import { SecondInfo } from '~/containers/GymLaunch/SecondInfo'
import { COLLECTIONS_QUERY } from '~/graphql/Collection'

export const meta = () => {
  return [{ title: 'Gym Launch - Just Meats' }]
}

export async function loader({ request, context }) {
  const { storefront } = context

  const variables = getPaginationVariables(request, { pageBy: 50 })
  const collectionHandles = ['featured', 'most-popular', 'trending']
  const query = collectionHandles.join(' OR ')

  const {
    collections: { nodes: collections },
  } = await storefront.query(COLLECTIONS_QUERY, {
    variables: {
      ...variables,
      query,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  })

  return json({ collections })
}

export default function MayhemMadness() {
  return (
    <main className="relative font-dunbar tracking-[1px] leading-1 text-[#231B19]">
      <BannerHead />
      <EarnAnywhere />
      <Featured />
      <FirstContact />
      <FirstInfo />
      <SecondInfo />
      <SecondContact />
      <ChefCook />
      <HowItWorks />
      <Reviews />
    </main>
  )
}
