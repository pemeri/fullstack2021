import { useState, useEffect} from 'react'
import axios from 'axios'

const CountryDetails = ({country}) => {
    //console.log(country)
    const [weatherData, setWeatherData] = useState({})
    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
        console.log(url)
        axios
          .get(url)
          .then(response => {
            //console.log(response)
            if(response.status === 200) {
                setWeatherData(response.data)
            } else {
                console.log('Failed to load weather data')
            }
          })
          .catch(error => {
              console.error(error)
          })
    }, [country])
    //console.log(weatherData.hasOwnProperty('current'))
    if(!weatherData.hasOwnProperty('current')) {
        return (
            <div>
            </div>
        )
    }
    return (
            <div>
            <h2>{country.name}</h2>
                <p>Capital {country.capital}</p>
                <p>Population {country.population}</p>
                <div>
                    Languages 
                    <ul>
                        { country.languages.map(language => <li key={language.name} >{language.name}</li>) }
                    </ul>    
                </div>
                <p>
                    <img alt={country.name} src={country.flag} style={{width: '150px', objectFit: 'contain'}} />
                </p>
                <h2>Weather in {country.capital}</h2>
                <p>{ weatherData.current.temperature }</p>
                
                <img src={weatherData.current.weather_icons} alt="weather icon" />
                <p>Wind: {weatherData.current.wind_speed} km/h direction {weatherData.current.wind_dir} </p>
        </div> 
        )
}
export default CountryDetails