import React, { useEffect, useState } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY


const Countries = ({ countriesFiltered, setFilter }) => {
  if ( countriesFiltered.length > 10 ) {
    return <div>Too many matches, specify another filter</div>

  } else if ( countriesFiltered.length > 1 ) {
    return <ShowCountries countriesFiltered={countriesFiltered} setFilter={setFilter} />

  } else if (countriesFiltered.length === 1 ) {
    return <ShowOneCountry country={countriesFiltered[0]} />

  } else {
    return <div></div>
  }
}

const ShowCountries = ({ countriesFiltered, setFilter }) => {
  return (
    <div>
      <table>
        <tbody>
          {countriesFiltered.map(country => {
           return <Country key={country.name} country={country} setFilter={setFilter} />
          })}
        </tbody>
      </table>
    </div>
  )
}

const Country = ({ country, setFilter }) => {
  return (
    <tr>
      <td>{country.name} <button onClick={() => setFilter(country.name) }>show</button></td>
    </tr>
  )
}

const ShowOneCountry = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>
        capital {country.capital}
      </div>
      <div>
        population {country.population}
      </div>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img className="flag" src={country.flag} alt="Country flag"/>
    </div>
  )
}


const Weather = ({ countriesFiltered }) => {
  if (countriesFiltered.length===1) {
    return <ShowWeather country={countriesFiltered[0]} />

  } else {
    return <div></div>
  }
}

const ShowWeather = ({ country }) => {
  const [ weather, setWeather ] = useState({
    current: {
      temperature: "",
      wind_speed: "",
      wind_dir: "",
      weather_icons:""
    }
  })
  useEffect(() => {
    const params = {
      access_key: api_key,
      query: country.capital
    }
    axios.get('http://api.weatherstack.com/current', {params})
      .then(response => {
        setWeather(response.data)
      })
  }, [country.capital])
  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p>Temperature: {weather.current.temperature} Celsius</p>
      <img src={weather.current.weather_icons} alt="Weather icon"/>
      <p>Wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
    </div>
  )
}

function App() {
  const [ countries, setCountries ] = useState([])
  const [ countryFilter, setFilter ] = useState('')
  
  const hook = () => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(hook, [])
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  
  const countriesFiltered = countryFilter !== ''
  ? countries.filter(country => country.name.toLowerCase().includes(countryFilter.toLowerCase()))
  : []

  return (
    <div>
      <div>
        find countries <input value={countryFilter} onChange={handleFilterChange} />
      </div>
      
      <Countries countriesFiltered={countriesFiltered} setFilter={setFilter} />
      <Weather countriesFiltered={countriesFiltered} />

    </div>
  );
}

export default App;
