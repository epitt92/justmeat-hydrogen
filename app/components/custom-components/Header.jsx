import { Link } from '@remix-run/react'
import { Image } from '@shopify/hydrogen'
import React from 'react'
import LogoImage from '../../../public/images/logo/logo.png'

const CustomHeader = () => {
    const logo = "https://www.justmeats.com/cdn/shop/files/Group_4153_2x_f02ddf7e-8477-4582-914e-f73de0f50aa9.png?v=1693041856"
  return (
    <header className='custom-header'>
        <div className="nav">
            <Link to="/">
            <svg width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 m-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </Link>
            <div className='logo-wrapper'>
                <Link to="/">
                <img src={LogoImage} alt="" width="111" height="auto" loading='lazy' />
                </Link>
            </div>
        </div>
        <div className="announcement-bar">
            <p>LIMITED TIME: GET FREE RANCH RUB CHICKEN</p>
        </div>
    </header>
  )
}

export default CustomHeader