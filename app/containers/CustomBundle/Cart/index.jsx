import { CartDetails } from './CartDetails'
import { CartEmpty } from './CartEmpty'
import { ProgressBar } from './ProgressBar'

export function Cart({ layout, onCheckout }) {
  return (
    <div className="cart-main">
      <ProgressBar />
      <CartDetails layout={layout} onCheckout={onCheckout} />
      <CartEmpty />
    </div>
  )
}
