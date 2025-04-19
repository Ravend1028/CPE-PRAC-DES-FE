import React from 'react';
import Spinner from './Spinner';

const ReadingAlert = () => {
  return (
    <div className='flex flex-row justify-center items-center space-x-5'>
      <div className='flex justify-center items-center w-full bg-red-300 p-3 rounded-md text-lg text-slate-950'>
          <Spinner />

          Reading Sensor Data Press `Save` to Stop
      </div>
    </div> 
  )
}

export default ReadingAlert