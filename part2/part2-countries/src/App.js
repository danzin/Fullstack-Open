import Countries from './components/Countries';
import restCalls from './services/restCalls';
import { useState, useEffect } from 'react'
function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [showComponent, setShowComponent] = useState({})
  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(search));


  useEffect(() => {
    restCalls.getAll()
      .then(data => 
        setCountries(
          data.map(
            ({name,
              capital,
              area,
              languages,
              flags 
            }) =>
              ({name: name.common, capital, area, languages, flags})
          )
        ))

  }, []);

  const handleClick = name => {
    setShowComponent(
      filteredCountries.filter(country => country.name.includes(name))[0]
      )
  }

  const handleFilter = e => {
    setSearch(e.target.value)
    setShowComponent({})
  }



  return (
    <div>
      <div>search for a country: <input value={search} onChange={handleFilter}/> </div>
      {filteredCountries.length > 10 && <div>Too many results. Be more specific</div>}
      {filteredCountries.length < 10 && filteredCountries.length >1 && 
        filteredCountries.map(country => (
          <div key={country.name}>
            {country.name}{' '} <button onClick={() => handleClick(country.name)}>Details</button>
          </div>
        ))
      }
      {filteredCountries.length === 1 && (
      <Countries country={filteredCountries[0]}/>
        )
      }
      {showComponent.name && <Countries country={showComponent}/>}

    </div>
    
  );
}

export default App;

