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
            // console.log(res.data.length())
            // console.log(typeof(res.data[0]))
            // console.log()
            
            setNames(Object.entries(res.data))
            // console.log(data.Name)
            // console.log(typeof(names))
            // setNames(Object.entries(names[1]))
            // console.log(typeof(names))
            // console.log(names.slice(0, 10))
        })
        .catch(err => console.log(err))
        // console.log(choosen)
    }, [choosen])

    const addToList = (restaurant) => {
        if (choosen.length<userNumber){
            setChoosen([...choosen, restaurant])
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
            return(<p key={res[0]}>{res[1].Name}</p>) 
        })}
        {/* <h4>]</h4> */}
        <button onClick={()=>reset()}>Reset</button>
        <button disabled={choosen.length == userNumber ? false : true} onClick={() => handleSubmit(choosen)}>Confirm</button>
        </div>
        </>
    )
}

export default List