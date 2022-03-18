import React, { useState } from 'react'
import axios from 'axios'
import './index.css'

const Predictor = (props) => {
    
    const [ load, setLoad ] = useState(false);
    const [ predict, setPredict] = useState(false);
    const [post, setPost] = useState({type: 'str',  message: props.chosenRes})

    const submitName = async (resName) => {
    
        console.log(resName)
        setLoad(true)
        await axios.post('http://127.0.0.1:5000//predict/', resName).then(res =>{
        //   console.log(res)
        //   console.log(typeof(res.data))
          props.setResult(Object.values(res.data))
          setLoad(false)
          setPredict(true)
        //   console.log(post)
        }).catch(err =>
          console.log(err)
          )
      }

      const handleSubmit = () => {
          props.setState(props.state+1)
      }
    return (
        <>
        
        <div className='predictContainer'>
            <h2>Confirm your Choice</h2>
            <div className='list'>
                {post.message.map((res) => {
                    return(<p>{res}</p>
                )})}
            </div>
            {predict ? '' : <button className="predict" onClick={()=>submitName(post)}>Predict</button>}
            
            <div>
                {load ? <div className="loaderDiv"> <div className='loaderz'></div></div> : predict ? <button className="result" onClick={()=>handleSubmit()}>View Result</button> : ''}
            </div>

        </div>
        
        </>
    ) 
}

export default Predictor