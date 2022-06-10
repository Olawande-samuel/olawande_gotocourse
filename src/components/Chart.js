import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'My Earnings'
      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', "August", "September", "October", "November", "December"];
  
  export const data = {
    labels,
    datasets: [
      {
        label: 'Earnings',
        data: [1000, 2200, 3000, 1500, 20000, 25000, 40000, 25000, 100000, 90000, 85000, 98000], 
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };
  
  
const Chart = () => {
    return (
       <Bar options={options} data={data} />
  )
}

export default Chart