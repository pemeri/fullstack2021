import React, { useState, useEffect } from 'react'
import FilterForm from './components/FilterForm'
import AddPersonForm from './components/AddPersonForm'
import Persons from './components/Persons'
import contactService from './services/contacts'
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  

  useEffect(() => {
    contactService
      .getAll()
        .then(initialContacts => {
          //console.log('Loading contacts from server...')
          setPersons(initialContacts)
      })
  }, [])


  const addName = (event) => {
    event.preventDefault()
    if(newName.length === 0) {
      return
    }
    const personObj = {
      name: newName,
      number: newNumber
    }
    if(persons.some(p => p.name === newName && p.number === newNumber)) {
      //console.log('Already in the phonebook!')
      //alert(`${newName} is already added to phonebook`)
      setErrorMessage(`${newName} is already added to phonebook`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return
    }

    
    if(persons.some(p => p.name === newName && p.number !== newNumber)) {
      const updateContact = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one? `)
      if(!updateContact) {
        return
      } else {
        
        const personArray = [...persons]
        const index = personArray.findIndex(p => p.name === newName)
        if(index !== -1) {
          console.log('Replacing id', index)

          contactService
          .update(personArray[index].id, personObj)
          .then(returnedObj => {
            personArray[index] = returnedObj
            setPersons(personArray)
            setNewName('')
            setNewNumber('')
            setNewFilter('')

            setSuccessMessage(`Updated the phone number of ${returnedObj.name} to ${returnedObj.number}`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `Information of '${personObj.name}' has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          
        }
        
      }


    } else {
      contactService
      .create(personObj)
        .then(returnedObj => {
        setPersons(persons.concat(returnedObj))
        setNewName('')
        setNewNumber('')
        setNewFilter('')

        setSuccessMessage(`Added ${returnedObj.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
    }
    
  }

  const handleFilterSubmit = (event) => event.preventDefault()

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handlePersonDelete = (name) => {
    const ready = window.confirm(`Delete ${name}`)
    if(!ready) {
      return
    }

    const result = persons.filter(p => p.name === name)
    console.log(result)
    
    if(result.length === 1) {
      const personObj = result[0]
      //console.log('Deleting ', personObj.name, personObj.id)
      contactService.remove(personObj.id)
      .then(returnedObj => {
        setPersons(persons.filter(p => p.id !== personObj.id))
        //console.log('Deleting ', returnedObj)
        setSuccessMessage(`Deleted ${personObj.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(
          `Information of '${personObj.name}' has already been removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })

    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      <FilterForm handleFilterSubmit={handleFilterSubmit} newFilter={newFilter} handleFilterChange={handleFilterChange}  />
      <h3>Add a new name</h3>
      <AddPersonForm  addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <div>
        <Persons persons={persons} newFilter={newFilter} handlePersonDelete={handlePersonDelete} />
        </div>
      
      
    </div>
  )

}

export default App