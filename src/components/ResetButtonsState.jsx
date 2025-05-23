import React from 'react';
import { RiResetLeftLine } from "react-icons/ri";

const ResetButtonsState = ({setPhaseOne, setPhaseTwo, setPhaseThree, setPredictionButton}) => {
  const resetState = () => {
    setPhaseOne(false);
    setPhaseTwo(true);
    setPhaseThree(true);
    setPredictionButton(true);
  };

  return (
    <div className='flex flex-col justify-center items-center space-y-5'>
      <button className='flex justify-center items-center w-full p-3 rounded-md text-xl bg-amber-600 border-2 border-amber-600 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500' onClick={ resetState }>
        Reset

        <RiResetLeftLine className='ml-3'/>
      </button> 
    </div>
  )
}

export default ResetButtonsState