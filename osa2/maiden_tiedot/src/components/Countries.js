import CountryDetails from './CountryDetails'

const Countries = ({countries, filterText, handleClick}) => {
    //console.log('Running Countries.js...')
    //console.log('Countries loaded: ', countries.length)

    if(countries.length === 1) {
        return <CountryDetails country={countries[0]} />
    } else if(filterText === '' || countries.length === 0) {
        return (
            <div></div>
        )
    } else if(countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if(countries.length > 1 && countries.length <= 10) {
        return (
            <div>
                { countries.map(country => <div key={country.name}>{country.name} <button onClick={() => handleClick(country.name)}>Show</button></div>) }
            </div>
        )
    } 
    
}

export default Countries