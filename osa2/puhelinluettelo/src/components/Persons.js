import React from 'react'
import Person from './Person'

const Persons = ( {persons, newFilter, handlePersonDelete} ) => {
    return (
        <div>
        { persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())).map((person, index) => <Person key={index} name={person.name} number={person.number} handlePersonDelete={handlePersonDelete} />) }
        </div>
    )
}

export default Persons