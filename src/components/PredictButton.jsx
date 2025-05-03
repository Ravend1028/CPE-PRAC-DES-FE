import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const PredictButton = ({ setPredictModal, setPredictionResult, enablePrediction}) => {
  const predictButtonUI = enablePrediction ? 'w-full bg-slate-200 p-3 rounded-md text-xl text-slate-400' : 'w-full bg-amber-600 p-3 rounded-md text-xl hover:bg-amber-500 hover:text-slate-950';

  const { userInfo } = useSelector((state) => state.auth); 
  const { vitalStatistics } = userInfo;

  const predictVitalsCondition = async () => {
    const url = "http://127.0.0.1:8001/predict";

    const { age, gender } = userInfo;
  
    const {
      height,
      weight,
      BMI,
      bloodPressure,
      pulseRate,
      respiratoryRate,
      bodyTemperature,
      bloodOxygenLevel,
      smokerOrNo,
      waist,
      hips
    } = vitalStatistics;

    const [ systolicBP, diastolicBP]  = bloodPressure
    .split("/")
    .map(val => parseFloat(val));

    const ratio = parseFloat(waist / hips).toFixed(2);

    if (isNaN(ratio) || 0) {
      ratio = 0;
    }

    const genderBinary = gender === 'M' ? 1 : 0;


    const features = [
      parseInt(age),
      parseInt(genderBinary),
      parseInt(smokerOrNo),
      systolicBP,
      diastolicBP,
      parseFloat(pulseRate),
      parseFloat(respiratoryRate),
      parseFloat(bodyTemperature),
      parseFloat(weight),
      parseFloat(height),
      parseFloat(waist),
      parseFloat(hips),
      parseFloat(bloodOxygenLevel),
      ratio,
      parseFloat(BMI),
    ];

    if (features.some(val => isNaN(val))) {
      toast.error("All values must be valid numbers");
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