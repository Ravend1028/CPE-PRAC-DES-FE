import React from 'react'

const Readings = () => {
  return (
    <main>
      <div className="container mx-auto p-6 flex flex-col justify-center items-center font-poppins">
        <h2 className='font-bold text-slate-950 text-3xl uppercase mb-5'>
          Readings
        </h2>
        
        <form className='flex flex-row justify-center items-start bg-slate-950 text-gray-200 p-5 rounded-md space-x-10'>
          <div className='flex flex-col'>
            <label for="height">Height:</label>
            <input type="text" id="height" name="height" className='mb-2 rounded-md text-slate-950 p-1' /><br/>

            <label for="weight">Weight:</label>
            <input type="text" id="weight" name="weight" className='mb-2 rounded-md text-slate-950 p-1' /><br/>

            <label for="waist">Waist Circumference:</label>
            <input type="text" id="waist" name="waist" className='mb-2 rounded-md text-slate-950 p-1' /><br/>

            <label for="bmi">BMI:</label>
            <input type="text" id="bmi" name="bmi" className='mb-2 rounded-md text-slate-950 p-1' /><br/>
          </div>

          <div className='flex flex-col'>
            <label for="pulseRate">Pulse Rate:</label>
            <input type="text" id="pulseRate" name="pulseRate" className='mb-2 rounded-md text-slate-950 p-1' /><br/>

            <label for="bloodOxygenLevel">Blood Oxygen Level:</label>
            <input type="text" id="bloodOxygenLevel" name="bloodOxygenLevel" className='mb-2 rounded-md text-slate-950 p-1' /><br/>

            <label for="bloodPressure">Blood Pressure:</label>
            <input type="text" id="bloodPressure" name="bloodPressure" className='mb-2 rounded-md text-slate-950 p-1' /><br/>
          </div>

          <div className='flex flex-col'>
            <label for="respiratoryRate">Respiratory Rate:</label>
            <input type="text" id="respiratoryRate" name="respiratoryRate" className='mb-2 rounded-md text-slate-950 p-1' /><br/>

            <label for="bodyTemperature">Body Temperature:</label>
            <input type="text" id="bodyTemperature" name="bodyTemperature" className='mb-2 rounded-md text-slate-950 p-1' /><br/>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Readings