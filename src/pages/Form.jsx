import React from 'react';
import { useState } from 'react';
import Spinner from '../components/Spinner';
import { Link } from 'react-router';

// To be worked on soon

const Form = () => {
  const [loading, setLoading] = useState(true);

  return (
    <main>
      <div className="container mx-auto p-6 flex flex-col justify-center items-center font-poppins">
        <Link to = {'/form/readings'}>
          <Spinner loading = { loading } />
        </Link>

        <h3 className='font-bold text-3xl uppercase'>
          Processing Data From Raspberry Pi Using WebSockets ...
        </h3>
      </div>
    </main>
  )
}

export default Form