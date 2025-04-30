import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';  
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../slices/usersApiSlice';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch(); // React Redux Hook

  const { userInfo } = useSelector((state) => state.auth);

  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard');
    } 
  }, [navigate, userInfo]);
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validation Here
    try {
      const res = await register({ username, password, name: fullname, email, phone, age, gender }).unwrap();
      toast.success('Account created successfully!');
      // Delay navigation to allow the toast to be displayed
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

        <form className='flex flex-col space-y-5 w-1/3 p-5 rounded-md border-2 border-gray-950 text-white' onSubmit={ handleFormSubmit }>
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
                <input className='bg-transparent border-b-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none' type="text" name='name' value={ fullname } placeholder='Enter your full name' onChange={(e) => {setFullname(e.target.value)}}/>
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
                  <input className='bg-transparent border-b-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none w-1/3' type="text" name='age' value={ age } placeholder='Age' onChange={(e) => {setAge(e.target.value)}}/>
                </div>

                <div className="flex flex-col justify-center items-center space-y-2">
                  <label className="font-bold uppercase" htmlFor="gender">Gender:</label>
                  <select
                    className={`bg-transparent border-b-2 border-amber-600 rounded-md p-2 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 outline-none w-3/4
                      ${!gender ? 'text-gray-500' : 'text-white'}`} // Change color dynamically
                    name="gender"
                    value={ gender }
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="" disabled hidden className="text-gray-500">M/F</option>
                    <option value="M" className="text-black">M</option>
                    <option value="F" className="text-black">F</option>
                  </select>
                </div>
              </div>
            </div> 
          </div>

          <button className='bg-amber-600 p-3 rounded-md text-white hover:bg-amber-500' type='submit'>
            Sign Up
          </button>

          <Link to='/login' className='flex justify-center'>
            <button className='underline p-3 rounded-md text-white hover:text-amber-500'>
              Login
            </button>
          </Link>
        </form>

      </div>
    </main>
  )
}

export default Signup