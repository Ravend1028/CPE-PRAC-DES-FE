import React from 'react';
import AnimatedIcon from './AnimatedIcon';
import PulseOxi from '../assets/images/PulseOximeter.jpg';

const HoldPulseIndicator = ({ setPulseModal }) => {
  return (
    <div className='absolute bg-gray-950 rounded-md p-3 text-white flex flex-col justify-center items-center space-y-8'>
      <div className="flex flex-row justify-center items-center space-x-3">
        <div className='border-r-2 border-white p-2 w-96'>
          <img src={ PulseOxi } alt="pulse-oxi-sensor" className='rounded-md'/>
        </div>

        <div className='p-2 w-96'>
          <h5 className="text-lg uppercase">
            Please place your finger on the <span className="font-bold">pulse oximeter sensor</span> as part of <span className="font-bold">Phase 2</span> to proceed with  data collection.
          </h5>
        </div>
      </div>

      <button className='w-1/2 bg-amber-600 p-2 rounded-md text-lg hover:bg-amber-500 hover:text-slate-950' onClick={ () => setPulseModal(false) }>
        Okay
      </button>
    </div>
  )
}

export default HoldPulseIndicator