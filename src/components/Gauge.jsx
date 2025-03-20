import React from 'react';
import Chart from 'react-apexcharts';

const Gauge = ({ value, label, height = 200}) => {
  const options = {
    chart: {
      type: 'radialBar',
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
          size: '70%',
        },
        dataLabels: {
          name: {
            show: true,
            offsetY: 15, // Push the label below gauge
          },
          value: {
            show: true,
            fontSize: '20px',
            fontWeight: 'bold',
            formatter: function (val) {
              return val; // Display the raw value instead of percentage
            },
          },
        },
      },
    },
    labels: [label],
    colors: ['#D97706']
  };

  return (
    <div className='border-x-2 border-gray-950 rounded-md flex justify-center'>
      <Chart options={ options } series={ [value] } type="radialBar" height={ height }/>
    </div>
  );
};

export default Gauge;
