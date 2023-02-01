const Filter = ({filter, handleFilter}) => {
  return (
    <div>
      filter by name <input type="text" value={filter} onChange={handleFilter} />
    </div>
  )
}

export default Filter