import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import User from './components/User.js';
import List from './components/List';
import Instruction from './components/Instruction';

function App() {
  const [getMessage, setGetMessage] = useState({})
  const [name, setName] = useState({type: 'str', message: []})
  const [post, setPost] = useState({type: 'str', input: 0, message: []})
  const [load, setLoad] = useState(false)

  const [resList, setResList] = useState([])
  useEffect(()=>{
    axios.get('http://127.0.0.1:5000//predict/').then(response => {
      // console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error => {
      console.log(error)
    })
    // console.log(name)
    submitName(name)
  }, [name])

  const submitName = async (resName) => {
    
    console.log(resName)
    setLoad(true)
    await axios.post('http://127.0.0.1:5000//predict/', resName).then(res =>{
      console.log(res)
      console.log(typeof(res.data))
      setResList(Object.values(res.data))
      setLoad(false)
    }).catch(err =>
      console.log(err)
      )
  }

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
          <div class="card">
            <Instruction />
          {/* <List /> */}
          {/* <div>
           <>
              {load ? (<><div class="loader"></div></>) :
              resList.map((res, index) => (
                <ul>
                <li key={index}>{res}</li>
                </ul>
              ))
              }
            </>
          </div> */}
        </div>
        </>
          
          :
          <>
            <div class="loader"></div>
            {/* <User /> */}
          </>
          }</div>
          
      </div>
    </div>
  );
}

export default App;