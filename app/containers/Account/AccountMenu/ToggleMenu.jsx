import React, { useState } from 'react';
import { Form, NavLink} from '@remix-run/react'
const ToggleMenu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="sm:hidden"> {/* Show only on small screens */}
    <div className='flex justify-center items-center'><button
        onClick={toggleMenu}
        className="flex items-center mx-auto text-lg focus:outline-none uppercase font-semibold"
      >
       <span className='mr-1 font-Roboto text-[12px] leading-[14px] py-[10px]'>Subscriptions</span> 
      {showMenu ? <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-[14px] w-[14px]"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M9.293 4.293a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 6.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg> :<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  width="14"
  height="14"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <path d="M6 9l6 6 6-6" />
</svg>}   
        
      </button></div>
      
      {showMenu && (
        <nav className="font-Roboto text-lg font-normal flex flex-col items-center gap">
          <NavLink
            to="/account/subscriptions"
            className="text-center bg-black text-white font-Roboto font-semibold text-[12px] leading-[14px] w-full py-[10px] uppercase border-b border-b-white"
            activeClassName="font-bold"
          >
            Subscriptions
          </NavLink>
          <NavLink
            to="/account/order-history"
            className="text-center bg-black text-white font-Roboto font-semibold text-[12px] leading-[14px] w-full py-[10px] uppercase border-b border-b-white"
            activeClassName="font-bold"
          >
            Order History
          </NavLink>
          <NavLink
            to="/account/account-details"
            className="text-center bg-black text-white font-Roboto font-semibold text-[12px] leading-[14px] w-full py-[10px] uppercase border-b border-b-white"
            activeClassName="font-bold"
          >
            Account Details
          </NavLink>
          <div className='text-center bg-black text-white font-Roboto font-semibold text-[12px] leading-[14px] w-full py-[10px] uppercase border-b border-b-white'>
          <Logout />
          </div>
          
        </nav>
      )}
    </div>
  );
};
function Logout() {
    return (
      <Form className="account-logout" method="POST" action="/account/logout">
        &nbsp;<button type="submit">Logout</button>
      </Form>
    )
  }
export default ToggleMenu;
