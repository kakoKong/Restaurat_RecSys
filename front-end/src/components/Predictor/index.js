import React, { useState } from 'react'
import axios from 'axios'
import './index.css'

const Predictor = (props) => {
    
    const [ load, setLoad ] = useState(false);
    const [post, setPost] = useState({type: 'str',  message: props.chosenRes})

    const submitName = async (resName) => {
    
        console.log(resName)
        setLoad(true)
        await axios.post('http://127.0.0.1:5000//predict/', resName).then(res =>{
        //   console.log(res)
        //   console.log(typeof(res.data))
          props.setResult(Object.values(res.data))
          setLoad(false)
        }).catch(err =>
          console.log(err)
          )
      }

    return (
        <>
        
        <div className='predictContainer'>
            <h2>Confirm your Choice</h2>
            <div className='list'>
                {post.message.map((res) => {
                    return(<p key={res[0]}>{res[1].Name}</p>
                )})}
            </div>
            <button onClick={()=>submitName(post)}>Predict</button>
            <div>
                {load ? <div className='loaderz'></div> : <><p>Continue</p></>}
            </div>

        </div>
        
        </>
    ) 
}

export default Predictor