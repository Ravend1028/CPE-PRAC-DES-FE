import React from 'react';
import { toast } from 'react-toastify';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setVitalStatistics } from '../slices/authSlice';
import { useUpdateUserVitalsMutation } from '../slices/usersApiSlice';

const ActionButtons = ({ manualValuesRef, isReading, setReading, isDisabled, setPhaseOne, setPhaseTwo, setPhaseThree, id }) => {
  const buttonUI = isDisabled ? 'flex justify-center items-center w-full p-3 rounded-md text-xl bg-slate-200 text-slate-400' : 'flex justify-center items-center w-full p-3 rounded-md text-xl border-2 border-amber-600 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500';

  const socketRef = useRef(null);
  
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth); 
  const { vitalStatistics } = userInfo;
  const { _id } = userInfo;

  const [updateVitals] = useUpdateUserVitalsMutation();

  const countdownRef = useRef(null);
  const [countdown, setCountdown] = useState(null);

  const vitalRef = useRef(vitalStatistics);

  useEffect(() => {
    vitalRef.current = vitalStatistics;
  }, [vitalStatistics]);

  const getSensorReadings = () => {
    // Prevent reconnecting if already connected
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) return;

    // Connect to the WebSocket server
    socketRef.current = new WebSocket("ws://localhost:4000/datas");

    socketRef.current.onopen = () => {
      console.log("Connected to WebSocket server");

      // Automatically close after 5 seconds
      // setTimeout(() => {
      //   if (socketRef.current) {
      //     socketRef.current.close();
      //     console.log("WebSocket connection automatically closed after 5 seconds");

      //     handleSavingOfReadings();
      //     console.log('saved na');
      //   }
      // }, 5000);
      // Start countdown
      let secondsLeft = 5;
      setCountdown(secondsLeft);

      countdownRef.current = setInterval(() => {
        secondsLeft -= 1;
        if (secondsLeft <= 0) {
          clearInterval(countdownRef.current);
          setCountdown(null);

          if (socketRef.current) {
            socketRef.current.close();
            console.log("WebSocket connection automatically closed after 5 seconds");
            procSave();

            if (id === 1) {
              // Phasing Buttons State
              setPhaseTwo(false);
              setPhaseOne(true);
              setPhaseThree(true);
            } else if (id === 2) {
              setPhaseTwo(true);
              setPhaseOne(true);
              setPhaseThree(false);
            }

          }
        } else {
          setCountdown(secondsLeft);
        }
      }, 1000);
    };

    socketRef.current.onmessage = (event) => {
      try {
        const rawData = JSON.parse(event.data); 

        // Transform the data to match your model
        // const transformedData = {
        //   height: rawData.height ?? 0,
        //   weight: rawData.weight ?? 0,
        //   BMI: rawData.BMI ?? 0,
        //   bodyTemperature: rawData.bodyTemperature ?? 0,
        //   pulseRate: rawData.pulseRate ?? 0,
        //   bloodOxygenLevel: rawData.bloodOxygenLevel ?? 0,
        //   bloodPressure: manualValuesRef.current.bloodPressure ?? 0,
        //   respiratoryRate: manualValuesRef.current.respiratoryRate ?? 0
        // };

        if (id === 1) {
          const transformedData = {
            height: rawData.height ?? 0,
            weight: rawData.weight ?? 0,
            BMI: rawData.BMI ?? 0,
          }

          dispatch(setVitalStatistics(transformedData));

        } else {
          const transformedData = {
            bodyTemperature: rawData.bodyTemperature ?? 0,
            pulseRate: rawData.pulseRate ?? 0,
            bloodOxygenLevel: rawData.bloodOxygenLevel ?? 0,
          }

          dispatch(setVitalStatistics(transformedData));
        }

       
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
    // setReading(true);
  };

  const handleSavingOfReadings = async (phaseNum) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.close();
      console.log("WebSocket connection closed manually");
    }

    try {
      const res = await updateVitals({ _id, vitalStatistics: vitalRef.current }).unwrap();
      toast.success(`Vital signs readings for phase ${phaseNum} have been saved succesfully`);
      // setReading(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const procSave = () => {
    handleSavingOfReadings(id);
  };

  return (
    <div className='flex flex-col justify-center items-center space-y-5'>
      {countdown !== null ? (
        <div className={ buttonUI } >
          Saving in { countdown }...
        </div>
      ) : (
        <button className={ buttonUI } onClick={ getSensorReadings } disabled={ isDisabled }>
          Get Readings
        </button>
      )}
      {/* { !isReading ? 
          <button className={ buttonUI }
            onClick={ getSensorReadings } disabled={ isDisabled }>
            Get Readings
          </button> 
          : 
          <button className='w-full p-3 rounded-md text-xl border-2 border-amber-600 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500'
            onClick={ handleSavingOfReadings }>
            Save Readings
          </button>  */}
    </div>
  )
}

export default ActionButtons