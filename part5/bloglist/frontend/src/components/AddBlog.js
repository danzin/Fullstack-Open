import { useState } from 'react'


const AddBlog = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ author: '', title: '', url: '' })

  const addBlog = (event) => {

    event.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    })
    setNewBlog({ author: '', title: '', url: '' })
  }

  const handleAuthorChange = e => {
    setNewBlog({ ...newBlog, author: e.target.value })
  }

  const handleTitleChange = e => {
    setNewBlog({ ...newBlog, title: e.target.value })
  }

  const handleUrlChange = e => {
    setNewBlog({ ...newBlog, url: e.target.value })
  }
  console.log(newBlog)
  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={addBlog}>
        <div >author: <input id='author' value={newBlog.author} onChange={handleAuthorChange} /></div>
        <div >title: <input id='title' value={newBlog.title} onChange={handleTitleChange} /></div>
        <div >url: <input  id='url' value={newBlog.url} onChange={handleUrlChange} /></div>

        <button type="submit" className='save-btn'>save</button>
      </form>
    </div>
  )


}

export default AddBlog