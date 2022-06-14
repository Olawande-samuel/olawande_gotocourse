import React, {useState} from 'react'
import Chart from "react-apexcharts"
  
  
  
  
  
const MyChart = () => {
  const [options, setOptions] = useState({
    options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          title: {
            text: 'Timeline',
          },
        },
        yaxis: {
            categories: [1000,5000, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000],
            title: {
                text: 'Earnings (USD)',
              },
        },
        legend: {
            position: "top",
            horizontalAlign: "center"
        },
        colors: ["#FF5B5A"],
        plotOptions: {
            bar: {
              dataLabels: {
                enabled: false,
                position: 'top', 
              },
              
              // columnWidth: ["35%"],
            },
            
        }
      },
      series: [
        {
          name: "Total Earnings",
          data: [1500,  5000, 15000, 30000, 60000, 80000, 75000, 100000, 90000,80000, 98000, 99000]
        }
      ]
})
    return (
      <Chart
      options={options.options}
      series={options.series}
      type="bar"
      width="100%"
      // height="250"
    />
  )
}

export default MyChart