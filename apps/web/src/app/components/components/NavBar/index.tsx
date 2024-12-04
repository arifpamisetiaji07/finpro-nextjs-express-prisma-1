"use client"
import { RiMenuLine } from 'react-icons/ri'
// import MenuItem from './menu-item'
// import { useMenuStore } from '@/stores/menu'
import { IoMdClose } from 'react-icons/io'
// import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { FaBars, FaChevronDown, FaSearch, FaTimes } from 'react-icons/fa'
import { HiLocationMarker } from 'react-icons/hi'
import { useState } from 'react'

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
  };









  const { open, isOpen, close } = useMenuStore()

  const handleOpenMenu = () => {
    open()
  }
  const handleCloseMenu = () => {
    close()
  }
  return (
    <nav className='bg-white shadow-sm px-2 sticky top-0 z-30'>
      <div className='flex items-center h-[70px] mx-container'>


        {/* logo */}
        <div className='w-1/3 shrink-0'>
          <Link href={'/'} className="w-32 h-16 shrink-0 relative block">
            <Image src={'/images/logo.png'} fill className='h-full w-full object-contain' alt="logo" />
          </Link>
        </div>


        {/* Search Bar */}
        <div className="hidden md:flex items-center border rounded-full overflow-hidden">
                <FaSearch className="text-gray-500 mx-2" />
                <input
                    type="text"
                    placeholder="Search events"
                    className="p-2 focus:outline-none"
                />
                <div className="flex items-center px-2 border-l border-gray-300">
                    <HiLocationMarker className="text-gray-500" />
                    <span className="ml-1 text-sm text-gray-600">Jakarta Pusat</span>
                </div>
                <button className="bg-orange-600 text-white p-2 rounded-full">
                    <FaSearch />
                </button>
            </div>

      
        {/* Hamburger Icon */}
        <div className="md:hidden">
                <button onClick={toggleMenu} className="text-gray-600">
                    {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>


            {/* Menu Items */}
            <div className={`md:flex items-center space-x-4 text-sm ${isMenuOpen ? 'block' : 'hidden'} absolute md:relative top-16 md:top-0 left-0 md:left-auto w-full md:w-auto bg-white md:bg-transparent md:shadow-none shadow-md md:flex-row flex-col md:space-x-4`}>
                <Link href="#" className="block py-2 px-4 hover:text-orange-600">Find Events</Link>
                <Link href="#" className="block py-2 px-4 hover:text-orange-600">Create Events</Link>
                <div className="relative">
                    <button className="flex items-center py-2 px-4 space-x-1 hover:text-orange-600">
                        <span>Help Center</span>
                        <FaChevronDown />
                    </button>

                    {/* Optional dropdown logic here */}
                    
                </div>
                <Link href="#" className="block py-2 px-4 hover:text-orange-600">Find my tickets</Link>
                <Link href="#" className="block py-2 px-4 hover:text-orange-600">Log In</Link>
                <Link href="#" className="block py-2 px-4 hover:text-orange-600">Sign Up</Link>
            </div>
      </div>
    </nav>
  )
}

export default NavBar