import React from 'react';

const PredictionModal = ({ predictionResult ,setPredictModal }) => {
  const handleClosingOfPredictionModal = () => {
    setPredictModal(false)
  };

  return (
    <div className='absolute bg-gray-950 rounded-md p-3 text-white flex flex-col justify-center items-center space-y-8'>
      <div className="flex flex-row justify-center items-center space-x-3">
        <div className='border-r-2 border-white p-2 w-96'>
          <h5 className="text-lg uppercase">
            <span className="block mb-3">
              The prediction result provided is only an <span className="font-bold">initial possible condition</span> based on the input data.
            </span>
            <span className="block mb-3">
              It <span className="font-bold">does not replace a professional medical diagnosis.</span>
            </span>
            <span className="block">
              A <span className="font-bold">licensed physician's assessment is required</span> for an accurate and final medical decision.
            </span>
          </h5>
        </div>

        <div className='p-2 w-96'>
          {
            Object.values(predictionResult).every(value => value === 0) ? (
              <div className="text-lg uppercase text-green-400 font-bold">
                • The patient appears normal.
              </div>
            ) : (
              <>
                <div className="text-lg uppercase mb-4 text-yellow-400 font-bold">
                  Based on your vital signs, you possibly might have:
                </div>
                {
                  Object.entries(predictionResult)
                    .filter(([condition, value]) => value > 0)
                    .map(([condition, value], index) => (
                      <div key={index} className="text-lg uppercase text-white">
                        • {condition}
                      </div>
                    ))
                }
              </>
            )
          }
        </div>
      </div>

      <button className='w-1/2 bg-amber-600 p-2 rounded-md text-lg hover:bg-amber-500 hover:text-slate-950' onClick={ handleClosingOfPredictionModal }>
        Okay
      </button>
    </div>
  )
}

export default PredictionModal