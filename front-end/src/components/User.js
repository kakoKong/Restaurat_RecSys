import React, { useState } from 'react'

const User = () => {
    const [users, setUsers] = useState([
        {
            uid: 0,
            userRes: ''
        }
    ])
    function addUser(){
        
    }
    return (
        <div>
            {users.map((user) => {
                <>
                <h3>User {user.uid}</h3>
                <input value=''></input>
                </>
            })}
            <button onClick={addUser()}>Add User</button>
        </div>
    )
}

export default User;