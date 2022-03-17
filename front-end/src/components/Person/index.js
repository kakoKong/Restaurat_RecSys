import React from 'react'
import './index.css'

const User = (props) => {

    // const [numUser, setNumUser] = useState(0);

    const handleChange = (num) => {
        props.changeUser(num)
        props.setState(props.state + 1)
    }

    return (
        <>
        <div>
            <h2>How Many People</h2>
        <div className="container">
            <div tabIndex="-1" onClick={()=>handleChange(1)} className="userCard">
                <h1>1</h1>
            </div>
            <div tabIndex="-1" onClick={()=>handleChange(2)} className="userCard">
                <h1>2</h1>
            </div>
            <div tabIndex="-1" onClick={()=>handleChange(3)} className="userCard">
                <h1>3</h1>
            </div>
            <div tabIndex="-1" onClick={()=>handleChange(4)} className="userCard">
                <h1>4</h1>
            </div>
        </div>
        </div>
        </>
  )
}

export default User