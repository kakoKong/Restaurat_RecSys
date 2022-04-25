import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Card from './components/Card';

function App() {
  const [getMessage, setGetMessage] = useState({})
  const [state, setState] = useState(0)

  useEffect(()=>{
    axios.get('http://127.0.0.1:5000/').then(response => {
      setGetMessage(response)
    }).catch(error => {
      console.log(error)
    })
  }, [state])

  return (
    <div className="App">
      <nav>
        <h2>Restaurant Recommender</h2>
      </nav>
      <div className="App-header">
  
        <div>{getMessage.status === 200 ? 
        <>
          <div className="card">
            <div className='cardContext'>
            <Card/>
            </div>
        </div>
        </>
    
          :
          <>
            <div className="loader"></div>
          </>
          }</div>
          
      </div>
    </div>
  );
}

export default App;