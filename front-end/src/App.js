import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Card from './components/Card';

function App() {
  const [getMessage, setGetMessage] = useState({})
  const [name, setName] = useState({type: 'str', message: []})
  const [post, setPost] = useState({type: 'str', input: 0, message: []})
  const [load, setLoad] = useState(false)
  const [state, setState] = useState(0)

  const [resList, setResList] = useState([])
  useEffect(()=>{
    axios.get('http://127.0.0.1:5000/').then(response => {
      // console.log("SUCCESS", response)
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
        
        
        {/* <p>React + Flask Tutorial</p> */}
        <div>{getMessage.status === 200 ? 
        <>
          {/* <h3>{getMessage.data.message}</h3> */}
          <div className="card">
            <div className='cardContext'>
            <Card/>
            
            </div>
           <div>
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