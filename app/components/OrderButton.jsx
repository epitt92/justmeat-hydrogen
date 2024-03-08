import React from 'react';

const OrderButton = () => {
  return (
    <div className="orderBton flex">
      <a
        href="/"
        className="bg-[#862E1B] rounded-[5px] cursor-pointer text-[#fff] hover:bg-[#1d1d1d] transition text-xl font-medium	text-base py-3 px-9 "
      >
        Order Now
      </a>
    </div>
  );
};

export default OrderButton;
