import './index.css'
import React, {useEffect, useState} from 'react'
import Instruction from '../Instruction';
import List from '../List';
import User from '../Person';

const Card = (props) => {
    const [user, setUser] = useState(0);
    const [restaurant, setRestaurant] = useState([])
    useEffect(() => {
        console.log(restaurant)
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
    else {
        return (
            <List userNumber={user} setRes={setRestaurant}/>
        )
    }
    
}

export default Card