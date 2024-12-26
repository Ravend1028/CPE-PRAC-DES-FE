import React from 'react';

const PredictionButton = ({ style = 'border-2 border-gray-950 rounded-md p-3 text-gray-950 hover:bg-gray-800 hover:text-white hover:border-gray-800', eventHandler }) => {
  return (
    <div className='container mx-auto flex justify-center'>
      <button className = { style } onClick={ eventHandler }>
        Vital Statistics Prediction 
      </button>
    </div>
  )
}

export default PredictionButton