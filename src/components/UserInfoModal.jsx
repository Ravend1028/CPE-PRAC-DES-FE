import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';

const UserInfoModal = ({ setVisibility }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const modalRef = useRef(null);

  const dispatch = useDispatch();
  const [updateProfile] = useUpdateUserMutation();
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

  const handleCancelClick = () => {
    setVisibility(false);
  };

  return (
    <div className='absolute bg-gray-950 w-1/4 rounded-md p-3 text-white'>
      <form className='flex flex-col justify-center items-center space-y-5' onSubmit={ handleFormSubmit }>
        <h3 className='font-bold text-xl uppercase border-b-2 border-amber-600'>
          Edit User Info
        </h3>

        <div className='flex flex-col justify-center items-center p-3 border-b-2 border-gray-950 space-y-5'>
          <input className='bg-transparent border-y-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none text-center' type="text" value={ name } onChange={(e) => {setName(e.target.value)}}  ref={ modalRef }/>

          <input className='bg-transparent border-y-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none text-center' type="text" value={ age } onChange={(e) => {setAge(e.target.value)}}/>

          <select
            className={`bg-transparent border-y-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none text-center w-24
              ${!gender ? 'text-gray-500' : 'text-white'}`}
            name="gender"
            value={ gender }
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="" disabled hidden className="text-gray-500">M/F</option>
            <option value="M" className="text-black">M</option>
            <option value="F" className="text-black">F</option>
          </select>

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

export default UserInfoModal