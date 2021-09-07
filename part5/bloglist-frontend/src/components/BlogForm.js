import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }
    createBlog(newBlog)
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input id='title' value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author:
          <input id='author' value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url:
          <input id='url' value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button id='submit-blog' type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm