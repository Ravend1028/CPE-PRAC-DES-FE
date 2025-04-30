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
  const [waistCircumference, setWaistCircumference] = useState('');

  const { userInfo } = useSelector((state) => state.auth); 
  const { vitalStatistics } = userInfo;
 
  const [manualValues, setManualValues] = useState({
    bloodPressure: vitalStatistics.bloodPressure,
    respiratoryRate: vitalStatistics.respiratoryRate
  });

  const manualValuesRef = useRef(manualValues);

  useEffect(() => {
    setHeight(vitalStatistics.height);
    setWeight(vitalStatistics.weight);
    setBodyTemperature(vitalStatistics.bodyTemperature);
    setPulseRate(vitalStatistics.pulseRate);
    setBloodPressure(vitalStatistics.bloodPressure);
    setRespiratoryRate(vitalStatistics.respiratoryRate);
    setBloodOxygenLevel(vitalStatistics.bloodOxygenLevel);
    setBMI(vitalStatistics.BMI);
    setWaistCircumference(vitalStatistics.waistCircumference);

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
    vitalStatistics.waistCircumference,
    manualValues
  ]);

  const formatLabel = (key) => {
    return key
      .replace(/([a-z])([A-Z])/g, "$1 $2") 
      .replace(/^./, (str) => str.toUpperCase()); 
  };

  return (
    <main className='relative flex justify-center items-center'>
      <div className="container mx-auto p-6 flex flex-col font-poppins space-y-4">

        {/* Personal Details Field Group */}
        <PersonalDetails setVisibility={ setVisibility } />

        {/* Rendering of Gauges */}
        <div className='grid grid-cols-4 gap-5 p-6'>
          { 
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
          }

          {/* <ActionButtons manualValuesRef={ manualValuesRef } setPredictModal={ setPredictModal } setPredictionResult={ setPredictionResult } isReading={ isReading } setReading={ setReading }/> */}

          {/* Refactor this component into separate button and functionality */}

          {
            isReading && (
              <ReadingAlert />
            )
          }
        </div>

        {/* 
          - Include the new fields and checkboxes here
          - Include Phasing for getting readings
          - Average the gathered data to display
          - Also Instructions to be included in phasing for guiding user on how to use the fucking kiosk
        */}
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