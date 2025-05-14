import React from 'react';
import { toast } from 'react-toastify';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setVitalStatistics } from '../slices/authSlice';
import { useUpdateUserVitalsMutation } from '../slices/usersApiSlice';

const ActionButtons = ({ manualValuesRef, isReading, setReading, isDisabled, setPhaseOne, setPhaseTwo, setPhaseThree, id, setPulseModal }) => {
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

  // Empty Array 
  // Populate then Average
  // then if time goes out the average will be the final one to be set in vitalStatistics 

  const heightRef = useRef([]);
  const weightRef = useRef([]);
  const BMIRef = useRef([]);
  const bodyTempRef = useRef([]);
  const pulseRateRef = useRef([]);
  const bloodOxyRef = useRef([]);

  const average = (arr) => {
    if (!arr.length) return 0;
    const sum = arr.reduce((acc, val) => acc + val, 0);
    return parseFloat((sum / arr.length).toFixed(2)); // round to 2 decimals
  };

  const getSensorReadings = () => {
    heightRef.current = [];
    weightRef.current = [];
    BMIRef.current = [];

    bodyTempRef.current = [];
    pulseRateRef.current = [];
    bloodOxyRef.current = [];

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
            // procSave();

            if (id === 1) {
              console.log("Height: ", heightRef.current);
              console.log("Weight: ", weightRef.current);
              console.log("BMI: ", BMIRef.current);
              console.log([average(heightRef.current), average(weightRef.current), average(BMIRef.current)]);

              const transformedData = {
                height: average(heightRef.current),
                weight: average(weightRef.current),
                BMI: average(BMIRef.current),
              };

              dispatch(setVitalStatistics(transformedData));

              // Phasing Buttons State
              setPhaseTwo(false);
              setPhaseOne(true);
              setPhaseThree(true);
              setTimeout(() => {
                setPulseModal(true);
              }, 1000);
            } else if (id === 2) {
              console.log("Body Temp: ", bodyTempRef.current);
              console.log("Pulse Rate: ", pulseRateRef.current);
              console.log("Blood Ox: ", bloodOxyRef.current);
              console.log([average(bodyTempRef.current), average(pulseRateRef.current), average(bloodOxyRef.current)]);

              const transformedData = {
                bodyTemperature: average(bodyTempRef.current),
                pulseRate: average(pulseRateRef.current),
                bloodOxygenLevel: average(bloodOxyRef.current),
              };

               dispatch(setVitalStatistics(transformedData));

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
          heightRef.current.push(rawData.height ?? 0);
          weightRef.current.push(rawData.weight ?? 0);
          BMIRef.current.push(rawData.BMI ?? 0);

          const transformedData = {
            height: rawData.height ?? 0,
            weight: rawData.weight ?? 0,
            BMI: rawData.BMI ?? 0,
          }

          dispatch(setVitalStatistics(transformedData));
        } else {
          bodyTempRef.current.push(rawData.bodyTemperature ?? 0);
          pulseRateRef.current.push(rawData.pulseRate ?? 0);
          bloodOxyRef.current.push(rawData.bloodOxygenLevel ?? 0);

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

      procSave();
    };

    setReading(true);
  };

  const handleSavingOfReadings = async (phaseNum) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.close();
      console.log("WebSocket connection closed manually");
    }

    try {
      const res = await updateVitals({ _id, vitalStatistics: vitalRef.current }).unwrap();
      toast.success(`Vital signs readings for phase ${phaseNum} have been saved succesfully`);
      setReading(false);
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