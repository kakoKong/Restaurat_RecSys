import './index.css'
import React from 'react'
import Instruction from '../Instruction';
import List from '../List';

const Card = (props) => {
    const state = props.state;
    console.log(state)
    if (state == 0){
        return (
            <Instruction/>
        )
    }
    else {
        return (
            <List />
        )
    }
    
}

export default Card