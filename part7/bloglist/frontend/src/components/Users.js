import { useLogin } from '../context/LoginContext'
import { Link } from 'react-router-dom'

// import User from './User'
import { Table } from 'react-bootstrap'
const UserProfile = ({ users }) => {
  const { user } = useLogin()

  return (
    <div className="justify-content-md table">
      <div>
        <h3>Users</h3>
      </div>
      <Table className="mytable">
        <thead>
          <tr>
            <th>username</th>
            <th>blogs added</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link className="link-info link" to={`/users/${user.id}`}>
                  {user.username}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
          <tr>
            {/* <td>{user.username}</td>
            <td>{user.blogs.length}</td> */}
          </tr>
        </tbody>
      </Table>
      {/* {usersDisplay()} */}
    </div>
  )
}

export default UserProfile
