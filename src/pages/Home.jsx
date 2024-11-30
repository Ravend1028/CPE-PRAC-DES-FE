import React from 'react';
import cdmImg from '../assets/images/cdm-worm.JPG';

const Home = () => {
  return (
    <section className="h-screen bg-cover bg-center">
      <div className="container mx-auto p-10 flex flex-col justify-center items-start font-poppins space-y-16">
        <div className="flex flex-col space-y-10 justify-center items-start max-w-7xl">
          <h2 className='font-bold text-6xl uppercase'>
            Predictive Vital Signs Patient Monitoring and Recording Kiosk for Philippines Health Centers Applying Long Short-Term Memory Algorithm
          </h2>

          <h4 className='text-3xl'>
            A Design Project Prepared and Presented to the Computer Engineering Department Colegio de Muntinlupa 
          </h4>

          <h4 className='text-2xl'>
            By
          </h4>

          <ul className='text-3xl space-y-1'>
            <li>
              Casalla, Jonathan B.
            </li>
            <li>
              David, Raven A.
            </li>
            <li>
              Javier, Carl Kenneth V.
            </li>
          </ul>
        </div>

        <div className="flex flex-col space-y-3">
          <button className='bg-slate-950 text-gray-200 p-3 rounded-md text-xl'>
            Start Now
          </button>

          <button className='p-3 rounded-md text-xl border-2 border-slate-950'>
            View Records
          </button>
        </div>
      </div>
    </section>
  )
}

export default Home