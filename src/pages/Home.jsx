import React from 'react';
import { Link } from 'react-router';
import Hero from '../components/Hero';

// To be worked on soon

const Home = () => {
  return (
    <Hero>
      <div className="flex flex-row space-x-7 z-10">
        <Link to="/form">
          <button className='bg-amber-600 p-3 rounded-md text-xl hover:bg-amber-500 hover:text-slate-950'>
            Start Now
          </button>
        </Link>
        
        <Link to = "/records">
          <button className='p-3 rounded-md text-xl border-2 border-amber-600 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500'>
            View Records
          </button>
        </Link>
      </div>
    </Hero>
  )
}

export default Home