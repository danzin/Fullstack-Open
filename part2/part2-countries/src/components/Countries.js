import { useState } from 'react'
import axios from 'axios'

const Countries = ({country}) => {
  const [temp, setTemp] = useState('')
  const [wind, setWind] = useState(0)
  const [icon, setIcon] = useState('')
  //console.log(country.capital[0])
  axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    ).then(response => {
      const weatherobj = {temp: response.data.main.temp, wind: response.data.wind.speed}
      console.log(weatherobj)
      setTemp(() => response.data.main.temp)
      setWind(
        () => response.data.wind.speed
      )
      setIcon(response.data.weather[0].icon)

      console.log(response.data.weather[0].icon)
    })
  
  return (
    <>
    <h1> {country.name}</h1>
      <div>Capital:{country.capital}</div>
      <div>Area: {country.area}</div>
    <h2>Languages: </h2> 
    <ul>
      {Object.values(country.languages).map(language =>
        <li key={language}>{language}</li>)
      }
    </ul>
    <div>
     <img src={country.flags.png} alt={`${country.name} flag`}></img>
    </div>
      <h3>Weather in {country.capital}</h3>
      <div>temperature: {temp}C</div>
      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt =""></img>
      <div>wind: {wind}m/s</div>
    </>
  )
}

export default Countries
