import React from 'react'

const Person = ({name, number, handlePersonDelete}) => {
    return (
        <div>{name} {number} <button onClick={() => handlePersonDelete(name)}>delete</button></div> 
    )
}

export default Person