import React from 'react';
import { toast } from 'react-toastify';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setVitalStatistics } from '../slices/authSlice';
import { useUpdateUserVitalsMutation } from '../slices/usersApiSlice';

const ActionButtons = ({ manualValuesRef, isReading, setReading, isDisabled, setPhaseOne, setPhaseTwo }) => {
  const buttonUI = isDisabled ? 'w-full p-3 rounded-md text-xl bg-slate-200 text-slate-400' : 'w-full p-3 rounded-md text-xl border-2 border-amber-600 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500';

  const socketRef = useRef(null);
  
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth); 
  const { vitalStatistics } = userInfo;
  const { _id } = userInfo;

  const [updateVitals] = useUpdateUserVitalsMutation();

  // const testReactTour = () => {
  //   setIsOpen(true);
  // }

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

    // Phasing Buttons State
    setPhaseTwo(false);
    setPhaseOne(true);
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
      { !isReading ? 
          <button className={ buttonUI }
            onClick={ getSensorReadings } disabled={ isDisabled }>
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