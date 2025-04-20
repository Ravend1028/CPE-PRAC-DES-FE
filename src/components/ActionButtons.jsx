import React from 'react';
import { toast } from 'react-toastify';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setVitalStatistics } from '../slices/authSlice';
import { useUpdateUserVitalsMutation } from '../slices/usersApiSlice';

const ActionButtons = ({ manualValuesRef, setPredictModal, setPredictionResult, isReading ,setReading }) => {
  const socketRef = useRef(null);
  
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth); 
  const { vitalStatistics } = userInfo;
  const { _id } = userInfo;

  const [updateVitals] = useUpdateUserVitalsMutation();
  
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

  const getSensorReadings = () => {
    // Prevent reconnecting if already connected
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) return;

    // Connect to the WebSocket server
    socketRef.current = new WebSocket("ws://localhost:4000/datas");

    socketRef.current.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    socketRef.current.onmessage = (event) => {
      try {
        const rawData = JSON.parse(event.data); 

        // Transform the data to match your model
        const transformedData = {
          height: rawData.height ?? 0,
          weight: rawData.weight ?? 0,
          BMI: rawData.BMI ?? 0,
          bodyTemperature: rawData.bodyTemperature ?? 0,
          pulseRate: rawData.pulseRate ?? 0,
          bloodOxygenLevel: rawData.bloodOxygenLevel ?? 0,
          bloodPressure: manualValuesRef.current.bloodPressure ?? 0,
          respiratoryRate: manualValuesRef.current.respiratoryRate ?? 0
        };

        dispatch(setVitalStatistics(transformedData));
      } catch (error) {
        console.error("Error parsing WebSocket data:", error);
      }
    };
    
    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setReading(true);
  };

  const handleSavingOfReadings = async () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.close();
      console.log("WebSocket connection closed manually");
    }

    try {
      const res = await updateVitals({ _id, vitalStatistics }).unwrap();
      toast.success('Vital signs readings have been saved succesfully');
      setReading(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center space-y-5'>
      <button className='w-full bg-amber-600 p-3 rounded-md text-xl hover:bg-amber-500 hover:text-slate-950' onClick={ predictVitalsCondition }>
        Predict Conditions
      </button>

      { !isReading ? 
          <button className='w-full p-3 rounded-md text-xl border-2 border-amber-600 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500'
            onClick={ getSensorReadings }>
            Get Readings
          </button> 
          : 
          <button className='w-full p-3 rounded-md text-xl border-2 border-amber-600 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500'
            onClick={ handleSavingOfReadings }>
            Save Readings
          </button> 
      }
    </div>
  )
}

export default ActionButtons