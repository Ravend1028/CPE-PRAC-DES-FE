import React from 'react'
import { Pie } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  Tooltip,
  Legend,
  ArcElement
 } from 'chart.js';
import { data } from 'autoprefixer';

ChartJS.register(
  Tooltip,
  Legend,
  ArcElement
);

const PieChart = ({ label, labels = [], datas = [] }) => {

  const options = {}

  const data = {
    labels: labels,
    datasets: [{
      label: label,
      data: datas,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]

  }

  return (
    <div className='flex flex-col space-y-8 font-poppins text-gray-200 p-3'>
      <Pie options = { options } data = { data } />

      <div className="labels">
        <ul>
          {labels.map((label, index) => (
            <li key={ index } className='mb-1'>
              { label }: <span className="font-bold">{ datas[index] }</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PieChart