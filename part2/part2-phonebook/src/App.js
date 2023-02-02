import { useState, useEffect } from 'react'
import People from './components/People'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState({type: '', message:''})

  useEffect(() =>{
    console.log('effect fired')
    personService.getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
      console.log(initialPersons)
    })
  } ,[])

  const updatePerson = (id, personObj) => {
    personService.update(id, personObj)
      .then(response => {
        setPersons(
          persons.map(person => person.id === id ? response : person ))
          setNewName('')
          setNewNumber('')
      })
      .catch(err => {
        console.log(err)
        showNotification('error', `${err} has already been removed from server`)
        personService.getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
        setNewName('')
        setNewNumber('')
      }
        
        
      )
      showNotification('success', `${personObj.name} updated successfully`)
  }

  const createPerson = (personObj) => {
    personService
    .create(personObj)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(err => showNotification('error', `error adding ${personObj.name} `)
      )
      showNotification('success', `${personObj.name} created successfully`)

  }

  const removePerson = (id, name) => {
    if(window.confirm("Confirm delete?")){ personService.remove(id)
      .then(res => {
        setPersons(persons.filter(person => person.id !== id))
        console.log(res)
        showNotification('success', `${name} removed successfully`)
      }).catch(error => {
        console.log(error)
      });

    }
    
  };


  const showNotification = (type, msg) => {

  setNotification({type: type, message: msg})
    setTimeout(() => {
      setNotification({ message: '', type: '' })
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault();
    const personObj = {
      name: newName,
      number: newNumber,
    }

    const confirm = () => window.confirm(`${newName} already exists. Would you like to change the number?`)
    const checkName = (person) => person.name === personObj.name;
    const person = persons.find(person => person.name === personObj.name)
    if(persons.some(checkName)){
      if(confirm()){
        updatePerson(person.id, personObj)
      }
    } else {
      createPerson(personObj)
    }
  }



  const handleNewPerson = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }
  
  return (
  <div>
    <h1>Phonebook</h1>
      <Filter filter={filter} handleFilter={handleFilter} />
      <Notification notification={notification}/>

    <h2>Add new</h2>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName}   
        newNumber={newNumber} 
        handleNewNumber={handleNewNumber}  
        handleNewPerson={handleNewPerson}/> 
    <h2>Numbers</h2>
    <People  persons={persons} filter={filter} removePerson={removePerson}/>
  </div>
  )
}

export default App