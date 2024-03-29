import { useContext } from 'react'

import { ProductContext } from '~/contexts'
import CustomProgressBar from '~/components/CustomProgressBar'

export function ProgressBar() {
  const { totalCost } = useContext(ProductContext)

  return (
    <div>
      <div className="progress-bar ">
        <CustomProgressBar cost={totalCost} />
      </div>
      <div className="free-item pl-[10px] mb-5">
        <img
          src="https://cdn.shopify.com/s/files/1/0555/1751/1961/files/Ranch_Rub_Chicken_Breast_Free.png"
          alt="cart free"
        />
      </div>
    </div>
  )
}
