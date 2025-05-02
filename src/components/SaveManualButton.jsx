import React from 'react';

const SaveManualButton = ({ isDisabled }) => {
  const buttonUI = isDisabled ? 'flex justify-center items-center w-full p-3 rounded-md text-xl bg-slate-200 text-slate-400' : 'flex justify-center items-center w-full p-3 rounded-md text-xl border-2 border-amber-600 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500';

  const saveManualReadings = async () => {
    console.log('Test')
    // collect 5 manual fields value then save to state or direct to db?
    // change button state and open prediction button state
  };

  return (
    <div className='flex flex-col justify-center items-center space-y-5'>
      <button className={ buttonUI } onClick={ saveManualReadings } disabled={ isDisabled }>
        Save Manual Readings
      </button>
    </div>
  )
}

export default SaveManualButton