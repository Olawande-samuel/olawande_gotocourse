import React from 'react'
import styled from 'styled-components';

    const Button = styled.button`
        padding: 0.5rem 1rem;
        outline: none;
        font-weight: 400;
        font-size: 12px;
        line-height: 24px;
        border: 0.3px solid #0C2191;
        border-radius: 10px;
        color: #FFFFFF;
        background: #0C2191;
    `

const DownloadButton = () => {


    function downloadCsv(data){
        const blob = new Blob([data], { type: "text/csv" })
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', 'data.csv');
        document.body.appendChild(link);
        link.click();
    
        document.body.removeChild(link);
        URL.revokeObjectURL(href);       
      } 
    
    
    
      function exportCsv (e){
        e.preventDefault()
      
        let headers = ['Date, Name, Email, Phone, Program']
    
        let usersCsv = fetchAdLeads?.data?.data?.reduce((acc, item) => {
          const {createdAt, fullName, email, phone, program } = item
          acc.push([createdAt,fullName, email, phone, program].join(','))
          return acc
        }, [])
      
        let csvData = [...headers, ...usersCsv].join('\n')
    
        downloadCsv(csvData)
        
      }
  return (
    <Button>DownloadButton</Button>
  )
}

export default DownloadButton