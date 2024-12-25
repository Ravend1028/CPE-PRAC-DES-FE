import React from 'react';

const PredictionButton = ({ style = 'border-2 border-amber-600 rounded-md p-3 text-gray-950 hover:bg-amber-500 hover:text-white hover:border-amber-500', eventHandler }) => {
  return (
    <div className='container mx-auto flex justify-center'>
      <button className = { style } onClick={ eventHandler }>
        Vital Statistics Prediction 
      </button>
    </div>
  )
}

export default PredictionButton