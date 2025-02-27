import React from 'react';
import { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <main className='bg-gray-950'> 
      <div className="container mx-auto p-6 flex justify-center items-center h-[100vh]">

        <form className='flex flex-col space-y-5 w-1/4 p-5 rounded-md text-white'>
          <h3 className='uppercase font-bold text-center text-2xl mb-5'>
            Login
          </h3>

          <div className="flex flex-col justify-center space-y-2">
            <label className='font-bold uppercase' htmlFor="username">Username: </label>
            <input className='bg-transparent border-b-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none' type="text" name='username' value={ username } placeholder='Enter your username' onChange={(e) => {setUsername(e.target.value)}}/>
          </div>

          <div className="flex flex-col justify-center space-y-2">
            <label className='font-bold uppercase' htmlFor="password">Password: </label>
            <input className='bg-transparent border-b-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none' type="password" name='password' value={ password } placeholder='Enter your password' onChange={(e) => {setPassword(e.target.value)}}/>
          </div>

          <button className='bg-amber-600 p-3 rounded-md text-white hover:bg-amber-500' type='submit'>
            Login
          </button>

          <button className='underline p-3 rounded-md text-white hover:text-amber-500'>
            Forgot Password
          </button>
        </form>

      </div>
    </main>
  )
}

export default Login