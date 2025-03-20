import React from 'react';
import { useState, useEffect, useRef } from 'react'; 
import { toast } from 'react-toastify';
import { setCredentials } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import { MdEditSquare } from "react-icons/md";
import Gauge from '../components/Gauge';
import Spinner from '../components/Spinner';

const Dashboard = () => {
  const [isVisible, setVisibility] = useState(false);
  const modalRef = useRef(null);

  const [isReading, setReading] = useState(false);
 
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bodyTemperature, setBodyTemperature] = useState('');
  const [pulseRate, setPulseRate] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [respiratoryRate, setRespiratoryRate] = useState('');
  const [bloodOxygenLevel, setBloodOxygenLevel] = useState('');
  const [BMI, setBMI] = useState('');
  const [waistCircumference, setWaistCircumference] = useState('');

  const dispatch = useDispatch();
  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  const { userInfo } = useSelector((state) => state.auth); 
  const { vitalStatistics } = userInfo;

  useEffect(() => {
    // const handleClickOutside = (event) => {
    //   if (modalRef.current && !modalRef.current.contains(event.target)) {
    //     setVisibility(false);
    //   }
    // };
  
    // if (isVisible) {
    //   document.addEventListener("mousedown", handleClickOutside);
    // }
  
    // return () => {
    //   document.removeEventListener("mousedown", handleClickOutside);
    // };

    setName(userInfo.name);
    setAge(userInfo.age);
    setGender(userInfo.gender);
    setEmail(userInfo.email);
    setPhone(userInfo.phone);
    setHeight(vitalStatistics.height);
    setWeight(vitalStatistics.weight);
    setBodyTemperature(vitalStatistics.bodyTemperature);
    setPulseRate(vitalStatistics.pulseRate);
    setBloodPressure(vitalStatistics.bloodPressure);
    setRespiratoryRate(vitalStatistics.respiratoryRate);
    setBloodOxygenLevel(vitalStatistics.bloodOxygenLevel);
    setBMI(vitalStatistics.BMI);
    setWaistCircumference(vitalStatistics.waistCircumference);
  }, [
    userInfo.name, 
    userInfo.age, 
    userInfo.gender, 
    userInfo.email, 
    userInfo.phone,
    vitalStatistics.height,
    vitalStatistics.weight,
    vitalStatistics.bodyTemperature,
    vitalStatistics.pulseRate,
    vitalStatistics.bloodPressure,
    vitalStatistics.respiratoryRate,
    vitalStatistics.bloodOxygenLevel,
    vitalStatistics.BMI,
    vitalStatistics.waistCircumference,
    // isVisible
  ]);

  // Modal Event Listener
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateProfile({
        name,
        age,
        gender,
        email,
        phone
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Profile Updated Successfully');
      setVisibility(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };  

  // Function for toggling the modal
  const handleToggleClick = () => {
    setVisibility(true);
  };

  // Function for closing the modal
  const handleCancelClick = () => {
    setVisibility(false);
  };  

  const formatLabel = (key) => {
    return key
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Insert space before uppercase letters
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
  };

  const getSensorReadings = () => {
    // Connect to web socket server
    // Listen for data and then set gauges value to received data
    // Optimize logic for continuos readings

    setReading(true);
  };

  // Add event listener for saving to mongodb

  return (
    <main className='relative flex justify-center items-center'>
      <div className="container mx-auto p-6 flex flex-col font-poppins space-y-2">
        <div className='flex justify-center items-center p-3 border-b-2 border-gray-950 space-x-10'>
          <input className='bg-transparent border-y-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none text-center' type="text" readOnly value={ name }/>

          <input className='bg-transparent border-y-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none text-center' type="text" readOnly value={ age }/>

          <input className='bg-transparent border-y-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none text-center w-28' type="text" readOnly value={ gender }/>

          <input className='bg-transparent border-y-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none text-center w-72' type="text" readOnly value={ email }/>

          <input className='bg-transparent border-y-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none text-center' type="text" readOnly value={ phone }/>

          <button className='p-3 rounded-md text-3xl hover:border-amber-500 hover:bg-amber-500' onClick={ handleToggleClick }>
            <MdEditSquare />
          </button>
        </div>

        <div className='grid grid-cols-3 gap-5 p-3'>
          { 
            Object.entries(vitalStatistics).map(([key, value]) => (
              <Gauge key={key} value={value} label={formatLabel(key)} />
            ))
          }

          <div className='flex flex-row justify-center items-center space-x-5'>
            <button className='w-full bg-amber-600 p-3 rounded-md text-xl hover:bg-amber-500 hover:text-slate-950' onClick={ () => { alert(`Test`) } }>
              Predict Conditions
            </button>

            { !isReading ? 
                <button className='w-full p-3 rounded-md text-xl border-2 border-amber-600 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500'
                 onClick={ getSensorReadings }>
                  Get Readings
                </button> 
                : 
                <button className='w-full p-3 rounded-md text-xl border-2 border-amber-600 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500'>
                  Save Readings
                </button> 
            }
          </div>

          {
            isReading && (
              <div className='flex flex-row justify-center items-center space-x-5'>
                <div className='flex justify-center items-center w-full bg-red-300 p-3 rounded-md text-lg text-slate-950'>
                  <Spinner />

                  Reading Sensor Data Press `Save` to Stop
                </div>
              </div> 
            )
          }
        </div>
      </div>

      {/* Edit User Info Modal -- Separate this into a stand alone component in revision time */}
      {
        isVisible && (
          <div className='absolute bg-gray-950 w-1/4 rounded-md p-3 text-white'>
            <form className='flex flex-col justify-center items-center space-y-5' onSubmit={ handleFormSubmit }>
              <h3 className='font-bold text-xl uppercase border-b-2 border-amber-600'>
                Edit User Info
              </h3>

              <div className='flex flex-col justify-center items-center p-3 border-b-2 border-gray-950 space-y-5'>
                <input className='bg-transparent border-y-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none text-center' type="text" value={ name } onChange={(e) => {setName(e.target.value)}}  ref={ modalRef }/>

                <input className='bg-transparent border-y-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none text-center' type="text" value={ age } onChange={(e) => {setAge(e.target.value)}}/>

                <input className='bg-transparent border-y-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none text-center' type="text" value={ gender } onChange={(e) => {setGender(e.target.value)}}/>

                <input className='bg-transparent border-y-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none text-center w-60' type="text" value={ email } onChange={(e) => {setEmail(e.target.value)}}/>

                <input className='bg-transparent border-y-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none text-center' type="text" value={ phone } onChange={(e) => {setPhone(e.target.value)}}/>
              </div>
              
              <div className='flex flex-row justify-center items-center space-x-5'>
                <button className='w-full bg-amber-600 p-2 rounded-md text-xl hover:bg-amber-500 hover:text-slate-950' type='submit'>
                  Save
                </button>

                <button className='w-full p-2 rounded-md text-xl border-2 border-amber-600 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500' onClick={ handleCancelClick }>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )
      }
    </main>
  )
}

export default Dashboard