import React from 'react';
import PredictionButton from './PredictionButton';

const FormData = () => {
  return (
    <section>
      <div className='flex justify-center items-center p-6'>
        <form>
          <div className='flex space-x-8 border-b-2 border-gray-950 pb-8'>
            <div className='flex flex-col space-y-2'>
              <label className='font-bold uppercase' htmlFor="">Name: </label>
              <input className='border-x-2 border-gray-950 rounded-md p-2' type="text" />
            </div>

            <div className='flex flex-col space-y-2'>
              <label className='font-bold uppercase' htmlFor="">Age: </label>
              <input className='border-x-2 border-gray-950 rounded-md p-2' type="text" />
            </div>

            <div className='flex flex-col space-y-2'>
              <label className='font-bold uppercase' htmlFor="">Gender: </label>
              <input className='border-x-2 border-gray-950 rounded-md p-2' type="text" />
            </div>

            <div className='flex flex-col space-y-2'>
              <label className='font-bold uppercase' htmlFor="">Email: </label>
              <input className='border-x-2 border-gray-950 rounded-md p-2' type="text" />
            </div>

            <div className='flex flex-col space-y-2'>
              <label className='font-bold uppercase' htmlFor="">Phone: </label>
              <input className='border-x-2 border-gray-950 rounded-md p-2' type="text" />
            </div>
          </div>

          <div className='flex justify-center items-start space-x-20 pt-8'>
            <div className='flex flex-col space-y-5'>
              <div className='flex flex-col space-y-2'>
                <label className='font-bold uppercase' htmlFor="">Height: </label>
                <input className='border-x-2 border-gray-950 rounded-md p-2' type="text" />
              </div>

              <div className='flex flex-col space-y-2'>
                <label className='font-bold uppercase' htmlFor="">Weight: </label>
                <input className='border-x-2 border-gray-950 rounded-md p-2' type="text" />
              </div>

              <div className='flex flex-col space-y-2'>
                <label className='font-bold uppercase' htmlFor="">BMI: </label>
                <input className='border-x-2 border-gray-950 rounded-md p-2' type="text" />
              </div>
            </div>
            
            <div className='flex flex-col space-y-5'>
              <div className="flex flex-col space-y-2">
                <label className='font-bold uppercase' htmlFor="">Pulse Rate: </label>
                <input className='border-x-2 border-gray-950 rounded-md p-2' type="text" />
              </div>

              <div className="flex flex-col space-y-2">
                <label className='font-bold uppercase' htmlFor="">Blood Oxygen Level: </label>
                <input className='border-x-2 border-gray-950 rounded-md p-2' type="text" />
              </div>

              <div className="flex flex-col space-y-2">
                <label className='font-bold uppercase' htmlFor="">Blood Pressure: </label>
                <input className='border-x-2 border-gray-950 rounded-md p-2' type="text" />
              </div>
            </div>

            <div className='flex flex-col space-y-5'>
              <div className="flex flex-col space-y-2">
                <label className='font-bold uppercase' htmlFor="">Respiratory Rate: </label>
                <input className='border-x-2 border-gray-950 rounded-md p-2' type="text" />
              </div>

              <div className="flex flex-col space-y-2">
                <label className='font-bold uppercase' htmlFor="">Body Temperature: </label>
                <input className='border-x-2 border-gray-950 rounded-md p-2' type="text" />
              </div>

              <div className="flex flex-col space-y-2">
                <label className='font-bold uppercase' htmlFor="">Waist Circumference: </label>
                <input className='border-x-2 border-gray-950 rounded-md p-2' type="text" />
              </div>          
            </div>

            <div className="flex flex-col space-y-10 mt-7">
              <button className='bg-amber-600 p-3 rounded-md text-white hover:bg-amber-500'>
                Save Record
              </button>

              <PredictionButton />
            </div>
          </div>


        </form>
      </div>
    </section>
  )
}

export default FormData