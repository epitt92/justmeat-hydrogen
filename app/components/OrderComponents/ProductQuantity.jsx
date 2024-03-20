import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const ProductQuantity = ({ line , onRemove , selectedProducts,setSelectedProducts, layout}) => {
    if (!line) return null;
    const {id , quantity ,priceRange } = line;
    console.log(id);
    const price = priceRange?.maxVariantPrice?.amount;
    const [updateQty, setUpdatedQty] = useState(1);
    const [productAmount,setProductAmount] = useState(price);


     const handleRemove = () => {
        onRemove(id);
      };

      useEffect(() => {
        // Update the selected products array when the quantity changes
        const updatedProducts = selectedProducts.map((product) => {
    
          if (product.id === id) {
            return { ...product, quantity: updateQty , totalAmount:productAmount };
          }
          return product;
        });
        setSelectedProducts(updatedProducts);
      }, [updateQty]);
    
      const updateQuantity = (value) => {
        setUpdatedQty(value);
        setProductAmount((value * price).toFixed(2));
      };


  return (
    <div className="cart-line-quantity flex flex-col items-center justify-center">
    <div className="flex gap-[5px] w-fit items-center bg-[#862e1b] justify-between p-[5px]">
    <button
      onClick={() => updateQuantity(quantity <= 1 ? 1 : quantity - 1)}
      aria-label="Decrease quantity"
      disabled={updateQty <= 1}
      name="decrease-quantity"
      // value={prevQuantity}
      className="text-[#862e1b] w-[25px] flex justify-center items-center h-[25px] bg-white rounded-[5px] p-[3px] "
    >
      <span>&#8722; </span>
    </button>
  <small className="text-[#000] font-bold text-[14px] text-center bg-white flex justify-center items-center w-[32px] h-[25px] p-[3px] ">
    {quantity}
  </small>
    <button
      onClick={() => updateQuantity(quantity + 1)}
      className="text-[#862e1b] bg-white flex justify-center items-center rounded-[5px] p-[3px] w-[25px] h-[25px]"
      aria-label="Increase quantity"
      name="increase-quantity"
      // value={nextQuantity}
    >
      <span>&#43;</span>
    </button>
    </div>
    {layout === "collection" ? <></> :(
        <button
     className="text-[14px] text-center text-[#862e1b] font-bold w-[100%]"
    type="submit"
    onClick={handleRemove}
    > 
     Remove
   </button>
    ) }
   
    </div>
  )
}

export default ProductQuantity;