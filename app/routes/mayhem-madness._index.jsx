import { Header } from '~/containers/MayhemMadness/Header'
import { Banner } from '~/containers/MayhemMadness/Banner'
import { Featured } from '~/containers/MayhemMadness/Featured'

export default function MayhemMadness() {
  return (
    <>
      <Header />
      <main className="relative font-dunbar tracking-[1px] leading-[1px]">
        <Banner />
        <Featured />
      </main>
    </>
  )
}
