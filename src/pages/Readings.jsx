import React from 'react';
import { useState } from 'react';
import FormData from '../components/FormData';

// This one needs knowledge in woking with forms using React
// form handling and sanitization/validations etc.

const Readings = () => {
  return (
    <main>
      <div className="container mx-auto p-6 flex flex-col justify-center items-center font-poppins space-y-5">
        <h2 className='font-bold text-gray-950 text-3xl uppercase'>
          Readings
        </h2>

        <FormData />
      </div>
    </main>
  )
}

export default Readings