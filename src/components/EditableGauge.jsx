import React from 'react';
import Chart from 'react-apexcharts';

const EditableGauge = ({ value, label, height = 210, onChange }) => {
  const handleInput = (e) => {
    const val = e.target.value;
    // if (!isNaN(val)) 
    onChange(val);
  };

  const options = {
    chart: {
      type: 'radialBar',
      // sparkline: { enabled: true },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: '#333',
          startAngle: -90,
          endAngle: 90,
        },
        hollow: {
          size: '65%',
        },
        dataLabels: {
          name: {
            show: true,
            offsetY: 25,
            fontSize: '21px',
          },
          value: {
            show: true,
            fontSize: '21px',
            fontWeight: 'bold',
            offsetY: -15,
            formatter: () => value,
          },
        },
      },
    },
    labels: [label],
    colors: ['#D97706'],
  };

  return (
    <div className="relative border-x-2 border-gray-950 rounded-md flex justify-center items-center" style={{ height }}>
      <Chart options={options} series={[value]} type="radialBar" height={height} />
      
      <input
        type="text"
        value={ value }
        onChange={ handleInput }
        className="absolute text-center text-lg font-bold w-16 bg-transparent border-2 border-gray-950 focus:outline-none"
        style={{ top: '42%', left: '50%', transform: 'translate(-50%, -50%)' }
      }
      />
    </div>
  );
};

export default EditableGauge;
