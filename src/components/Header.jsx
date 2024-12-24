import React from 'react';
import logo from '../../public/cdm-logo.png';
import { Link } from 'react-router';
import { NavLink } from 'react-router';

const Header = () => {

  const classLink = ({ isActive }) => isActive ? 'text-amber-600' : '';

  return (
    <header className='bg-slate-900 text-white'>
      <div className='container mx-auto p-6 flex justify-between items-center font-poppins border-b border-slate-300'>
        <div className="space-x-2 flex flex-row justify-center items-center">
          <Link to = "/"><img src={ logo } alt="cdm-logo" className='w-20'/></Link>
          <h3 className='font-bold text-lg uppercase'>CpE Practice and Design 1</h3>
        </div>

        <div className="nav-menu flex justify-center items-center space-x-10 font-bold uppercase text-lg">
          <NavLink to="/" className={ classLink }>
            Home
          </NavLink>

          <NavLink to="/records" className={ classLink }>
            Records
          </NavLink>
        </div>

        <div className='flex'>
          <input type="text" className='rounded-l-md p-2 w-96' placeholder='Search for a person...'/>
          <button className='font-bold rounded-r-md p-2 w-1/6 bg-amber-600 text-slate-950 hover:bg-amber-500'>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header