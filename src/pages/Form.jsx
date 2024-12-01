import React from 'react';
import { useState } from 'react';
import Spinner from '../components/Spinner';


const Form = () => {
  const [loading, setLoading] = useState(true);

  return (
    <main>
      <div className="container mx-auto p-6 flex flex-col justify-center items-center font-poppins">
        <Spinner loading = { loading } />

        <h3 className='font-bold text-3xl uppercase'>
          Processing Data ...
        </h3>
      </div>
    </main>
  )
}

export default Form