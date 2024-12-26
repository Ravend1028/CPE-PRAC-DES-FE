import React from 'react';
import PredictionButton from './PredictionButton';
import { useState } from 'react';

const FormData = () => {
  // Form Fields State
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState('');
  const [pulseRate, setPulseRate] = useState('');
  const [bloodOxygenLevel, setBloodOxygenLevel] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [respiratoryRate, setRespiratoryRate] = useState('');
  const [bodyTemperature, setBodyTemperature] = useState('');
  const [waistCircumference, setWaistCircumference] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const PersonData = {
      id: new Date().toString(),
      name,
      age,
      email, 
      phone,
      gender,
      vitalStatistics: {
        height,
        weight,
        bodyTemperature,
        pulseRate,
        bloodPressure,
        respiratoryRate,
        bloodOxygenLevel,
        BMI: bmi,
        waistCircumference
      }
    }

    // Can Do Api Req Here
    // Actually, Do Fetch here 
  }

  return (
    <section>
      <div className='flex justify-center items-center p-6'>
        <form onSubmit={ handleFormSubmit }>
          <div className='flex space-x-8 border-b-2 border-gray-950 pb-8'>
            <div className='flex flex-col space-y-2'>
              <label className='font-bold uppercase' htmlFor="name">Name: </label>
              <input className='border-x-2 border-gray-950 rounded-md p-2' type="text" name='name' value={ name } onChange={(e) => { setName(e.target.value) } } />
            </div>

            <div className='flex flex-col space-y-2'>
              <label className='font-bold uppercase' htmlFor="age">Age: </label>
              <input className='border-x-2 border-gray-950 rounded-md p-2' type="text" name='age' value={ age } onChange={(e) => { setAge(e.target.value) } }/>
            </div>

            <div className='flex flex-col space-y-2'>
              <label className='font-bold uppercase' htmlFor="gender">Gender: </label>
              <input className='border-x-2 border-gray-950 rounded-md p-2' type="text" name='gender' value={ gender } onChange={(e) => { setGender(e.target.value) } }/>
            </div>

            <div className='flex flex-col space-y-2'>
              <label className='font-bold uppercase' htmlFor="email">Email: </label>
              <input className='border-x-2 border-gray-950 rounded-md p-2' type="text" name='email' value={ email } onChange={(e) => { setEmail(e.target.value) } }/>
            </div>

            <div className='flex flex-col space-y-2'>
              <label className='font-bold uppercase' htmlFor="phone">Phone: </label>
              <input className='border-x-2 border-gray-950 rounded-md p-2' type="text" name='phone' value={ phone } onChange={(e) => { setPhone(e.target.value) } }/>
            </div>
          </div>

          <div className='flex justify-center items-start space-x-20 pt-8'>
            <div className='flex flex-col space-y-5'>
              <div className='flex flex-col space-y-2'>
                <label className='font-bold uppercase' htmlFor="height">Height: </label>
                <input className='border-x-2 border-gray-950 rounded-md p-2' type="text" name='height' value={ height } onChange={(e) => { setHeight(e.target.value) } }/>
              </div>

              <div className='flex flex-col space-y-2'>
                <label className='font-bold uppercase' htmlFor="weight">Weight: </label>
                <input className='border-x-2 border-gray-950 rounded-md p-2' type="text" name='weight' value={ weight } onChange={(e) => { setWeight(e.target.value) } }/>
              </div>

              <div className='flex flex-col space-y-2'>
                <label className='font-bold uppercase' htmlFor="bmi">BMI: </label>
                <input className='border-x-2 border-gray-950 rounded-md p-2' type="text" name='bmi' value={ bmi } onChange={(e) => { setBMI(e.target.value) } }/>
              </div>
            </div>
            
            <div className='flex flex-col space-y-5'>
              <div className="flex flex-col space-y-2">
                <label className='font-bold uppercase' htmlFor="pulse_rate">Pulse Rate: </label>
                <input className='border-x-2 border-gray-950 rounded-md p-2' type="text" name='pulse_rate' value={ pulseRate } onChange={(e) => { setPulseRate(e.target.value) } }/>
              </div>

              <div className="flex flex-col space-y-2">
                <label className='font-bold uppercase' htmlFor="blood_oxygen_level">Blood Oxygen Level: </label>
                <input className='border-x-2 border-gray-950 rounded-md p-2' type="text" name='blood_oxygen_level' value={ bloodOxygenLevel } onChange={(e) => { setBloodOxygenLevel(e.target.value) } }/>
              </div>

              <div className="flex flex-col space-y-2">
                <label className='font-bold uppercase' htmlFor="blood_pressure">Blood Pressure: </label>
                <input className='border-x-2 border-gray-950 rounded-md p-2' type="text" name='blood_pressure' value={ bloodPressure } onChange={(e) => { setBloodPressure(e.target.value) } }/>
              </div>
            </div>

            <div className='flex flex-col space-y-5'>
              <div className="flex flex-col space-y-2">
                <label className='font-bold uppercase' htmlFor="respiratory_rate">Respiratory Rate: </label>
                <input className='border-x-2 border-gray-950 rounded-md p-2' type="text" name='respiratory_rate' value={ respiratoryRate } onChange={(e) => { setRespiratoryRate(e.target.value) } }/>
              </div>

              <div className="flex flex-col space-y-2">
                <label className='font-bold uppercase' htmlFor="body_temperature">Body Temperature: </label>
                <input className='border-x-2 border-gray-950 rounded-md p-2' type="text" name='body_temperature' value={ bodyTemperature } onChange={(e) => { setBodyTemperature(e.target.value) } }/>
              </div>

              <div className="flex flex-col space-y-2">
                <label className='font-bold uppercase' htmlFor="waist_circumference">Waist Circumference: </label>
                <input className='border-x-2 border-gray-950 rounded-md p-2' type="text" name='waist_circumference' value={ waistCircumference } onChange={(e) => { setWaistCircumference(e.target.value) } }/>
              </div>          
            </div>

            <div className="flex flex-col space-y-10 mt-7">
              <button className='bg-gray-950 p-3 rounded-md text-white hover:bg-gray-800' type='submit'>
                Save Record
              </button>

              <PredictionButton />
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default FormData