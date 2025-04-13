import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-between md:justify-around items-center bg-gray-800 text-white py-5'>
            <div className="logo">
                <span className='font-bold text-xl md:mx-0 mx-8'>TickMate</span>
            </div>
            <div className='font-medium md:mx-0 mx-8'>Your own Task manager</div>
        </nav>
    )
}

export default Navbar
