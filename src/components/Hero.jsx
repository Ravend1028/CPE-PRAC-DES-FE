import React from 'react';
import HealthCenter from '../assets/images/buli-center.jpg';
import CDMLogo from '../../public/cdm-logo.png';
import MuntiLogo from '../../public/munti-logo.png';

const Hero = ({ children }) => {
  return (
    <section className='relative'>
      <div className="container mx-auto p-6 flex flex-col justify-center items-center font-poppins h-[100vh] space-y-16 text-white">

        <div className='absolute top-0 left-0 w-full h-full overflow-hidden '>
          <img className='rounded-md object-cover w-full' src={ HealthCenter } alt="buli-health-center" /> 
          <div className="absolute inset-0 bg-black bg-opacity-70 pointer-events-none"></div> 
        </div>

        <div className="logos z-10 flex justify-center items-center space-x-2">
          <img className='w-20' src={ CDMLogo } alt="cdm-logo" />
          <img className='w-1/12' src={ MuntiLogo } alt="cdm-logo" />
        </div>
        
        <h1 className='font-bold text-6xl text-center uppercase z-10'>
          <span className='text-amber-600'>Predictive</span> Vital Signs Patient Monitoring and Recording Kiosk for Philippines Health Centers Applying Random Forest Algorithm
        </h1>
        
        { children }
      </div>
    </section>
  )
}

export default Hero