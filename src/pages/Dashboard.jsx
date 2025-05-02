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
import ResetButtonsState from '../components/ResetButtonsState';
import { useTour } from "@reactour/tour";
import ManualFields from '../components/ManualFields';

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

  // Phasing State
  const [phaseOne, setPhaseOne] = useState(false);
  const [phaseTwo, setPhaseTwo] = useState(true);
  const [phaseThree, setPhaseThree] = useState(true);
  const [predictionButton, setPredictionButton] = useState(true)

  const { setIsOpen } = useTour();

  useEffect(() => {
    // setIsOpen(true);
    const hasSeenTour = localStorage.getItem('hasSeenTour');

    if (!hasSeenTour) {
      setIsOpen(true); 
      localStorage.setItem('hasSeenTour', 'true');
    }

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
    setVice(vitalStatistics.smokerOrNo);

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
    vitalStatistics.smokerOrNo,
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

  const filteredKeys = orderedKeys.filter(
    key =>
      vitalStatistics.hasOwnProperty(key) &&
      !['Blood Pressure', 'Respiratory Rate'].includes(formatLabel(key))
  );
  
  // Split into first row and remaining rows
  const firstRowKeys = filteredKeys.slice(0, 3);
  const remainingKeys = filteredKeys.slice(3);

  return (
    <main className='relative flex justify-center items-center'>
      <div className="container mx-auto p-6 flex flex-col font-poppins" data-tour="step-1">

        {/* Personal Details Field Group */}
        <PersonalDetails setVisibility={ setVisibility } />

        {/* Rendering of Gauges */}
        <div className='flex flex-col'>
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
            
            // orderedKeys
            //   .filter(key => 
            //     vitalStatistics.hasOwnProperty(key) && 
            //     !['Blood Pressure', 'Respiratory Rate'].includes(formatLabel(key))
            //   )
            //   .map(key => {
            //     if (orderedKeys.indexOf(key) === 2) {
            //         return (
            //           <>
            //             <Gauge key={key} value={vitalStatistics[key]} label={formatLabel(key)}/>

            //             <ActionButtons manualValuesRef={ manualValuesRef } setPredictModal={ setPredictModal } setPredictionResult={ setPredictionResult } isReading={ isReading } setReading={ setReading } isDisabled={ phaseOne } setPhaseOne={ setPhaseOne } setPhaseTwo={ setPhaseTwo }/>
            //           </>
            //         )
            //       } else if (orderedKeys.indexOf(key) === 5) {
            //         return (
            //           <>
            //             <Gauge key={key} value={vitalStatistics[key]} label={formatLabel(key)} />

            //             <ActionButtons manualValuesRef={ manualValuesRef } setPredictModal={ setPredictModal } setPredictionResult={ setPredictionResult } isReading={ isReading } setReading={ setReading } isDisabled={ phaseTwo } setPhaseOne={ setPhaseOne } setPhaseTwo={ setPhaseTwo }/>
            //           </>
            //         )
            //       } else {
            //         return <Gauge key={key} value={vitalStatistics[key]} label={formatLabel(key)}/>
            //       }
            //     }
            //   )
            <>
              <div className='grid grid-cols-4 gap-5 p-6' data-tour="step-2">
                <div className="contents">
                  {firstRowKeys.map((key, index) => {
                    if (orderedKeys.indexOf(key) === 2) {
                      return (
                        <React.Fragment key={key}>
                          <Gauge value={vitalStatistics[key]} label={formatLabel(key)} />
                          <ActionButtons
                            // manualValuesRef={manualValuesRef}
                            setPredictModal={setPredictModal}
                            setPredictionResult={setPredictionResult}
                            isReading={isReading}
                            setReading={setReading}
                            isDisabled={phaseOne}
                            setPhaseOne={setPhaseOne}
                            setPhaseTwo={setPhaseTwo}
                            setPhaseThree={setPhaseThree}
                            id={1}
                          />
                        </React.Fragment>
                      );
                    } else if (orderedKeys.indexOf(key) === 0) {
                      const heightInCM = vitalStatistics[key];
                      const inches = (parseFloat(heightInCM) / 2.54).toFixed(2);
                      // const feet = Math.floor(inches / 12).toFixed(2);
                      // const remainingInches = (inches % 12).toFixed(0); // or toFixed(1) if you want precision
                      // const heightInFeetInches = `${feet}'${remainingInches}"`;

                      return <Gauge key={key} value={ inches } label={formatLabel(key)} />
                    } else {
                      return (
                        <Gauge key={key} value={vitalStatistics[key]} label={formatLabel(key)} />
                      );
                    }
                  })}
                </div>
              </div>

              <div className='grid grid-cols-4 gap-5 p-6 pt-0' data-tour="step-3">
                <div className="contents">
                  {remainingKeys.map((key, index) => {
                    if (orderedKeys.indexOf(key) === 5) {
                      return (
                        <React.Fragment key={key}>
                          <Gauge value={vitalStatistics[key]} label={formatLabel(key)} />
                          <ActionButtons
                            // manualValuesRef={manualValuesRef}
                            setPredictModal={setPredictModal}
                            setPredictionResult={setPredictionResult}
                            isReading={isReading}
                            setReading={setReading}
                            isDisabled={phaseTwo}
                            setPhaseOne={setPhaseOne}
                            setPhaseTwo={setPhaseTwo}
                            setPhaseThree={setPhaseThree}
                            id={2}
                          />
                        </React.Fragment>
                      );
                    } else {
                      return (
                        <Gauge key={key} value={vitalStatistics[key]} label={formatLabel(key)} />
                      );
                    }
                  })}
                </div>
              </div>
            </>
          }

          {/* {
            isReading && (
              <ReadingAlert />
            )
          } */}
        </div>

       {/* Manual Field */}
        <ManualFields phaseThree={ phaseThree } setPredictionButton={ setPredictionButton } setPhaseOne={ setPhaseOne } setPhaseTwo={ setPhaseTwo } setPhaseThree={ setPhaseThree } setReading={ setReading }/>
          
        <div className="grid grid-cols-4 gap-5 p-6 pt-1 mt-5">
          <div className='flex justify-center items-center' data-tour="step-5">
            <PredictButton setPredictModal={ setPredictModal } setPredictionResult={ setPredictionResult } enablePrediction={ predictionButton }/>
          </div>

          <ResetButtonsState setPhaseOne={ setPhaseOne } setPhaseTwo={ setPhaseTwo } setPhaseThree={ setPhaseThree } setPredictionButton={ setPredictionButton }/>

          {
            isReading && (
              <div className='col-span-2'>
                <ReadingAlert />
              </div>
            )
          }
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