import axios from 'axios'
import React, { useEffect, useState } from 'react'

const List = (props) => {
    const [data, setData] = useState([])
    const [names, setNames] = useState([])
    const [urls, setUrl] = useState([])
    const [choosen, setChoosen] = useState([])
    const userNumber = props.userNumber;
    useEffect( () => {  
        axios.get('http://127.0.0.1:5000//list/')
        .then( (res) =>{

            setNames(Object.entries(res.data))
            
        })
        .catch(err => console.log(err))
        // console.log(choosen)
    }, [choosen])

    const addToList = (restaurant) => {
        if (choosen.length<userNumber){
            setChoosen([...choosen, restaurant[1].Name])
        }
        else{
            alert(`Already had ${userNumber} restaurant(s) chosen`)
        }
    }
    const reset = () => {
        setChoosen([])
    }

    const handleSubmit = (restaurant) => {
        props.setRes(restaurant)
        props.setState(props.state + 1)
    }
    return (
        <>
        {/* <div> */}
            {/* <h4>List</h4> */}
        {/* </div> */}
        <div>

        <h3>{userNumber} Person(s)</h3>
        {names.slice(0, 20).map((restaurant) => {
            // console.log(restaurant[1].Name)
            return(
            <button onClick={()=>addToList(restaurant)} key={restaurant[0]}>{restaurant[1].Name}</button>
        )
        })}
        <h2>Your Choices</h2>
        {/* <h4>[</h4> */}
        {choosen.map((res) => {
            return(<p>{res}</p>) 
        })}
        {/* <h4>]</h4> */}
        <button disabled={choosen.length == 0} onClick={()=>reset()}>Reset</button>
        <button disabled={choosen.length == userNumber ? false : true} onClick={() => handleSubmit(choosen)}>Confirm</button>
        </div>
        </>
    )
}

export default List