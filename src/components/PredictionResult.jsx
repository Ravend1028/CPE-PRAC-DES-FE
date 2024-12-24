import React from 'react'

const PredictionResult = ({ style = 'flex flex-col rounded-md bg-slate-950 text-gray-200 p-3 space-y-3'}) => {
  return (
    <div className = { style }>
      <h4 className='font-bold uppercase'>
        Predicted Conditions:
      </h4>

      <ul>
        <li>
          Diabetic
        </li>
        <li>Fever</li>
        <li>Dehydrated</li>
        <li>Kulang sa lambing</li>
      </ul>
    </div>
  )
}

export default PredictionResult