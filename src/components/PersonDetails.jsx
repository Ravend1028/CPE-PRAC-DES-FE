import React from 'react';
import avatar from '../assets/images/avatar-placeholder.jpg';

const PersonDetails = ({ name, age, gender, email, phone, children }) => {
  return (
    <div className='container mx-auto border-1 border-black p-3 rounded-md font-poppins flex flex-col justify-center items-center bg-amber-500 space-y-10 w-[500px] h-[400px]'>
      <img src={ avatar } alt="cdm-logo" className='w-1/4 rounded-full'/>
      
      <div className="details">
        <h4 className='font-bold'>
          { name }
        </h4>

        <h5 className='italic'>
          { age } years old, { gender }
        </h5>

        <h6 className='italic'>
          { email }
        </h6>

        <h6 className='italic'>
          { phone }
        </h6>
      </div>

      { children }
    </div>
  )
}

export default PersonDetails