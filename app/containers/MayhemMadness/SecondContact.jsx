import justmeatsBoxPart from '~/assets/images/justmeants-box-part.png'

export const SecondContact = () => {
  return (
    <section className="bg-[#efeeed] sm:pt-[110px] sm:pb-[100px] pt-[70px] pb-[62px] relative">
      <div className="container-1120">
        <div
          className="flex flex-col items-center bg-brown-pattern text-white sm:py-[45px] py-[22px] sm:rounded-[8px] rounded-[6px]"
          style={{ boxShadow: '0px 32px 43px -8px rgba(0, 0, 0, 0.20)' }}
        >
          <div className="text-[14px] text-center sm:text-left tracking-[3px] leading-[23px] text-[#ccbdb1]">
            PRE COOKED RESTAURANT QUALITY MEATS
          </div>
          <div className="sm:flex sm:text-[36px] sm:text-left text-center text-[24px] font-bold sm:mb-[4px] mb-[3px] leading-tight">
            AT GROCERY STORE PRICES
          </div>
        </div>
      </div>
      <img
        src={justmeatsBoxPart}
        className="absolute sm:w-auto w-[100px] sm:top-[-180px] top-[-4px] sm:left-0 left-[-25px]"
      />
    </section>
  )
}
