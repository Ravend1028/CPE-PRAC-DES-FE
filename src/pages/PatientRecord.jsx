import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Dashboard from '../components/Dashboard';
import Chart from '../components/Chart';
import PieChart from '../charts/PieChart';
import PersonDetails from '../components/PersonDetails';
import Spinner from '../components/Spinner';

const PatientRecord = () => {

  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);

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

        console.log(json);
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

  const { vitalStatistics } = record;

  const chartData = [
    {
      parameter: 'BMI',
      labels: ['Height', 'Weight', 'Waist Circumference'],
      datas: [vitalStatistics.height, vitalStatistics.weight, vitalStatistics.BMI],
    },
    {
      parameter: 'CARDIOVASCULAR HEALTH',
      labels: ['Pulse Rate', 'Blood Oxygen Level', 'Blood Pressure'],
      datas: [vitalStatistics.pulseRate, vitalStatistics.bloodOxigenLevel, vitalStatistics.bloodPressure],
    },
    {
      parameter: 'GENERAL HEALTH',
      labels: ['Respiratory Rate', 'Temperature'],
      datas: [vitalStatistics.respiratoryRate, vitalStatistics.bodyTemperature],
    },
  ];

  return (
    <main>
      <div className="container mx-auto p-6">
        <Dashboard>
          { chartData.map((chart, index) => (
            <Chart key = { index } parameter = { chart.parameter }>
              <PieChart labels = { chart.labels } datas = { chart.datas } />
            </Chart>
          )) }

          <PersonDetails
            name = { record.name } 
            age = { record.age }
            gender = { record.gender }
            email = { record.email }
            phone = { record.phone }
          />
        </Dashboard>
      </div>
    </main>
  )
}

export default PatientRecord