import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'

function App() {
  const [getMessage, setGetMessage] = useState({})
  const [name, setName] = useState({type: 'str', message: 'Bollywood Brasserie'})

  useEffect(()=>{
    axios.get('http://127.0.0.1:5000//predict/').then(response => {
      console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error => {
      console.log(error)
    })

  }, [])

  const submitName = (resName) => {
    console.log('submit')
    axios.post('http://127.0.0.1:5000//predict/', resName).then(res =>{
      console.log(res)
    }).catch(err =>
      console.log(err)
      )
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>React + Flask Tutorial</p>
        <div>{getMessage.status === 200 ? 
          <h3>{getMessage.data.message}</h3>
          :
          <h3>LOADING</h3>}</div>
      </header>
      <div>
        <button onClick={()=>submitName(name)}>Enter Name</button>
      </div>
    </div>
  );
}

export default App;