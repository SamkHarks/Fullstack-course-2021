import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { createComment, removeComments } from '../reducers/commentReducer'
import inlineStyles from '../styles/inlineStyles'

const Blog = ({ blog }) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const history = useHistory()



  const comments = useSelector(state => blog ? state.comments.filter(c => c.blog === blog.id) : [])

  if (!user || !blog) {
    return null
  }

  const handleUpdates = () => {
    dispatch(likeBlog(blog))
  }

  const handleRemove = id => {
    dispatch(removeBlog(id, user.username))
    dispatch(removeComments(id))
    history.push('/blogs')
  }

  const handleComment = (event) => {
    event.preventDefault()
    const obj = {
      comment: event.target.comment.value
    }
    event.target.comment.value = ''
    dispatch(createComment(blog.id, obj))
  }


  const showToCorrectUser = { display: blog.user.username===user.username ? '' : 'none' }
  return (
    <div>
      <h2 style={inlineStyles.h2Style}>{blog.title} {blog.author}</h2>

      {blog.likes} likes <button onClick={() => handleUpdates()}>like</button><br/>
      added by {blog.user.name}<br/>

      <div style={showToCorrectUser}>
        <button onClick={() => handleRemove(blog.id)}>remove</button>
      </div>
      <h2>comments</h2>
      <Form onSubmit={handleComment}>
        <Form.Group>
          <Form.Control name="comment" />
          <Button variant='primary' type="submit">add comment</Button>
        </Form.Group>
      </Form>
      <ul>
        {comments.map(comment =>
          <li key={comment.id}>
            {comment.comment}
          </li>
        )}
      </ul>
    </div>
  )
}

export default Blog

/*
      <form onSubmit={handleComment}>
        <input name="comment" />
        <button type="submit">add comment</button>
      </form>
*/