import React from 'react';
import PersonDetails from './PersonDetails';
import Chart from './Chart';
import PieChart from '../charts/PieChart'

const Dashboard = () => {
  return (
    <main>
      <div className="container mx-auto p-6 flex flex-col justify-center items-center bg-slate-300 rounded-md space-y-10">
        <div className='grid grid-cols-4 gap-4'>
          <Chart parameter={ "BMI" }>
            <PieChart labels={["Height", "Weight", "Waist Circumference"]} datas={[10, 10, 10]}/>
          </Chart>

          <Chart parameter={ "CARDIOVASCULAR HEALTH" }>
            <PieChart labels={["Pulse Rate", "Blood Oxygen Level", "Blood Pressure"]} datas={[10, 10, 10]}/>
          </Chart>

          <Chart parameter={ "GENERAL HEALTH" }>
            <PieChart labels={["Respiratory Rate", "Temperature"]} datas={[10, 10, 10]}/>
          </Chart>
          <PersonDetails />
        </div>
      </div>

      <div className='container mx-auto p-6 mt-12'>
        <button className='block mx-auto bg-slate-950 rounded-md text-gray-200 p-2 text-xl hover:text-amber-500'>
          Vital Statistics Prediction
        </button>
      </div>
    </main>
  )
}

export default Dashboard