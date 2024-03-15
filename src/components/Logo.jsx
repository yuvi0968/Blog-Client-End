import React from 'react'
import LogoIcon from '../assets/logo.png'
const Logo = ({width = '100px'}) => {
  return (
    <div className='bg-white-500'>
      <img src={LogoIcon} height='80px' width="75px" alt="" srcset="" />
    </div>
  )
}

export default Logo;
