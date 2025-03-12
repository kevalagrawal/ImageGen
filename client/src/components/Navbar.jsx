import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

    const { setShowLogin, user, credit, logout } = useContext(AppContext)
    const navigate = useNavigate()

    return (
        <div className='flex items-center justify-between py-4 px-4 sm:px-6'>
            {/* Left Section */}
            <div className="flex items-center gap-1">
                <img width={50} src={assets.eye} alt="" className="-mr-6" />
                <Link to='/'>
                    <img className='w-28 sm:w-32 lg:w-40 translate-y-2' src={assets.logo2} alt="" />
                </Link>
            </div>

            {/* Right Section */}
            <div>
                {user ? (
                    <div className='flex items-center gap-3 sm:gap-4'>
                        {/* Credits Button */}
                        <button 
                            onClick={() => navigate('/buy')} 
                            className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:scale-105 transition-all duration-300'
                        >
                            <img className='w-5' src={assets.credit_star} alt="" />
                            <p className='text-xs sm:text-sm font-medium text-gray-600'>
                                Credits left: {credit}
                            </p>
                        </button>

                        {/* Greeting */}
                        <p className='text-gray-600 max-sm:hidden pl-4'>
                            Hi, {user.name}
                        </p>

                        {/* Profile Icon with Dropdown */}
                        <div className='relative group'>
                            <img className='w-10 drop-shadow cursor-pointer' src={assets.profile_icon} alt="" />
                            <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black pt-12'>
                                <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                                    <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10 hover:bg-gray-100'>
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex items-center gap-4 sm:gap-6'>
                        {/* Pricing Link */}
                        <p 
                            onClick={() => navigate('/buy')} 
                            className='cursor-pointer text-sm sm:text-base font-medium text-gray-700 hover:text-gray-900'
                        >
                            Pricing
                        </p>

                        {/* Login Button */}
                        <button 
                            onClick={() => setShowLogin(true)} 
                            className='bg-zinc-800 text-white px-7 py-2 sm:px-10 sm:py-2 text-sm sm:text-base rounded-full hover:bg-zinc-700 transition-all'
                        >
                            Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar
