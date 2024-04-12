import { Banner } from '~/containers/RichFroning/Banner'
import { CustomerReviews } from '~/containers/RichFroning/CustomerReviews'
import { DoMeatRight } from '~/containers/RichFroning/DoMeatRight'

export default function RichFroning() {
  return (
    <main className="relative font-dunbar tracking-[1px] leading-1 text-[#231B19]">
      <Banner />
      <CustomerReviews/>
      <DoMeatRight/>
    </main>
  )
}
