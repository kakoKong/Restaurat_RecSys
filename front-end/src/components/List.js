import axios from 'axios'
import React, { useEffect, useState } from 'react'

const List = () => {
    const [data, setData] = useState([])
    const [names, setNames] = useState([])
    const [urls, setUrl] = useState([])
    useEffect( () => {  
        axios.get('http://127.0.0.1:5000//list/')
        .then( (res) =>{
            // console.log(res.data.length())
            console.log(typeof(res.data[0]))
            // console.log()
            
            setNames(Object.entries(res.data))
            // console.log(data.Name)
            // console.log(typeof(names))
            // setNames(Object.entries(names[1]))
            console.log(typeof(names))
            console.log(names.slice(0, 10))
        })
        .catch(err => console.log(err))
    }, [])


    return (
        <>
        <div>
            <h4>List</h4>
        </div>
        <li>

        
        {names.slice(0, 10).map((restaurant) => {
            console.log(restaurant[1].Name)
            return(
            <li key={restaurant[0]}>{restaurant[1].Name}</li>
        )
        })}
        </li>
        </>
    )
}

export default List