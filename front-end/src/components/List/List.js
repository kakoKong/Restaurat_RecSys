import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import './index.css'

const List = (props) => {
    const [names, setNames] = useState([])
    const [chosen, setChosen] = useState([])

    const userNumber = props.userNumber;
    useEffect( () => {  
        axios.get('http://127.0.0.1:5000/list/')
        .then( (res) =>{
            setNames(Object.entries(res.data))
        })
        .catch(err => console.log(err))
        // console.log(choosen)
    }, [chosen])

    const addToList = (restaurant) => {
        if (chosen.length<userNumber){
            setChosen([...chosen, restaurant.value])
        }
        else{
            alert(`Already had ${userNumber} restaurant(s) chosen`)
        }
    }

    const handleSubmit = (restaurant) => {
        props.setRes(restaurant)
        props.setState(props.state + 1)
    }

    const options = names.map(item => {
        return item[1]
    })

    const inputs = [];
    for(let i= 0; i<userNumber; i++){
        inputs.push(
        <Select 
            className='drop-down'
            options={options}
            name={`user${i}`}
            onChange={(value) => addToList(value)}
            key = {i}
        />
        )
    }
    return (
        <>
        <div>

        <h3>{userNumber} Person(s)</h3>
        {inputs}
        <h2>Your Choices</h2>
        {chosen.map((res) => {
            return(<p>{res}</p>) 
        })}
        <button className='confirmButton' disabled={chosen.length == userNumber ? false : true} onClick={() => handleSubmit(chosen)}>Confirm</button>
        </div>
        </>
    )
}

export default List