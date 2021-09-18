import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)

  blogs.sort((a,b) => b.likes-a.likes)
  return (
    <Table striped>
      <tbody>
        {blogs.map(blog =>
          <tr key={blog.id}>
            <td>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

export default Blogs

/*
  const liStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
    <div>
      {blogs.map(blog =>
        <div style={liStyle} key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      )}
    </div>
*/