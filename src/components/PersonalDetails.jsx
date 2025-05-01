import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MdEditSquare } from "react-icons/md";

const PersonalDetails = ({ setVisibility }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const { userInfo } = useSelector((state) => state.auth); 

  useEffect(() => {
    setName(userInfo.name);
    setAge(userInfo.age);
    setGender(userInfo.gender);
    setEmail(userInfo.email);
    setPhone(userInfo.phone);
  }, [
    userInfo.name, 
    userInfo.age, 
    userInfo.gender, 
    userInfo.email, 
    userInfo.phone,
  ]);

  const handleToggleClick = () => {
    setVisibility(true);
  }; 

  return (
    <div className='flex justify-center items-center p-3 border-b-2 border-gray-950 space-x-10 mb-4'>
      <input className='bg-transparent border-y-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none text-center' type="text" readOnly value={ name }/>

      <input className='bg-transparent border-y-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none text-center' type="text" readOnly value={ age }/>

      <input className='bg-transparent border-y-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none text-center w-28' type="text" readOnly value={ gender }/>

      <input className='bg-transparent border-y-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none text-center w-72' type="text" readOnly value={ email }/>

      <input className='bg-transparent border-y-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none text-center' type="text" readOnly value={ phone }/>

      <button className='p-3 rounded-md text-3xl hover:border-amber-500 hover:bg-amber-500' onClick={ handleToggleClick }>
        <MdEditSquare />
      </button>
    </div>
  )
}

export default PersonalDetails