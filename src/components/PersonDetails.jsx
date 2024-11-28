import React from 'react'
import avatar from '../assets/images/david-img.jpg'

const PersonDetails = () => {
  return (
    <div className='border-2 border-black p-3 rounded-md font-poppins flex flex-row justify-between items-center space-x-5 bg-amber-500'>
      <div className="details">
        <h4 className='font-bold'>
          Raven David
        </h4>

        <h5 className='italic mb-1'>
          22 years old, Male
        </h5>

        <h6 className='italic'>
          ravendavid.rd30@gmail.com
        </h6>
      </div>

      <img src={ avatar } alt="cdm-logo" className='w-20 rounded-full'/>

    </div>
  )
}

export default PersonDetails