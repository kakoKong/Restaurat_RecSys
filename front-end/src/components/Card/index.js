import './index.css'
import React, {useEffect, useState} from 'react'
import Instruction from '../Instruction';
import List from '../List';
import User from '../Person';
import Predictor from '../Predictor';

const Card = (props) => {
    const [user, setUser] = useState(0);
    const [restaurant, setRestaurant] = useState([])
    const [resList, setResList] = useState([])
    useEffect(() => {
        console.log(restaurant)
        // console.log(resList)
    }, [restaurant])
    const state = props.state;
    console.log(state)
    
    // const handleChange = () => {
    //     setUser(user)
    // }
    if (state === 0){
        return (
            <Instruction/>
        )
    }
    else if (state === 1){
        return (
            // <>
            // <h1>How Many People</h1>
            <User changeUser={setUser}/>
            // </>
        )
    }
    else if (state === 2) {
        return (
            <List userNumber={user} setRes={setRestaurant}/>
        )
    }
    else{
        return(
        <Predictor chosenRes={restaurant} setResult={setResList}/>
        )
    }
    
}

export default Card