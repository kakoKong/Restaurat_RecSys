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
    axios.get('http://127.0.0.1:5000//predict/').then(response => {
      // console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error => {
      console.log(error)
    })
    // console.log(name)
    submitName(name)
  }, [name, state])

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

  const nextPage = () => {
    setState(state+1)
  }

  const prevPage = () => {
    setState(state-1)
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
          <div className="card">
            <div className='cardContext'>
            <Card state={state}/>
            
            </div>
           <div>
             {state == 0 ? <button onClick={()=>nextPage()} className='nextButton'>Next</button>
             : <><button onClick={()=>prevPage()} className='nextButton'>Back</button>
             <button onClikc={()=>nextPage()}className='nextButton'>Next</button>
             </>
             }
            
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