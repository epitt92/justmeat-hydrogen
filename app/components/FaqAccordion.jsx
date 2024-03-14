import React from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';

function Icon({id, open}) {
  return (
    <div>


      <svg
        width="13"
        height="8"
        viewBox="0 0 19 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          id === open ? 'rotate-[-90deg]' : ''
        }  transition-transform`}
      >
        <path
          d="M8.72206 12.0368C9.12231 12.5324 9.87769 12.5324 10.2779 12.0368L18.6848 1.62834C19.213 0.974338 18.7475 0 17.9069 0L1.09314 0C0.252455 0 -0.213036 0.974337 0.315195 1.62834L8.72206 12.0368Z"
          fill="black"
        />
      </svg>
    </div>
  );
}

function FaqAccordion() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader
          className="text-black font-semibold border-none text-[17px]"
          onClick={() => handleOpen(1)}
        >
          What kind of meat can I buy?
        </AccordionHeader>
        <AccordionBody className="p-5 text-center text-base">
          Each week, you can choose from <span className='bg-[#d9ead3]'>chicken, pork, or beef options</span> cooked
          in a variety of ways with unique spices and sauces.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader
          className="text-black font-semibold border-none text-[17px]"
          onClick={() => handleOpen(2)}
        >
          Can I get meats delivered weekly?
        </AccordionHeader>
        <AccordionBody className="p-5 text-center text-base">
          You can get your meat delivered every 15 or 30 days.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
        <AccordionHeader
          className="text-black font-semibold border-none text-[17px]"
          onClick={() => handleOpen(3)}
        >
          How do I choose my meat?
        </AccordionHeader>
        <AccordionBody className="p-5 text-center text-base">
          When you go to the order page, you will choose between a subscription
          and a one time purchase and then see which meat options to choose
          from.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
        <AccordionHeader
          className="text-black font-semibold border-none text-[17px]"
          onClick={() => handleOpen(4)}
        >
          When does my meat arrive?
        </AccordionHeader>
        <AccordionBody className="p-5 text-center text-base">
          Depending on the shipping option you choose, within 1-5 business days.{' '}
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 5} icon={<Icon id={5} open={open} />}>
        <AccordionHeader
          className="text-black font-semibold border-none text-[17px]"
          onClick={() => handleOpen(5)}
        >
          Is the meat precooked?
        </AccordionHeader>
        <AccordionBody className="p-5 text-center text-base">
          Yes! All meat is precooked, chilled, and then shipped to you. All you
          have to do is reheat!{' '}
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 6} icon={<Icon id={6} open={open} />}>
        <AccordionHeader
          className="text-black font-semibold border-none text-[17px]"
          onClick={() => handleOpen(6)}
        >
          How is the meat shipped?
        </AccordionHeader>
        <AccordionBody className="p-5 text-center text-base">
          All meat is sent chilled and packaged with an insulated liner
          surrounded by ice packets to ensure it will reach your door at a safe
          temperature.{' '}
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 7} icon={<Icon id={7} open={open} />}>
        <AccordionHeader
          className="text-black font-semibold border-none text-[17px]"
          onClick={() => handleOpen(7)}
        >
          Where is the meat sourced?
        </AccordionHeader>
        <AccordionBody className="p-5 text-center text-base">
          We are a Utah company that sources 100% real meat from trusted local
          ranches. Selecting grass fed ranches, we prioritize that our meat is
          of the highest standards of taste and nutritional value.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 8} icon={<Icon id={8} open={open} />}>
        <AccordionHeader
          className="text-black font-semibold border-none text-[17px]"
          onClick={() => handleOpen(8)}
        >
          How should I store my meat?
        </AccordionHeader>
        <AccordionBody className="p-5 text-center  text-base">
          All sealed meats can be stored in the refrigerator for 10-14 days upon
          arrival. Once the package is opened, we recommend consuming the
          refrigerated meat within 3-5 days. If this timeline will not work, all
          meats can be stored in the freezer for 4-6 months.
        </AccordionBody>
      </Accordion>
    </>
  );
}

export default FaqAccordion;
