import React from 'react'
import { Table } from 'react-bootstrap'
import inlineStyles from '../styles/inlineStyles'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <div>
      <h2 style={inlineStyles.h2Style}>{user.name} added blogs</h2>
      <Table striped>
        <thead>
          <tr>
            <th>blog title</th>
          </tr>
        </thead>
        <tbody>
          {user.blogs.map(blog =>
            <tr key={blog.id}>
              <td><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default User

/*
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>
            {blog.title}
          </li>
        )}
      </ul>
*/