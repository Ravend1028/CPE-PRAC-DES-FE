import React from 'react';
import Chart from 'react-apexcharts';

const Gauge = ({ value, label, height = 210}) => {
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
          size: '65%',
        },
        dataLabels: {
          name: {
            show: true,
            offsetY: 20, // Push the label below gauge
            fontSize: '21px'
          },
          value: {
            show: true,
            fontSize: '21px',
            fontWeight: 'bold',
            offsetY: -15,
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
