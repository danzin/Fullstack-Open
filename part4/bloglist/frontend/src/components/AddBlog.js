const AddBlog = ({addBlog, newBlog, handleAuthorChange, handleTitleChange, handleUrlChange}) => {

  return (
    <div>
        <h3>Create new</h3>
        <form onSubmit={addBlog}>
          author: <input value={newBlog.author} onChange={handleAuthorChange} />
          title: <input value={newBlog.title} onChange={handleTitleChange} />
          url: <input value={newBlog.url} onChange={handleUrlChange} />

          
          <button type="submit">save</button>
        </form>
      
      </div>
  )


}

export default AddBlog