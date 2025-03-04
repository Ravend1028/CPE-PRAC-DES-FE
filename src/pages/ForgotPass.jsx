import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { useUpdateUserPasswordMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const ForgotPass = () => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  const navigate = useNavigate();
  const [updatePassword, { isLoading }] = useUpdateUserPasswordMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
      if (userInfo) {
        navigate('/dashboard');
      } 
  }, [navigate, userInfo]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updatePassword({ username, password: newPassword, retypePassword }).unwrap();
      toast.success('Password updated successfully');
      setTimeout(() => {
        navigate('/');
      }, 5000);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <main className='bg-gray-950 font-poppins'>
      <div className="container mx-auto p-6 flex justify-center items-center h-[100vh]">

        <form className='flex flex-col space-y-5 w-1/4 p-5 rounded-md border-2 border-gray-950 text-white' onSubmit={ handleFormSubmit }>
          <h3 className='uppercase font-bold text-center text-2xl mb-5'>
            Forgot Password
          </h3>

          <div className="flex flex-col justify-center space-y-2">
            <label className='font-bold uppercase' htmlFor="username">Username: </label>
            <input className='bg-transparent border-b-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none' type="text" name='username' value={ username } placeholder='Enter your username' onChange={(e) => {setUsername(e.target.value)}}/>
          </div>

          <div className="flex flex-col justify-center space-y-2">
            <label className='font-bold uppercase' htmlFor="new-password">New Password: </label>
            <input className='bg-transparent border-b-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none' type="password" name='new-password' value={ newPassword } placeholder='Enter your new password' onChange={(e) => {setNewPassword(e.target.value)}}/>
          </div>

          <div className="flex flex-col justify-center space-y-2">
            <label className='font-bold uppercase' htmlFor="retype-password">Retype Password: </label>
            <input className='bg-transparent border-b-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none' type="password" name='retype-password' value={ retypePassword } placeholder='Retype your new password' onChange={(e) => {setRetypePassword(e.target.value)}}/>
          </div>

          <button className='bg-amber-600 p-3 rounded-md text-white hover:bg-amber-500' type='submit'>
            Submit
          </button>

          <Link to='/signup' className='flex justify-center'>
            <button className='underline p-3 rounded-md text-white hover:text-amber-500'>
              Sign Up
            </button>
          </Link>
        </form>

      </div>
    </main>
  )
}

export default ForgotPass