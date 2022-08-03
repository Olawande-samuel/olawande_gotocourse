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
              
              columnWidth: ["85%"],
            },
            
        }
      },
      series: [
        {
          name: "Total Earnings",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ]
})
    return (
      <Chart
      options={options.options}
      series={options.series}
      type="bar"
      // width="100%"
      width="500"

      // height="250"
    />
  )
}

export default MyChart