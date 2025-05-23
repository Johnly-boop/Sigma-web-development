import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-indigo-800 text-white p-4'>
        <div className='logo'>
            <span className='font-bold text-xl mx-8 cursor-pointer hover:font-bold transition-all'>Tasky!</span>
        </div>
        <ul className="flex gap-8 mx-9">
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
