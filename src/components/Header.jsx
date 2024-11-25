import React from 'react'
import logo from '../../public/cdm-logo.png'

const Header = () => {
  return (
    <header>
      <div className='container mx-auto p-6 flex justify-between items-center font-poppins'>
        <div className="space-x-2 flex flex-row justify-center items-center">
          <img src={ logo } alt="cdm-logo" className='w-20'/>
          <h3 className='font-bold text-lg uppercase'>CpE Practice and Design 1</h3>
        </div>

        <div className='flex'>
          <input type="text" className='border-2 border-black rounded-l-md p-2 w-96' placeholder='Search for a person...'/>
          <button className='border-t-2 border-r-2 border-b-2 border-black font-bold rounded-r-md p-2 w-1/6'>
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header