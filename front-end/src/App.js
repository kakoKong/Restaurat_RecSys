import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { User } from './components/user.js';

function App() {
  const [getMessage, setGetMessage] = useState({})
  const [name, setName] = useState({type: 'str', message: ''})

  const [resList, setResList] = useState([])
  useEffect(()=>{
    axios.get('http://127.0.0.1:5000//predict/').then(response => {
      // console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error => {
      console.log(error)
    })
    console.log(name)
    submitName(name)
  }, [name])

  const submitName = async (resName) => {
    
    console.log(resName)
    await axios.post('http://127.0.0.1:5000//predict/', resName).then(res =>{
      console.log(res)
      console.log(typeof(res.data))
      setResList(Object.values(res.data))
    }).catch(err =>
      console.log(err)
      )
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Restaurant Recommender System</h1>
        {/* <p>React + Flask Tutorial</p> */}
        <div>{getMessage.status === 200 ? 
        <>
          <h3>{getMessage.data.message}</h3>
          <div>
          <button onClick={()=>setName({...name, message: 'Bollywood Brasserie'})}>Enter Name</button>
          <button onClick={()=>setName({...name, message: 'Bar 61 Restaurant'})}>Enter Name</button>
          <button onClick={()=>setName({...name, message: 'The Five Fields'})}>Enter Name</button>
          <button onClick={()=>setName({...name, message: 'The Golden Chippy'})}>Enter Name</button>
          <div>
            <ul>
            {resList.map(res => (
              
              <li>{res}</li>)
            
            )}
            </ul>
          </div>
        </div>
        </>
          
          :
          <>
            <h3>LOADING</h3>
            <User />
          </>
          }</div>
      </header>
      
    </div>
  );
}

export default App;