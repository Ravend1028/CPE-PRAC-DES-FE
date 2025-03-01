import React from 'react';
import { useState } from 'react';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  
  return (
    <main className='bg-gray-950'>
      <div className="container mx-auto p-6 flex justify-center items-center h-[100vh]">

        <form className='flex flex-col space-y-5 w-1/3 p-5 rounded-md border-2 border-gray-950 text-white'>
          <h3 className='uppercase font-bold text-center text-2xl mb-5'>
            Sign up
          </h3>

          <div className="flex flex-row justify-center items-center space-x-8">
            <div className="flex flex-col space-y-2">
              <div className="flex flex-col justify-center space-y-2">
                <label className='font-bold uppercase' htmlFor="username">Username: </label>
                <input className='bg-transparent border-b-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none' type="text" name='username' value={ username } placeholder='Enter your username' onChange={(e) => {setUsername(e.target.value)}}/>
              </div>

              <div className="flex flex-col justify-center space-y-2">
                <label className='font-bold uppercase' htmlFor="fullname">Full name: </label>
                <input className='bg-transparent border-b-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none' type="text" name='fullname' value={ fullname } placeholder='Enter your full name' onChange={(e) => {setFullname(e.target.value)}}/>
              </div>

              <div className="flex flex-col justify-center space-y-2">
                <label className='font-bold uppercase' htmlFor="password">Password: </label>
                <input className='bg-transparent border-b-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none' type="password" name='password' value={ password } placeholder='Enter your password' onChange={(e) => {setPassword(e.target.value)}}/>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="flex flex-col justify-center space-y-2">
                <label className='font-bold uppercase' htmlFor="email">Email: </label>
                <input className='bg-transparent border-b-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none' type="text" name='email' value={ email } placeholder='Enter your email' onChange={(e) => {setEmail(e.target.value)}}/>
              </div>

              <div className="flex flex-col justify-center space-y-2">
                <label className='font-bold uppercase' htmlFor="phone">Phone number: </label>
                <input className='bg-transparent border-b-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none' type="text" name='phone' value={ phone } placeholder='Enter your phone number' onChange={(e) => {setPhone(e.target.value)}}/>
              </div>

              <div className="flex flex-row">
                <div className="flex flex-col justify-center items-center space-y-2">
                  <label className='font-bold uppercase' htmlFor="age">Age: </label>
                  <input className='bg-transparent border-b-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none w-1/2' type="text" name='age' value={ age } placeholder='Age' onChange={(e) => {setAge(e.target.value)}}/>
                </div>

                <div className="flex flex-col justify-center items-center space-y-2">
                  <label className='font-bold uppercase' htmlFor="gender">Gender: </label>
                  <input className='bg-transparent border-b-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none w-1/2' type="text" name='gender' value={ gender } placeholder='M/F' onChange={(e) => {setGender(e.target.value)}}/>
                </div>
              </div>
            </div> 
          </div>

          <button className='bg-amber-600 p-3 rounded-md text-white hover:bg-amber-500' type='submit'>
            Signup
          </button>

          <button className='underline p-3 rounded-md text-white hover:text-amber-500'>
            Login
          </button>
        </form>

      </div>
    </main>
  )
}

export default Signup