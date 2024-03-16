import React, { useCallback } from 'react';
import CartLineUpdateButton from './CartLineUpdateButton';
import CartLineRemoveButton from './CartLineRemoveButton';

function CartLineQuantity({ line }) {
  if (!line || typeof line.quantity === 'undefined') return null;

  const { id: lineId, quantity } = line;

  const decreaseQuantity = useCallback(() => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      updateQuantity(newQuantity);
    }
  }, [quantity]);

  const increaseQuantity = useCallback(() => {
    const newQuantity = quantity + 1;
    updateQuantity(newQuantity);
  }, [quantity]);

  const updateQuantity = useCallback((newQuantity) => {
    // Call a function to update the quantity
    console.log('Updating quantity to', newQuantity);
  }, []);

  return (
    <div className="cart-line-quantity">
      <div className="flex gap-[5px] items-center bg-[#862e1b] justify-between p-[5px]">
        <CartLineUpdateButton lines={[{ id: lineId, quantity: quantity - 1 }]}>
          <button
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
            onClick={decreaseQuantity}
            className="text-[#862e1b] w-[25px] flex justify-center items-center h-[25px] bg-white rounded-[5px] p-[3px] "
          >
            <span>&#8722;</span>
          </button>
        </CartLineUpdateButton>
        <small className="text-[#000] font-bold text-[14px] text-center bg-white flex justify-center items-center w-[32px] h-[25px] p-[3px] ">{quantity}</small>
        <CartLineUpdateButton lines={[{ id: lineId, quantity: quantity + 1 }]}>
          <button
            className="text-[#862e1b] bg-white flex justify-center items-center rounded-[5px] p-[3px] w-[25px] h-[25px]"
            aria-label="Increase quantity"
            onClick={increaseQuantity}
          >
            <span>&#43;</span>
          </button>
        </CartLineUpdateButton>
      </div>
      <CartLineRemoveButton lineIds={[lineId]} />
    </div>
  );
}

export default React.memo(CartLineQuantity);
