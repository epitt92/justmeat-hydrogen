import TrayPhoto from '~/assets/images/TrayPhoto.png'
import BuffaloIllustration from "~/assets/images/BuffaloIllustration.png"
export const DoMeatRight = () => {
  return (
    <section className="bg-[#efeeed] sm:pt-[110px]  sm:pb-[25px] pt-[70px] pb-[32px] relative">
      <div className="container-1120 z-50 relative w-[80%] mx-auto">
        <div
          className="flex flex-col items-center bg-brown-pattern z-50 text-white sm:py-[45px] py-[22px] sm:rounded-[8px] rounded-[6px]"
          style={{ boxShadow: '0px 32px 43px -8px rgba(0, 0, 0, 0.20)' }}
        >
          <div className="text-[14px] font-medium text-center sm:text-left tracking-[3px] leading-[23px] uppercase text-[#ccbdb1]">
          Do Meat Right
          </div>
          <div className="font-dunbar uppercase mt-2 sm:flex sm:text-[36px] sm:text-left text-center text-[24px] font-bold sm:mb-[4px] mb-[3px] leading-tight">
          The hardest part of the meal is done
          </div>
          <div className="w-[70%] text-center font-nunito mt-4">
                No longer sacrifice flavor and quality for time and money. Now, you can have restaurant-quality meats on your table in minutes without the frustration and while honoring your budget.
          </div>

        </div>
      </div>
      <img
        src={BuffaloIllustration}
        className="absolute z-10 sm:w-auto w-[100px] top-[-389px]  left-0 "
      />
      <img
        src={TrayPhoto}
        className="absolute z-10 sm:w-auto w-[100px] sm:top-[-108px] top-[-4px] right-0 "
      />
    <div>
        <div className='font-dunbar uppercase mt-8  sm:text-[36px] text-center text-[24px] font-bold sm:mb-[4px] mb-[3px] leading-tight'>YOU ASK. WE ANSWER.</div>
    </div>
    </section>
  )
}

