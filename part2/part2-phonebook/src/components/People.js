import DelButton from "./DeleteButton"
import Person from "./Person"

const People = ({persons, filter, removePerson}) => {
  const filteredPeople = persons.filter(person => person.name.toLocaleLowerCase().includes(filter));

  return (
    filteredPeople.map(person => (
    <Person key={person.id} person={person} removePerson={removePerson}/>
        // <DelButton key={person.id} remove={remove} person={person}/>
    ))
  )
}

export default People

