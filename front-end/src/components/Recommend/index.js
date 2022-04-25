import React, { useState } from 'react'

const Recommend = (props) => {
    
    const [result, setResult] = useState(props.result)
    
    return (
        <>
        <div>
            <h5>Here is the restaurants we recommend for you</h5>
            {result.map((res, index) => 
            <>
                <RestaurantCard key={index} name={res.Name} style={res['Cuisine Style']} url={res.URL_TA} rating={res.Rating}>
            </RestaurantCard>
            </>
            )}
        </div>
        
        </>
    )
}

const RestaurantCard = (props) => {
    const name = props.name
    const style = props.style
    const link = `https://www.tripadvisor.co.uk${props.url}`
    const rating = props.rating

    return (
        <a href={link} target="_blank" rel="noreferrer">
            <div className='restaurant-card'>
                <h2>{name}</h2>
                <h4>{rating} Stars</h4>
                <p>{style}</p>
            </div>
        </a>
    )
    
}

export default Recommend