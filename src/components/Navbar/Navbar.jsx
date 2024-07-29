import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>
      <Link to={'/case_seubone'} className='link'>
        <img src="LOGO-SB_05-300x73.png.webp" alt="logo" className='logo-navbar' />
      </Link>
    </div>
  )
}

export default Navbar