import React from 'react';
import avatar from '../assets/images/david-img.jpg';

const PersonDetails = () => {
  return (
    <div className='border-2 border-black p-3 rounded-md font-poppins flex flex-col justify-center items-center bg-amber-500 space-y-10'>
      <img src={ avatar } alt="cdm-logo" className='w-1/2 rounded-full'/>
      
      <div className="details">
        <h4 className='font-bold'>
          Raven David
        </h4>

        <h5 className='italic'>
          22 years old, Male
        </h5>

        <h6 className='italic'>
          ravendavid.rd30@gmail.com
        </h6>
      </div>
    </div>
  )
}

export default PersonDetails