import React, { useState, useEffect } from 'react'
import Countries from './components/Countries'
import axios from 'axios'

const App = (props) => {
  const [filterText, setFilterText] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('')
  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        //console.log('Fetching country data: ', response)
        if(response.status === 200) {
          setAllCountries(response.data)
        } else {
          console.log('Failed to load country data')
        }
      })
      .catch(error => {
        console.error(error)
    })
  }, [])

  
  const handleCountryChange = (event) => {
    setFilterText(event.target.value)
    setSelectedCountry('')
  }

  const handleClick = (country) => {
    setSelectedCountry(country)
  }

  let filteredCountries = [...allCountries]
  if(selectedCountry !== '') {
    filteredCountries = allCountries.filter(country => country.name.toLowerCase() === selectedCountry.toLocaleLowerCase())
  } else {
    filteredCountries = allCountries.filter(country => country.name.toLowerCase().includes(filterText.toLocaleLowerCase()))
  }
    

  return (
    <div>
      Find countries <input value={filterText} onChange={handleCountryChange} />
      <Countries countries={ filteredCountries } filterText={filterText} handleClick={handleClick} />
    </div>
  )
}

export default App 