import './index.css'
import React, {useEffect, useState} from 'react'
import Instruction from '../Instruction';
import List from '../List/List';
import User from '../Person';
import Predictor from '../Predictor';
import Recommend from '../Recommend';



const Card = (props) => {
    const [state, setState] = useState(0);
    const [user, setUser] = useState(0);
    const [restaurant, setRestaurant] = useState([])
    const [resList, setResList] = useState([])
    useEffect(() => {
    }, [restaurant, state])

    if (state === 0){
        return (
        <>
            <Instruction/>
            <Buttons setState={setState} state={state}/>
        </>
        )
    }
    else if (state === 1){
        return (
            <>
            {/* // <h1>How Many People</h1> */}
            <User changeUser={setUser} setState={setState} state={state}/>
            <Buttons setState={setState} state={state}/>
             </>
        )
    }
    else if (state === 2) {
        return (
            <>
            <List userNumber={user} setRes={setRestaurant} setState={setState} state={state}/>
            <Buttons setState={setState} state={state}/>
            </> 
        )
    }
    else if (state === 3) {
        return(
        <>
            <Predictor chosenRes={restaurant} setResult={setResList} setState={setState} state={state}/>
            <Buttons setState={setState} state={state}/>
        </>
        )
    }
    else {
        return (
            <>
            <Recommend result={resList}/>
            <div>
            <Buttons setState={setState} state={state}/>
            </div>
            </>
        )
    }
    
}

const Buttons = (props) => {

    const state = props.state
    const nextPage = () => {
        props.setState(props.state+1)
      }
    
    const prevPage = () => {
    props.setState(props.state-1)
    }

    const resetPage = () => {
        props.setState(0)
    }

    return(
        <>
        
        {state === 0 ? <button onClick={()=>nextPage()} className='nextButton'>Next</button>
        : state < 4 ? <><button onClick={()=>prevPage()} className='nextButton'>Back</button></>
        : <><button onClick={()=>resetPage()} className='nextButton'>Back to Beginning</button></> 
             }
        </>
    )
}

export default Card