import React from 'react';
import PersonDetails from './PersonDetails';

const Dashboard = ({ children }) => {
  return (
    <section>
      <div className="container mx-auto p-6 flex flex-col justify-center items-center bg-slate-300 rounded-md space-y-10">
        <div className='grid grid-cols-4 gap-4'>
          { children }
        </div>
      </div>
    </section>
  )
}

export default Dashboard