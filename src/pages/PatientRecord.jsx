import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import GaugeComponent from '../components/Gauge';
import Spinner from '../components/Spinner';
import PersonDetails from '../components/PersonDetails';
import PredictionResult from '../components/PredictionResult';
import PredictionButton from '../components/PredictionButton';

const PatientRecord = () => {

  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showResult, setShowResult] = useState(false);

  const handleShowResultClick = () => {
    setShowResult(!showResult)
  };

  useEffect( () => {
    const fetchRecord = async () => {
      const url = `http://localhost:3000/person/${ id }`;

      try {
        const response = await fetch(url, {
          method: "GET"
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const json = await response.json();

        // console.log(json);
        // setRecord(json.person.find((p) => p.id === String(id)));
        // setRecord(json.person.find((p) => p.id === id));
        // console.log(json)
        setRecord(json);
        setLoading(false);

      } catch (error) {
        console.error(error.message);
      }
    };

    fetchRecord();
  }, [id]);

  // Guard clauses to prevent rendering errors
  if (!record) {
    return <Spinner loading={ loading } />; // Render a loading state while fetching
  }

  const { vitalStatistics, name, age, gender, email, phone } = record;

  return (
    <main>
      <div className="container mx-auto p-6 flex flex-row justify-center items-start space-x-5">
        <div className="grid grid-cols-3 gap-4">
          { Object.entries(vitalStatistics).map(([key, value]) => (
            <div key={key} className="border-2 border-slate-950 rounded-md p-5">
              <GaugeComponent uom={key} value={value} />
            </div>
          )) }
        </div>

        <div className='flex flex-col space-y-5'>
          <PersonDetails
            name={name}
            age={age}
            gender={gender}
            email={email}
            phone={phone}
          >
            <PredictionButton onClick={ handleShowResultClick } />
          </PersonDetails>

          {
            showResult ? <PredictionResult /> : ''
          }

        </div>
      </div>
    </main>
  )
}

export default PatientRecord