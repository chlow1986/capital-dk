import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2'

import {BACKEND_URL} from '../common/Constants';

const Dashboard = ()=>{
  const [counts, setCounts] = useState({});

  useEffect(()=>{
    fetch(`${BACKEND_URL}/counts`)
    .then(response=>response.json())
    .then((result)=>{
      console.log(result);
      const data = {};
      result.forEach(item=>{
        data[item.activeInd] = item.count;
      })
      setCounts(data);
    })
    .catch(err=>{
      alert(err.message);
    })
  }, [])

  const data = {
    labels: ['Y', 'N'],
    datasets: [
      {
        label: '# of records',
        data: [counts.Y || 0, counts.N || 0],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  return(
    <div className="dashboard">
      {
        Object.keys(counts).length > 0 
        ? (<Pie data={data} />)
        : ('No Data')
      }
    </div>
  )
}

export default Dashboard;