import React from 'react';
import { useState } from 'react';

const ForgotPass = () => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  return (
    <main className='bg-gray-950'>
      <div className="container mx-auto p-6 flex justify-center items-center h-[100vh]">

        <form className='flex flex-col space-y-5 w-1/4 p-5 rounded-md border-2 border-gray-950 text-white'>
          <h3 className='uppercase font-bold text-center text-2xl mb-5'>
            Forgot Password
          </h3>

          <div className="flex flex-col justify-center space-y-2">
            <label className='font-bold uppercase' htmlFor="username">Username: </label>
            <input className='border-x-2 border-gray-950 rounded-md p-2' type="text" name='username' value={ username } placeholder='Enter your username' onChange={(e) => {setUsername(e.target.value)}}/>
          </div>

          <div className="flex flex-col justify-center space-y-2">
            <label className='font-bold uppercase' htmlFor="new-password">New Password: </label>
            <input className='border-x-2 border-gray-950 rounded-md p-2' type="password" name='new-password' value={ newPassword } placeholder='Enter your new password' onChange={(e) => {setNewPassword(e.target.value)}}/>
          </div>

          <div className="flex flex-col justify-center space-y-2">
            <label className='font-bold uppercase' htmlFor="retype-password">Retype Password: </label>
            <input className='border-x-2 border-gray-950 rounded-md p-2' type="password" name='retype-password' value={ retypePassword } placeholder='Retype your new password' onChange={(e) => {setRetypePassword(e.target.value)}}/>
          </div>

          <button className='bg-gray-950 p-3 rounded-md text-white hover:bg-gray-800' type='submit'>
            Submit
          </button>

          <button className='underline p-3 rounded-md text-gray-950 hover:text-gray-800'>
            Login
          </button>
        </form>

      </div>
    </main>
  )
}

export default ForgotPass