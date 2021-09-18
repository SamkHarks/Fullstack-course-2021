import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import inlineStyles from '../styles/inlineStyles'

const Users = () => {

  const users = useSelector(state => state.users)

  return (
    <div>
      <h2 style={inlineStyles.h2Style}>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th></th><th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )

}

export default Users