const DeleteButton = ({person, removePerson}) => {
  return (
    <button onClick={() => removePerson(person.id, person.name)}>
          Remove
    </button>

  )
}

export default DeleteButton