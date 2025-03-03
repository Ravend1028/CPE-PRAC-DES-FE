import React from 'react';
import { Link } from 'react-router';

const HeroButtons = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-7 z-10">
      <div className="flex flex-row space-x-7 z-10">
        <Link to="/login">
          <button className='bg-amber-600 p-3 rounded-md text-xl hover:bg-amber-500 hover:text-slate-950'>
            Login
          </button>
        </Link>
        
        <Link to="/signup">
          <button className='p-3 rounded-md text-xl border-2 border-amber-600 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500'>
            Sign up
          </button>
        </Link>
      </div>

      <Link to="/forgot-password">
        <button className='p-3 rounded-md text-xl underline hover:text-amber-500'>
          Forgot Password
        </button>
      </Link>
    </div>
  )
}

export default HeroButtons