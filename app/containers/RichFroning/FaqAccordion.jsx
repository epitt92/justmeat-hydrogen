import React from 'react'

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from '@material-tailwind/react'

function Icon({ id, open }) {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="49"
        height="49"
        viewBox="0 0 49 49"
        fill="none"
        className={`${
          id == open ? 'rotate-[180deg]' : ''
        }  transition-transform sm:w-[49px] sm:h-[49px] w-[32px] h-[32px]`}
      >
        <path
          d="M14.2917 20.4166L24.5 30.625L34.7083 20.4166"
          stroke="#7A392D"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
export function FaqAccordion() {
  const [open, setOpen] = React.useState(0)

  const handleOpen = (value) => setOpen(open === value ? 0 : value)

  return (
    <>
      <Accordion
        open={open === 1}
        icon={<Icon id={1} open={open} />}
        className="mb-2 rounded-lg border border-blue-gray-100 bg-[#fff] sm:px-8 pl-[25px] pr-[15px]"
      >
        <AccordionHeader
          onClick={() => handleOpen(1)}
          className={`border-b-0 font-dunbar text-[#231B19] sm:text-base text-[14px] font-bold leading-normal tracking-[0.8px] uppercase  transition-colors ${
            open === 1 ? 'text-[#7A392D] hover:!text-[#7A392D]' : ''
          }`}
        >
          What kind of meat can I buy?
        </AccordionHeader>
        <AccordionBody className="pt-0 font-nunito text-lg font-normal leading-[27px] text-[#231B19] pr-0 xl:pr-9 pb-10">
          Each week, you can choose from chicken, pork, or beef options cooked
          in a variety of ways with unique spices and sauces.
        </AccordionBody>
      </Accordion>
      <Accordion
        open={open === 2}
        icon={<Icon id={2} open={open} />}
        className="mb-2 rounded-lg border border-blue-gray-100 bg-[#fff] sm:px-8 pl-[25px] pr-[15px]"
      >
        <AccordionHeader
          onClick={() => handleOpen(2)}
          className={`border-b-0 font-dunbar text-[#231B19]  sm:text-base text-[14px] font-bold leading-normal tracking-[0.8px] uppercase transition-colors ${
            open === 2 ? 'text-[#7A392D] hover:!text-[#7A392D]' : ''
          }`}
        >
          Can I get meat delivery weekly?
        </AccordionHeader>
        <AccordionBody className="pt-0 font-nunito text-lg font-normal leading-[27px] text-[#231B19] pr-0 xl:pr-9 pb-10">
          You can get your meat delivered every 15 or 30 days.
        </AccordionBody>
      </Accordion>
      <Accordion
        open={open === 3}
        icon={<Icon id={3} open={open} />}
        className="mb-2 rounded-lg border border-blue-gray-100 bg-[#fff] sm:px-8 pl-[25px] pr-[15px]"
      >
        <AccordionHeader
          onClick={() => handleOpen(3)}
          className={`border-b-0 font-dunbar text-[#231B19]  sm:text-base text-[14px] font-bold leading-normal tracking-[0.8px] uppercase transition-colors ${
            open === 3 ? 'text-[#7A392D] hover:!text-[#7A392D]' : ''
          }`}
        >
          How do I choose my meat?
        </AccordionHeader>
        <AccordionBody className="pt-0 font-nunito text-lg font-normal leading-[27px] text-[#231B19] pr-0 xl:pr-9  pb-10">
          When you go to the order page, you will choose between a subscription
          and a one time purchase and then see which meat options to choose
          from.
        </AccordionBody>
      </Accordion>
      <Accordion
        open={open === 4}
        icon={<Icon id={4} open={open} />}
        className="mb-2 rounded-lg border border-blue-gray-100 bg-[#fff] sm:px-8 pl-[25px] pr-[15px]"
      >
        <AccordionHeader
          onClick={() => handleOpen(4)}
          className={`border-b-0 font-dunbar text-[#231B19]  sm:text-base text-[14px] font-bold leading-normal tracking-[0.8px] uppercase transition-colors ${
            open === 4 ? 'text-[#7A392D] hover:!text-[#7A392D]' : ''
          }`}
        >
          When does my meat arrive?
        </AccordionHeader>
        <AccordionBody className="pt-0 font-nunito text-lg font-normal leading-[27px] text-[#231B19] pr-0 xl:pr-9 pb-10">
          Depending on the shipping option you choose, within 1-5 business days.
        </AccordionBody>
      </Accordion>
      <Accordion
        open={open === 5}
        icon={<Icon id={5} open={open} />}
        className="mb-2 rounded-lg border border-blue-gray-100 bg-[#fff] sm:px-8 pl-[25px] pr-[15px]"
      >
        <AccordionHeader
          onClick={() => handleOpen(5)}
          className={`border-b-0 font-dunbar text-[#231B19] sm:text-base text-[14px] font-bold leading-normal tracking-[0.8px] uppercase transition-colors ${
            open === 5 ? 'text-[#7A392D] hover:!text-[#7A392D]' : ''
          }`}
        >
          Is the meat precooked?
        </AccordionHeader>
        <AccordionBody className="pt-0 font-nunito text-lg font-normal leading-[27px] text-[#231B19] pr-0 xl:pr-9 pb-10">
          Yes! All meat is precooked, chilled, and then shipped to you. All you
          have to do is reheat!
        </AccordionBody>
      </Accordion>
      <Accordion
        open={open === 6}
        icon={<Icon id={6} open={open} />}
        className="mb-2 rounded-lg border border-blue-gray-100 bg-[#fff] sm:px-8 pl-[25px] pr-[15px]"
      >
        <AccordionHeader
          onClick={() => handleOpen(6)}
          className={`border-b-0 font-dunbar text-[#231B19] sm:text-base text-[14px] font-bold leading-normal tracking-[0.8px] uppercase transition-colors ${
            open === 6 ? 'text-[#7A392D] hover:!text-[#7A392D]' : ''
          }`}
        >
          how is the meat shipped?
        </AccordionHeader>
        <AccordionBody className="pt-0 font-nunito text-lg font-normal leading-[27px] text-[#231B19] pr-0 xl:pr-9 pb-10">
          All meat is sent chilled and packaged with an insulated liner
          surrounded by ice packets to ensure it will reach your door at a safe
          temperature.
        </AccordionBody>
      </Accordion>
      <Accordion
        open={open === 7}
        icon={<Icon id={7} open={open} />}
        className="mb-2 rounded-lg border border-blue-gray-100 bg-[#fff] sm:px-8 pl-[25px] pr-[15px]"
      >
        <AccordionHeader
          onClick={() => handleOpen(7)}
          className={`border-b-0 font-dunbar text-[#231B19] sm:text-base text-[14px] font-bold leading-normal tracking-[0.8px] uppercase transition-colors ${
            open === 7 ? 'text-[#7A392D] hover:!text-[#7A392D]' : ''
          }`}
        >
          Where is the meat sourced?
        </AccordionHeader>
        <AccordionBody className="pt-0 font-nunito text-lg font-normal leading-[27px] text-[#231B19] pr-0 xl:pr-9 pb-10">
          We are a Utah company that sources 100% real meat from trusted local
          ranches. Selecting grass fed ranches, we prioritize that our meat is
          of the highest standards of taste and nutritional value.
        </AccordionBody>
      </Accordion>
      <Accordion
        open={open === 8}
        icon={<Icon id={8} open={open} />}
        className="mb-2 rounded-lg border border-blue-gray-100 bg-[#fff] sm:px-8 pl-[25px] pr-[15px]"
      >
        <AccordionHeader
          onClick={() => handleOpen(8)}
          className={`border-b-0 font-dunbar text-[#231B19] sm:text-base text-[14px] font-bold leading-normal tracking-[0.8px] uppercase transition-colors ${
            open === 8 ? 'text-[#7A392D] hover:!text-[#7A392D]' : ''
          }`}
        >
          How should i store my meat?
        </AccordionHeader>
        <AccordionBody className="pt-0 font-nunito text-lg font-normal leading-[27px] text-[#231B19] pr-0 xl:pr-9 pb-10">
          All sealed meats can be stored in the refrigerator for 10-14 days upon
          arrival. Once the package is opened, we recommend consuming the
          refrigerated meat within 3-5 days. If this timeline will not work, all
          meats can be stored in the freezer for 4-6 months.
        </AccordionBody>
      </Accordion>
    </>
  )
}
