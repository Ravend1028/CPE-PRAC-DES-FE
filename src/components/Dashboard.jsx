import React from 'react'
import PersonDetails from './PersonDetails'
import Chart from './Chart'

const Dashboard = () => {
  return (
    <main>
      <div className="container mx-auto p-6 flex flex justify-center items-center bg-slate-300 rounded-md">
        <div className='grid grid-cols-4 gap-4'>
          <Chart parameter={"Height"}/>
          <Chart parameter={"Weight"}/>
          <Chart parameter={"BMI"}/>
          <PersonDetails />

          <div className='col-span-2'>
            <Chart parameter={"Pulse Rate"}/>
          </div>

          <div className='col-span-2'>
            <Chart parameter={"Respiratory Rate"}/>
          </div>

          <Chart parameter={"Temperature"}/>
          <Chart parameter={"Waist Circumference"}/>
          <Chart parameter={"Blood Oxygen Level"}/>
          <Chart parameter={"Blood Pressure"}/>
        </div>

      </div>
    </main>
  )
}

export default Dashboard