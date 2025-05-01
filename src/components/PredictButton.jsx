import React from 'react';
import { useSelector } from 'react-redux';

const PredictButton = ({ setPredictModal, setPredictionResult, enablePrediction}) => {
  const predictButtonUI = enablePrediction ? 'w-full bg-slate-200 p-3 rounded-md text-xl text-slate-400' : 'w-full bg-amber-600 p-3 rounded-md text-xl hover:bg-amber-500 hover:text-slate-950';

  const { userInfo } = useSelector((state) => state.auth); 
  const { vitalStatistics } = userInfo;

  const predictVitalsCondition = async () => {
    const url = "http://127.0.0.1:8001/predict";

    const {
      height,
      weight,
      BMI,
      bloodPressure,
      pulseRate,
      respiratoryRate,
      bodyTemperature,
      bloodOxygenLevel
    } = vitalStatistics;

    const [ systolicBP, diastolicBP]  = bloodPressure
    .split("/")
    .map(val => parseFloat(val));

    const features = [
      parseFloat(height),
      parseFloat(weight),
      parseFloat(BMI),
      systolicBP,
      diastolicBP,
      parseFloat(pulseRate),
      parseFloat(respiratoryRate),
      parseFloat(bodyTemperature),
      parseFloat(bloodOxygenLevel),
    ];

    if (features.some(val => val === 0 || isNaN(val))) {
      toast.error("All values must be greater than 0 and valid numbers");
      return;
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ features }),
      });
  
      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
      }
  
      const json = await res.json();
      setPredictionResult(json);
      // console.log(json);
      setPredictModal(true);

    } catch (err) {
      toast.error(err?.message || "Prediction failed");
    }
  };

  return (
    <button className={ predictButtonUI } onClick={ predictVitalsCondition } disabled={ enablePrediction }>
      Predict Conditions
    </button>
  )
}

export default PredictButton