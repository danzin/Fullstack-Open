import { useQuery } from 'react-query'
import blogs, { getAll } from '../services/blogs'
import { Link, useParams } from 'react-router-dom'
import { getUsers } from '../services/users'
import { ListGroup } from 'react-bootstrap'
const User = ({ users, data }) => {
  console.log('USERS coming into User.js: ', users)
  const id = useParams().id
  console.log('-ID INTO User.js-----', id)

  const cUser = users.find((n) => n.id === id)
  console.log('--use matching the params id----', cUser)

  const blogsUser = data.filter((n) => n.user.id === id)
  console.log('----BLOGS FOR USER---', blogsUser)

  // const blogs = Object.values(data)
  // console.log(blogs)

  return (
    <>
      <div>
        <h2>{cUser.name}</h2>
      </div>
      <div>
        <h3>added blogs</h3>
        {blogsUser.length > 0 ? (
          blogsUser.map((blog) => (
            <ListGroup variant="flush" className="border-bottom" key={blog.id}>
              <Link className="link-info link " to={`/blogs/${blog.id}`}>
                {blog.title}
              </Link>
            </ListGroup>
          ))
        ) : (
          <div>use has not added any blogs</div>
        )}
      </div>
    </>
  )
}
export default User
