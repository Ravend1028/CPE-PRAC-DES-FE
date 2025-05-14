import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useUpdateUserVitalsMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setVitalStatistics } from '../slices/authSlice';

const ManualFields = ({ phaseThree, setPredictionButton, setPhaseOne, setPhaseTwo, setPhaseThree }) => {
  const buttonUI = phaseThree ? 'flex justify-center items-center w-full p-3 rounded-md text-xl bg-slate-200 text-slate-400' : 'flex justify-center items-center w-full p-3 rounded-md text-xl border-2 border-amber-600 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500';

  const [bloodPressure, setBloodPressure] = useState('');
  const [respiratoryRate, setRespiratoryRate] = useState('');
  const [waist, setWaistCircumference] = useState('');
  const [hips, setHips] = useState('');
  const [vice, setVice] = useState('');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');

  const { userInfo } = useSelector((state) => state.auth); 
  const { vitalStatistics } = userInfo;
  const { _id } = userInfo;

  // const [manualValues, setManualValues] = useState({
  //   bloodPressure: vitalStatistics.bloodPressure,
  //   respiratoryRate: vitalStatistics.respiratoryRate,
  //   waist: vitalStatistics.waist,
  //   hips: vitalStatistics.hips,
  //   smokerOrNo: vitalStatistics.smokerOrNo
  // });

  // const manualValuesRef = useRef(manualValues);

  const dispatch = useDispatch();
  const [updateVitals] = useUpdateUserVitalsMutation();
  const vitalRef = useRef(vitalStatistics);

  
  useEffect(() => {

    const [sys, dia] = vitalStatistics.bloodPressure.split('/');
    setSystolic(sys);
    setDiastolic(dia);
    setBloodPressure(vitalStatistics.bloodPressure)
    setRespiratoryRate(vitalStatistics.respiratoryRate);
    setWaistCircumference(vitalStatistics.waist);
    setHips(vitalStatistics.hips);
    setVice(vitalStatistics.smokerOrNo);

    vitalRef.current = vitalStatistics;
  }, [
    vitalStatistics
  ]);

  const saveManualReadings = async () => {
    const manualData = {
      respiratoryRate,
      bloodPressure: `${systolic}/${diastolic}`,
      waist,
      hips,
      smokerOrNo: vice
    }

    await dispatch(setVitalStatistics(manualData));

    console.log(vitalStatistics);

    try {
      const res = await updateVitals({ _id, vitalStatistics: vitalRef.current }).unwrap();
      toast.success(`Manual readings have been saved succesfully`);
      // setReading(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }

    setPhaseOne(true);
    setPhaseTwo(true);
    setPhaseThree(true);
    setPredictionButton(false);
  };

  const handleViceChange = (e) => {
    setVice(e.target.value);
  };

  return (
    <div className='relative grid grid-cols-4 gap-5 p-6 pt-1' data-tour="step-4">
      <h6 className='absolute -top-6 -right-5 uppercase font-bold text-red-600'>
        Phase 3
      </h6>

      <div className="flex flex-col space-y-5">
        {/* <div className="flex flex-col justify-center space-y-2">
          <label className='font-bold uppercase' htmlFor="bloodPressure">Blood Pressure: </label>
          <input className='bg-transparent border-x-2 border-slate-950 rounded-md p-2 focus:border-slate-950 focus:ring-2 focus:ring-slate-950 outline-none' type="text" name='bloodPressure' value={ bloodPressure } placeholder='Enter your BP' 
          onChange={(e) => {

            const newValue = e.target.value;
            setBloodPressure(newValue);
            
            // setManualValues((prev) => ({
            //   ...prev,
            //   bloodPressure: newValue
            // }));

            }}/>
        </div> */}
        <div className="flex flex-col justify-center space-y-2">
          <label className='font-bold uppercase' htmlFor="bloodPressure">Blood Pressure: (Systolic / Diastolic)</label>
          <div className='flex flex-row justify-between items-center space-x-3'>
            <select
              className='w-1/2 bg-transparent border-x-2 border-slate-950 rounded-md p-2 focus:border-slate-950 focus:ring-2 focus:ring-slate-950 outline-none'
              value={systolic}
              onChange={(e) => setSystolic(e.target.value)}
            >
              <option value="">Select Systolic</option>
              {[...Array(200)].map((_, i) => {
                const val = 1 + i; // 90 to 180
                return <option key={val} value={val}>{val}</option>;
              })}
            </select>

            <p>
              /
            </p>

            <select
              className='w-1/2 bg-transparent border-x-2 border-slate-950 rounded-md p-2 focus:border-slate-950 focus:ring-2 focus:ring-slate-950 outline-none'
              value={diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
            >
              <option value="">Select Diastolic</option>
              {[...Array(200)].map((_, i) => {
                const val = 1 + i; // 60 to 120
                return <option key={val} value={val}>{val}</option>;
              })}
            </select>
          </div>

        </div>

        <div className="flex flex-col justify-center space-y-2">
          <label className='font-bold uppercase' htmlFor="respiratoryRate">Respiratory Rate: (bpm)</label>
          <select
            className='bg-transparent border-x-2 border-slate-950 rounded-md p-2 focus:border-slate-950 focus:ring-2 focus:ring-slate-950 outline-none'
            value={respiratoryRate}
            onChange={(e) => setRespiratoryRate(e.target.value)}
          >
            <option value="">Select Rate</option>
            {[...Array(100)].map((_, i) => {
              const val = 1 + i; // 10 to 100
              return <option key={val} value={val}>{val}</option>;
            })}
          </select>
        </div>
      </div>

      <div className="flex flex-col space-y-5">
        <div className="flex flex-col justify-center space-y-2">
          <label className='font-bold uppercase' htmlFor="waist">Waist Circumference: (cm)</label>
          <select
            className='bg-transparent border-x-2 border-slate-950 rounded-md p-2 focus:border-slate-950 focus:ring-2 focus:ring-slate-950 outline-none'
            value={waist}
            onChange={(e) => setWaistCircumference(e.target.value)}
          >
            <option value="">Select Waist (cm)</option>
            {[...Array(100)].map((_, i) => {
              const val = 1 + i; // 50 to 150 cm
              return <option key={val} value={val}>{val}</option>;
            })}
          </select>
        </div>

        <div className="flex flex-col justify-center space-y-2">
          <label className='font-bold uppercase' htmlFor="hips">Hip Circumference: (cm)</label>
          <select
            className='bg-transparent border-x-2 border-slate-950 rounded-md p-2 focus:border-slate-950 focus:ring-2 focus:ring-slate-950 outline-none'
            value={hips}
            onChange={(e) => setHips(e.target.value)}
          >
            <option value="">Select Hips (cm)</option>
            {[...Array(100)].map((_, i) => {
              const val = 1 + i; // 50 to 150 cm
              return <option key={val} value={val}>{val}</option>;
            })}
          </select>
        </div>
      </div>

      <div className="flex flex-col space-y-5">
        <div className="flex flex-col justify-center space-y-2">
          <label className='font-bold uppercase' htmlFor="waistToHipsRatio"> Waist to Hips Ratio: </label>
          <input className='bg-transparent border-x-2 border-slate-950 rounded-md p-2 focus:border-slate-950 focus:ring-2 focus:ring-slate-950 outline-none' type="number" name='waistToHipsRatio' value={ isNaN(waist/hips) || 0 ? 0 : (waist/hips).toFixed(2) } readOnly/>
        </div>

        <div className="flex flex-col justify-center items-center space-y-2">
          <h4 className='uppercase font-bold'>
            Smoker/Alcoholic ?
          </h4>

          <div className="flex flex-row justify-center items-center space-x-5">
            <div>
              <input type="radio" id="yes" name="smokerOrNo" value="1" onChange={ handleViceChange }/>
              <label htmlFor="yes" className='ml-2'>Yes</label>
            </div>

            <div>
              <input type="radio" id="no" name="smokerOrNo" value="0" onChange={ handleViceChange }/>
              <label htmlFor="no" className='ml-2'>No</label>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col justify-center items-center space-y-5'>
        <button className={ buttonUI } onClick={ saveManualReadings } disabled={ phaseThree }>
          Save Manual Readings
        </button>
      </div>
    </div>
  )
}

export default ManualFields