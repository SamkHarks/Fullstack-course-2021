import React, { useState } from 'react'
const Blog = ({ blog, updateLikes, removeBlog, user }) => {
  const [blogVisibilty, setBlogVisibility] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: blogVisibilty ? 'none' : '' }
  const showWhenVisible = { display: blogVisibilty ? '' : 'none' }

  const toggleVisibility = () => setBlogVisibility(!blogVisibilty)

  //console.log('is same:', blog.user.username===user.username, ' buser: ', blog.user.username, ' user: ', user.username)
  const showToCorrectUser = { display: blog.user.username===user.username ? '' : 'none' }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
    }
  }

  return(
    <div style={blogStyle}>
      <div style={hideWhenVisible} className='defaultBlog'>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className='allBlog'>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button><br/>
        {blog.url}<br/>
        likes {blog.likes} <button onClick={updateLikes}>like</button><br/>
        {blog.user.name}
        <div style={showToCorrectUser}>
          <button onClick={deleteBlog}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog