import React from 'react';
import { useState, useEffect, useRef } from 'react'; 
import { toast } from 'react-toastify';
import { setCredentials, setVitalStatistics } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateUserMutation, useUpdateUserVitalsMutation } from '../slices/usersApiSlice';
import Gauge from '../components/Gauge';
import EditableGauge from '../components/EditableGauge';
import Spinner from '../components/Spinner';
import PersonalDetails from '../components/PersonalDetails';
import UserInfoModal from '../components/UserInfoModal';
import ActionButtons from '../components/ActionButtons';
import ReadingAlert from '../components/ReadingAlert';
import PredictionModal from '../components/PredictionModal';
import PredictButton from '../components/PredictButton';

const Dashboard = () => {
  // Modal for editing user info and State
  const [isVisible, setVisibility] = useState(false);

  // State for reading esp32 sensors status
  const [isReading, setReading] = useState(false);

  // Modal for Prediction Result and State
  const [predictModal, setPredictModal] = useState(false);
  const [predictionResult, setPredictionResult] = useState({});
 
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bodyTemperature, setBodyTemperature] = useState('');
  const [pulseRate, setPulseRate] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [respiratoryRate, setRespiratoryRate] = useState('');
  const [bloodOxygenLevel, setBloodOxygenLevel] = useState('');
  const [BMI, setBMI] = useState('');
  const [waist, setWaistCircumference] = useState('');
  const [hips, setHips] = useState('');
  const [vice, setVice] = useState('');

  const { userInfo } = useSelector((state) => state.auth); 
  const { vitalStatistics } = userInfo;
 
  const [manualValues, setManualValues] = useState({
    bloodPressure: vitalStatistics.bloodPressure,
    respiratoryRate: vitalStatistics.respiratoryRate
  });

  const manualValuesRef = useRef(manualValues);

  // Phasing State
  const [phaseOne, setPhaseOne] = useState(false);
  const [phaseTwo, setPhaseTwo] = useState(true);
  const [predictionButton, setPredictionButton] = useState(true)

  useEffect(() => {
    setHeight(vitalStatistics.height);
    setWeight(vitalStatistics.weight);
    setBodyTemperature(vitalStatistics.bodyTemperature);
    setPulseRate(vitalStatistics.pulseRate);
    setBloodPressure(vitalStatistics.bloodPressure);
    setRespiratoryRate(vitalStatistics.respiratoryRate);
    setBloodOxygenLevel(vitalStatistics.bloodOxygenLevel);
    setBMI(vitalStatistics.BMI);
    setWaistCircumference(vitalStatistics.waist);
    setHips(vitalStatistics.hips);
    setVice(vitalStatistics.vice);

    manualValuesRef.current = manualValues;
  }, [
    vitalStatistics.height,
    vitalStatistics.weight,
    vitalStatistics.bodyTemperature,
    vitalStatistics.pulseRate,
    vitalStatistics.bloodPressure,
    vitalStatistics.respiratoryRate,
    vitalStatistics.bloodOxygenLevel,
    vitalStatistics.BMI,
    vitalStatistics.waist,
    vitalStatistics.hips,
    vitalStatistics.vice,
    manualValues
  ]);

  const formatLabel = (key) => {
    return key
      .replace(/([a-z])([A-Z])/g, "$1 $2") 
      .replace(/^./, (str) => str.toUpperCase()); 
  };

  const orderedKeys = [
    'height',
    'weight',
    'BMI',
    'bodyTemperature',
    'bloodOxygenLevel',
    'pulseRate',
    'bloodPressure',
    'respiratoryRate'
  ];

  return (
    <main className='relative flex justify-center items-center'>
      <div className="container mx-auto p-6 flex flex-col font-poppins space-y-4">

        {/* Personal Details Field Group */}
        <PersonalDetails setVisibility={ setVisibility } />

        {/* Rendering of Gauges */}
        <div className='grid grid-cols-4 gap-5 p-6'>
          {/* { 
            Object.entries(vitalStatistics).map(([key, value]) => (
              ['Blood Pressure', 'Respiratory Rate'].includes(formatLabel(key)) && isReading ? (
                <EditableGauge 
                  key={key} 
                  value={manualValues[key] ?? value} 
                  label={formatLabel(key)} 
                  // Update Local State
                  onChange={(val) => {
                    setManualValues((prev) => ({
                      ...prev,
                      [key]: val
                    }));
                  }
                  }
                />
              ) : (
                <Gauge key={key} value={value} label={formatLabel(key)} />
              )
            ))
          } */
            
            orderedKeys
              .filter(key => 
                vitalStatistics.hasOwnProperty(key) && 
                !['Blood Pressure', 'Respiratory Rate'].includes(formatLabel(key))
              )
              .map(key => {
                if (orderedKeys.indexOf(key) === 2) {
                    return (
                      <>
                        <Gauge key={key} value={vitalStatistics[key]} label={formatLabel(key)} />

                        <ActionButtons manualValuesRef={ manualValuesRef } setPredictModal={ setPredictModal } setPredictionResult={ setPredictionResult } isReading={ isReading } setReading={ setReading } isDisabled={ phaseOne } setPhaseOne={ setPhaseOne } setPhaseTwo={ setPhaseTwo }/>
                      </>
                    )
                  } else if (orderedKeys.indexOf(key) === 5) {
                    return (
                      <>
                        <Gauge key={key} value={vitalStatistics[key]} label={formatLabel(key)} />

                        <ActionButtons manualValuesRef={ manualValuesRef } setPredictModal={ setPredictModal } setPredictionResult={ setPredictionResult } isReading={ isReading } setReading={ setReading } isDisabled={ phaseTwo } setPhaseOne={ setPhaseOne } setPhaseTwo={ setPhaseTwo }/>
                      </>
                    )
                  } else {
                    return <Gauge key={key} value={vitalStatistics[key]} label={formatLabel(key)} />
                  }
                }
              )

          }

          {
            isReading && (
              <ReadingAlert />
            )
          }


          <div className="flex flex-col space-y-5">
            <div className="flex flex-col justify-center space-y-2">
              <label className='font-bold uppercase' htmlFor="username">Blood Pressure: </label>
              <input className='bg-transparent border-x-2 border-slate-950 rounded-md p-2 focus:border-slate-950 focus:ring-2 focus:ring-slate-950 outline-none' type="text" name='username' value={ bloodPressure } placeholder='Enter your BP' onChange={(e) => {setBloodPressure(e.target.value)}}/>
            </div>

            <div className="flex flex-col justify-center space-y-2">
              <label className='font-bold uppercase' htmlFor="username">Respiratory Rate: </label>
              <input className='bg-transparent border-x-2 border-slate-950 rounded-md p-2 focus:border-slate-950 focus:ring-2 focus:ring-slate-950 outline-none' type="text" name='username' value={ respiratoryRate } placeholder='Enter your Respiratory Rate' onChange={(e) => {setRespiratoryRate(e.target.value)}}/>
            </div>
          </div>

          <div className="flex flex-col space-y-5">
            <div className="flex flex-col justify-center space-y-2">
              <label className='font-bold uppercase' htmlFor="username">Waist Circumference: </label>
              <input className='bg-transparent border-x-2 border-slate-950 rounded-md p-2 focus:border-slate-950 focus:ring-2 focus:ring-slate-950 outline-none' type="text" name='username' value={ waist } placeholder='Enter your waist' onChange={(e) => {setWaistCircumference(e.target.value)}}/>
            </div>

            <div className="flex flex-col justify-center space-y-2">
              <label className='font-bold uppercase' htmlFor="username">Hip Circumference: </label>
              <input className='bg-transparent border-x-2 border-slate-950 rounded-md p-2 focus:border-slate-950 focus:ring-2 focus:ring-slate-950 outline-none' type="text" name='username' value={ hips } placeholder='Enter your hips' onChange={(e) => {setHips(e.target.value)}}/>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center space-y-5 border-x-2 border-slate-950 rounded-md p-2">
            <h4 className='uppercase font-bold'>
              Smoker/Alcoholic ?
            </h4>

            <div className="flex flex-row space-x-5">
                <div>
                  <input type="radio" id="yes" name="yes" value="1"/>
                  <label for="yes" className='ml-2'>Yes</label>
                </div>

                <div>
                  <input type="radio" id="no" name="no" value="0"/>
                  <label for="no" className='ml-2'>No</label>
                </div>
            </div>
          </div>

          <div className='flex justify-center items-center'>
            <PredictButton setPredictModal={ setPredictModal } setPredictionResult={ setPredictionResult } enablePrediction={ predictionButton }/>
          </div>
        </div>
      </div>

      {/* Edit User Info Modal */}
      {
        isVisible && (
          <UserInfoModal setVisibility={ setVisibility } />
        )
      }

      {/* Prediction Result Modal */}
      {
        predictModal && (
          <PredictionModal predictionResult={ predictionResult } setPredictModal={ setPredictModal }/>
        )
      }
    </main>
  )
}

export default Dashboard