import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
//import { useDispatch } from 'react-redux'
//import { setMessage } from '../reducers/notificationReducer'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  //const dispatch = useDispatch()

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
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control id='title' value={title} onChange={({ target }) => setTitle(target.value)} />
          <Form.Label>author:</Form.Label>
          <Form.Control id='author' value={author} onChange={({ target }) => setAuthor(target.value)} />
          <Form.Label>url:</Form.Label>
          <Form.Control id='url' value={url} onChange={({ target }) => setUrl(target.value)} />
          <Button variant='primary' id='submit-blog' type="submit">create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm