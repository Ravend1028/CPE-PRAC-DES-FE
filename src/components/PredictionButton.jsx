import React from 'react'

const PredictionButton = ({ style = 'bg-slate-950 rounded-md text-gray-200 p-2 text-md hover:text-amber-500', onClick }) => {
  return (
    <div className='container mx-auto flex justify-center'>
      <button className = { style } onClick={ onClick }>
        Vital Statistics Prediction 
      </button>
    </div>
  )
}

export default PredictionButton