import React, { useState } from 'react'

const Recommend = (props) => {
    
    const [result, setResult] = useState(props.result)
    return (
        <>
        <div>
            <h3>Here is the restaurants we recommend for you</h3>
            <ol>
            {result.map((res) => 
                <li>{res}</li>
            )}
            </ol>
        </div>
        
        </>
    )
}

export default Recommend