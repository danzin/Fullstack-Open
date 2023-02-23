/* eslint-disable no-unused-vars */
import { useState } from 'react'
const Blog = ({ blog, removeBlog, likeBlog }) => {

  const [showDetails, setShowDetails] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem('loggedNoteappUser')))

  return (
    <div className='blog'>
      <div>
        <div className='blogTitle'>{blog.title}</div>
        <div><button className='details' onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'hide' : 'show'}
        </button></div>

        {showDetails && (
          <div className='blogDetails'>
            <div className='blog-author'>Author: { blog.author }</div>
            <div className='blog-url'>url: { blog.url }</div>
            <div className='blog-likes'>likes: <div className='likesCount'>{ blog.likes }</div><button onClick={() => likeBlog(blog.id)}>like</button></div>
            <div className='blog-user'>Added by: { blog.username || blog.user.username }</div>
            <div>
              {loggedInUser.username === ( blog.username || blog.user.username) && (
                <button className='rem-btn' onClick={() => removeBlog(blog.id)}>remove</button>
              )}
            </div>
          </div>
        )}
      </div>

    </div>

  )
}
export default Blog