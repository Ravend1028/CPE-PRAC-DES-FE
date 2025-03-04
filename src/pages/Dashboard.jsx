import React from 'react';
import { useState, useEffect } from 'react'; 
import { toast } from 'react-toastify';
import { setCredentials } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import { MdEditSquare } from "react-icons/md";
import Gauge from '../components/Gauge';

const Dashboard = () => {
  // I should create a modal here to edit personal info but not readings
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

  const { userInfo } = useSelector((state) => state.auth); // React Redux Hook
  const { vitalStatistics } = userInfo;

  useEffect(() => {
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
    vitalStatistics.waistCircumference
  ]);

  // Modal Event Listener
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateProfile({
        test: 'Test' // consider sending here new data -- pass the new modal data
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Profile Updated');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };  

  return (
    <main>
      <div className="container mx-auto p-6 flex flex-col font-poppins space-y-2">
        <div className='flex justify-center items-center p-3 border-b-2 border-gray-950 space-x-10'>
          <input className='bg-transparent border-y-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none text-center' type="text" readOnly value={ name }/>

          <input className='bg-transparent border-y-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none text-center' type="text" readOnly value={ age }/>

          <input className='bg-transparent border-y-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none text-center w-28' type="text" readOnly value={ gender }/>

          <input className='bg-transparent border-y-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none text-center w-72' type="text" readOnly value={ email }/>

          <input className='bg-transparent border-y-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none text-center' type="text" readOnly value={ phone }/>

          <button className='p-3 rounded-md text-3xl hover:border-amber-500 hover:bg-amber-500'>
            <MdEditSquare />
          </button>
        </div>

        <div className='grid grid-cols-3 gap-5 p-3'>
          { 
            Object.entries(vitalStatistics).map(([key, value]) => (
              <Gauge key={key} value={value} label={key} />
            ))
          }

          <div className='flex flex-row justify-center items-center space-x-5'>
            <button className='w-full bg-amber-600 p-3 rounded-md text-xl hover:bg-amber-500 hover:text-slate-950'>
              Predict Conditions
            </button>

            <button className='w-full p-3 rounded-md text-xl border-2 border-amber-600 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500'>
              Get Readings
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Dashboard