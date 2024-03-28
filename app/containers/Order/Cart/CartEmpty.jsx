export function CartEmpty({ hidden = false }) {
  return (
    <div hidden={hidden} className="h-[260px]">
      <br />
      <div className="absolute bottom-0 w-full p-5 pb-3">
        <div className="justify-center block w-full xl:hidden">
          <span className="w-fit text-[14px] p-[10px] font-semibold text-white bg-[#862e1b]">
            Return to Shop
          </span>
        </div>
        <div className="border-b-4 flex justify-between items-end pb-[10px] border-black w-full">
          <div className="flex w-4/12">
            <p className="pr-1 text-base font-semibold">Total:</p>
            <p className="text-base font-semibold">$0.00</p>
          </div>
          <div className="flex items-center justify-end w-8/12 pointer-events-none select-none ">
            <a
              // href={checkoutUrl}
              className=" text-[15px] text-center py-[15px] px-[20px] font-semibold text-white bg-[#6e6e6e]"
              target="_self"
            >
              Spend $75 to Continue
            </a>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-6 ">
          <div className="flex flex-col items-end justify-end gap-1">
            <p className="text-[14px] font-semibold text-black">
              Free Bonus Meat (unlocked at $125)
            </p>
            <span className="text-[12px] font-semibold uppercase mb-1 py-2 w-fit bg-[#E4E4E4] px-5 border border-[#949494]  ">
              Locked
            </span>
          </div>
          <img
            className="w-[80px] h-[80px] object-contain "
            src="https://cdn.shopify.com/s/files/1/0672/4776/7778/files/free-meat-unlocked-at-125-536967_medium_d6071a01-575e-4b92-99c9-67caead4140f.png"
            alt=""
          />
        </div>
      </div>
    </div>
  )
}
