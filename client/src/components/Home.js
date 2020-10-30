import React, {useState} from 'react';

import {BACKEND_URL} from '../common/Constants';

const Home = ()=>{
  const [loading, setLoading] = useState(false);
  const callAPI = (action)=>{
    console.log(action);
    setLoading(true);
    fetch(`${BACKEND_URL}/${action}`, {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {'Content-Type': 'application/json'},
      cache: 'no-store'
    })
    .then(response=>{
      alert('Execute successfully.');
      setLoading(false);
    })
    .catch(error=>{
      alert('Failed to execute. ' + error.message);
      setLoading(false);
    })
  }

  return (
    <div className="home">
      <div className="main-actions" style={{marginTop: '80px'}}>
        <button onClick={()=>callAPI('generate')} disabled={loading===true}>Generate Data</button>
        <button onClick={()=>callAPI('reset')} disabled={loading===true}>Reset Data</button>
        <button onClick={()=>callAPI('delete')} disabled={loading===true}>Delete Data</button>
        <button onClick={()=>callAPI('expire')} disabled={loading===true}>Expire Data</button>
      </div>
    </div>
  )
}

export default Home;