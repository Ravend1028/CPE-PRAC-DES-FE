import React from 'react';
import logo from '../../public/cdm-logo.png';
import { Link } from 'react-router';

// To be worked on soon

const Home = () => {
  return (
    <section>
      <div className="container mx-auto p-12 flex flex-col justify-center items-start font-poppins space-y-16 h-[95vh]">
        <h2 className='font-bold text-5xl uppercase'>
          Predictive Vital Signs Patient Monitoring and Recording Kiosk for Philippines Health Centers Applying Long Short-Term Memory Algorithm
        </h2>

        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col space-y-12">
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

          <img src = { logo } alt="cdm-img" className='w-1/3'/>
        </div>

        <div className="flex flex-row space-x-5">
          <Link to="/form">
            <button className='bg-slate-950 text-gray-200 p-3 rounded-md text-xl hover:text-amber-500'>
              Start Now
            </button>
          </Link>
          
          <Link to = "/records">
            <button className='p-3 rounded-md text-xl border-2 border-slate-950 hover:text-amber-500 hover:bg-slate-950'>
              View Records
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Home