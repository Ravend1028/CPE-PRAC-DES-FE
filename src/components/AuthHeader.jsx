import React from 'react';
import CDMLogo from '../../public/cdm-logo.png';
import MuntiLogo from '../../public/munti-logo.png';
import { Link } from 'react-router';

const AuthHeader = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 text-white">
      <div className="container mx-auto flex justify-between items-center p-3">
        <div className='flex justify-center items-center space-x-5'>
          <img src={ CDMLogo } alt="cdm-logo" className='w-20' />

          {/* <h3 className='uppercase font-bold italic text-xl max-w-[900px]'>
          <span className='text-amber-600'>Predictive</span> Vital Signs Patient Monitoring and Recording Kiosk for Philippines Health Centers Applying Long Short-Term Memory Algorithm.
          </h3> */}
        </div>

        <Link to="/">
          <button className='border border-white p-2 uppercase hover:text-amber-500 hover:border-amber-500'>
            back
          </button>
        </Link>
      </div>
    </header>
  )
}

export default AuthHeader