import axios from 'axios'
import React, { useEffect, useState } from 'react'

const List = () => {
    const [data, setData] = useState([])
    const [names, setNames] = useState([])
    const [urls, setUrl] = useState([])
    const [choosen, setChoosen] = useState([])
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
        console.log(choosen)
    }, [choosen])

    const addToList = (restaurant) => {
        if (choosen.length<4){
            setChoosen([...choosen, restaurant])
        }
        else{
            alert('Choose Too Much')
        }
    }
    const reset = () => {
        setChoosen([])
    }
    return (
        <>
        {/* <div> */}
            {/* <h4>List</h4> */}
        {/* </div> */}
        <div>

        <h3>List</h3>
        {names.slice(0, 20).map((restaurant) => {
            // console.log(restaurant[1].Name)
            return(
            <button onClick={()=>addToList(restaurant)} key={restaurant[0]}>{restaurant[1].Name}</button>
        )
        })}
        <h2>Your Choices</h2>
        {choosen.map((res) => {
            return(<p key={res[0]}>{res[1].Name}</p>) 
        })}
        <button onClick={()=>reset()}>Reset</button>
        </div>
        </>
    )
}

export default List