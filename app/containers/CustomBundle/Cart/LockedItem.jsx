import { useContext } from 'react'

import { useLoaderData } from '@remix-run/react'

import { CustomBundleContext } from '~/contexts'

export function LockedItem() {
  const { bonusProduct } = useLoaderData()
  const { bonusVariant, setBonusVariant, costForOneTime } =
    useContext(CustomBundleContext)

  const bonusVariants = bonusProduct.variants.nodes

  const onBonusChange = (e) => {
    const id = e.target.value
    const newBonus = bonusVariants.find((el) => el.id === id)
    setBonusVariant(newBonus)
  }

  return (
    <>
      {costForOneTime >= 125 ? (
        <select
          className="text-[10px] sm:text-[12px] py-[4px] pl-[2px] pr-[22px] sm:pl-[8px] sm:pr-[28px] w-full sm:w-[178px] sm:rounded-[5px] rounded-none outline-none focus:outline-none bg-auto bg-[url('https://cdn.shopify.com/s/files/1/0672/4776/7778/files/select_svg.svg')] shadow-none focus:shadow-none border border-[#1d1d1d49] text-[#131515]"
          onChange={onBonusChange}
          value={bonusVariant?.id}
        >
          {bonusVariants.map((el, index) => (
            <option key={index} value={el.id}>
              {el.title}
            </option>
          ))}
        </select>
      ) : (
        <span className="text-[12px] font-semibold uppercase mb-1 py-2 w-fit bg-[#E4E4E4] px-5 border border-[#949494]">
          Locked
        </span>
      )}
    </>
  )
}
