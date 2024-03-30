import { useContext } from 'react'
import { useLoaderData } from '@remix-run/react'

import { ProductContext } from '~/contexts'

export function LockedItem() {
  const {
    bonuses: { nodes: bonuses },
  } = useLoaderData()

  const { bonus, setBonus, totalCost } = useContext(ProductContext)

  const onBonusChange = (e) => {
    const id = e.target.value
    const newBonus = bonuses.find((el) => el.variants.nodes[0].id === id)
    setBonus(newBonus)
  }

  return (
    <>
      {totalCost >= 125 ? (
        <select
          className="text-[12px] py-[8px] w-[70%] rounded-[5px] outline-none focus:outline-none bg-auto  focus:border-none bg-[url('https://cdn.shopify.com/s/files/1/0672/4776/7778/files/select_svg.svg')] shadow-none  focus:shadow-none focus:border-[#1d1d1d99] border border-[#1d1d1d49] text-[#131515]  "
          onChange={onBonusChange}
          value={bonus?.variants.nodes[0].id}
        >
          {bonuses.map((el, index) => (
            <option key={index} value={el.variants.nodes[0].id}>
              {el.title}
            </option>
          ))}
        </select>
      ) : (
        <span className="text-[12px] font-semibold uppercase mb-1 py-2 w-fit bg-[#E4E4E4] px-5 border border-[#949494]  ">
          Locked
        </span>
      )}
    </>
  )
}
