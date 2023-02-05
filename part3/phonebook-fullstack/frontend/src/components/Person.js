import DeleteButton from "./DeleteButton"

const Person = ({person, removePerson}) => {
  return(
    <>
      <div> {person.name} {person.number}
      <DeleteButton person={person} removePerson={removePerson}/>
      </div>
    </>
  )
}
export default Person