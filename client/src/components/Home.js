import React from 'react';

import {BACKEND_URL} from '../common/Constants';

const callAPI = (action)=>{
  console.log(action);
  fetch(`${BACKEND_URL}/${action}`, {
    method: 'POST',
    body: JSON.stringify({}),
    headers: {'Content-Type': 'application/json'},
    cache: 'no-store'
  })
  .then(response=>{
    alert('Execute successfully.');
  })
  .catch(error=>{
    alert('Failed to execute. ' + error.message);
  })
}

const Home = ()=>{

  return (
    <div className="home">
      <div className="main-actions" style={{marginTop: '80px'}}>
        <button onClick={()=>callAPI('generate')}>Generate Data</button>
        <button onClick={()=>callAPI('reset')}>Reset Data</button>
        <button onClick={()=>callAPI('delete')}>Delete Data</button>
        <button onClick={()=>callAPI('expire')}>Expire Data</button>
      </div>
    </div>
  )
}

export default Home;