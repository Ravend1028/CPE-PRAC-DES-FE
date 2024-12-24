import React from 'react';
import { useState } from 'react';
import PredictionButton from '../components/PredictionButton';
import PredictionResult from '../components/PredictionResult';

const Readings = () => {

  const [fieldAddition, setFieldAddition] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
    gender: '',
    height: '',
    weight: '',
    bmi: '',
    pulseRate: '',
    bloodOxygenLevel: '',
    bloodPressure: '',
    respiratoryRate: '',
    bodyTemperature: '',
    waist: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: Date.now().toString(), // Unique ID for each record
      name: formData.name,
      age: formData.age,
      email: formData.email,
      phone: formData.phone,
      gender: formData.gender,
      vitalStatistics: {
        height: formData.height,
        weight: formData.weight,
        bodyTemperature: formData.bodyTemperature,
        pulseRate: formData.pulseRate,
        bloodPressure: formData.bloodPressure,
        respiratoryRate: formData.respiratoryRate,
        bloodOxigenLevel: formData.bloodOxygenLevel,
        BMI: formData.bmi,
        waistCircumference: formData.waist,
      },
    };

    try {
      const response = await fetch('http://localhost:3000/person', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Record added successfully!');
        setFormData({
          name: '',
          age: '',
          email: '',
          phone: '',
          gender: '',
          height: '',
          weight: '',
          bmi: '',
          pulseRate: '',
          bloodOxygenLevel: '',
          bloodPressure: '',
          respiratoryRate: '',
          bodyTemperature: '',
          waist: '',
        });

        setFieldAddition(false);
        setShowResult(false);
      } else {
        alert('Failed to add record.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the record.');
    }
  };

  return (
    <main>
      <div className="container mx-auto p-6 flex flex-col justify-center items-center font-poppins space-y-5">
        <h2 className='font-bold text-slate-950 text-3xl uppercase'>
          Readings
        </h2>
        
        <div className='flex space-x-3'>
          <form className='flex flex-row justify-center items-start bg-slate-950 text-gray-200 p-5 rounded-md space-x-10' onSubmit = { handleSubmit } >
            {
              fieldAddition ? 
              <div className='flex flex-col'>
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" value = { formData.name } onChange = { handleChange } className='rounded-md text-slate-950 p-1' /><br/>

                <label for="age">Age:</label>
                <input type="text" id="age" name="age" value = { formData.age } onChange = { handleChange } className='rounded-md text-slate-950 p-1' /><br/>

                <label for="gender">Gender:</label>
                <input type="text" id="gender" name="gender" value = { formData.gender } onChange = { handleChange } className='rounded-md text-slate-950 p-1' /><br/>

                <label for="email">Email:</label>
                <input type="text" id="email" name="email" value = { formData.email } onChange = { handleChange }  className='rounded-md text-slate-950 p-1' /><br/>

                <label for="phone">Phone:</label>
                <input type="text" id="phone" name="phone" value = { formData.phone } onChange = { handleChange } className='rounded-md text-slate-950 p-1' /><br/>

                <button type='submit' className='bg-amber-600 rounded-md text-slate-950 p-2 font-bold'>
                  Submit
                </button>
              </div> : ''
            }
            
            <div className='flex flex-col'>
              <label for="height">Height:</label>
              <input type="text" id="height" name="height" value = { formData.height }
              onChange = { handleChange } className='rounded-md text-slate-950 p-1' /><br/>

              <label for="weight">Weight:</label>
              <input type="text" id="weight" name="weight" value = { formData.weight }
              onChange = { handleChange } className='rounded-md text-slate-950 p-1' /><br/>

              <label for="bmi">BMI:</label>
              <input type="text" id="bmi" name="bmi" value = { formData.bmi } 
              onChange = { handleChange } className='rounded-md text-slate-950 p-1' /><br/>
            </div>

            <div className='flex flex-col'>
              <label for="pulseRate">Pulse Rate:</label>
              <input type="text" id="pulseRate" name="pulseRate" value = { formData.pulseRate }
              onChange = { handleChange } className='rounded-md text-slate-950 p-1' /><br/>

              <label for="bloodOxygenLevel">Blood Oxygen Level:</label>
              <input type="text" id="bloodOxygenLevel" name="bloodOxygenLevel" value = { formData.bloodOxygenLevel }
              onChange = { handleChange } className='rounded-md text-slate-950 p-1' /><br/>

              <label for="bloodPressure">Blood Pressure:</label>
              <input type="text" id="bloodPressure" name="bloodPressure" value = { formData.bloodPressure }
              onChange = { handleChange } className='rounded-md text-slate-950 p-1' /><br/>
            </div>

            <div className='flex flex-col'>
              <label for="respiratoryRate">Respiratory Rate:</label>
              <input type="text" id="respiratoryRate" name="respiratoryRate" value = { formData.respiratoryRate }
              onChange = { handleChange } className='rounded-md text-slate-950 p-1' /><br/>

              <label for="bodyTemperature">Body Temperature:</label>
              <input type="text" id="bodyTemperature" name="bodyTemperature" value = { formData.bodyTemperature }
              onChange = { handleChange } className='rounded-md text-slate-950 p-1' /><br/>

              <label for="waist">Waist Circumference:</label>
              <input type="text" id="waist" name="waist" value = { formData.waist }
              onChange = { handleChange } className='rounded-md text-slate-950 p-1' /><br/>
            </div>
          </form>
          

          {
            showResult ? <PredictionResult style='flex flex-col rounded-md bg-amber-500 text-slate-950 p-3 space-y-3' /> : ''
          }
        </div>

        <div className='flex space-x-3 mt-6'>
          <button className='nowrap bg-slate-950 text-gray-200 rounded-md p-2 text-md hover:bg-amber-500 stext-slate-950 border-2 border-slate-950' onClick = {() => { setFieldAddition(!fieldAddition); } }>
            { fieldAddition ? 'Cancel' : 'Save' }
          </button>

          <PredictionButton style = 'text-slate-950 border-2 border-slate-950 rounded-md p-2 text-md hover:bg-amber-500' onClick={ () => { setShowResult(!showResult) } }/>
        </div>
      </div>
    </main>
  )
}

export default Readings