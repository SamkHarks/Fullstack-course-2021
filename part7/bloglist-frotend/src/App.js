import React, { useEffect, useRef } from 'react'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from './reducers/notificationReducer'
import { initBlogs, createNewBlog } from './reducers/blogReducer' //likeBlog, removeBlog
import { setUser } from './reducers/userReducer'

import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import { initUsers } from './reducers/usersReducer'
import Blogs from './components/Blogs'

import inlineStyles from './styles/inlineStyles'
import { initComments } from './reducers/commentReducer'
import { Nav, Navbar } from 'react-bootstrap'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUsers())
    dispatch(initComments())
  }, [dispatch])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedBlogappUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {

      dispatch(setMessage('Wrong username or password', 5000))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
    blogService.setToken(null)
  }

  const addBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createNewBlog(newBlog, user))
  }

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef} >
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const match = useRouteMatch('/blogs/:id')
  const blog = match ? blogs.find(b => b.id === match.params.id) : null
  const matchUser = useRouteMatch('/users/:id')
  const userToShow = matchUser ?
    users.find(u => u.id === matchUser.params.id) : null
  return (
    <div className="container">
      { user === null
        ? <div>
          <h2>login to application</h2>
          <Notification />
          <Login
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
        </div>
        : <div>

          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#" as="span">
                  <Link style={inlineStyles.padding} to="/">blogs</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link style={inlineStyles.padding} to="/users">users</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  {user
                    ? <div>
                      <em style={inlineStyles.padding}>{user.name} logged in</em>
                      <button onClick={handleLogout}>logout</button>
                    </div>
                    : <div/>
                  }
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Switch>
            <Route path='/blogs/:id'>
              <Blog blog={blog} />
            </Route>
            <Route path='/users/:id'>
              <User user={userToShow} />
            </Route>
            <Route path='/users'>
              <Users />
            </Route>
            <Route path='/'>
              <h2 style={inlineStyles.h2Style}>Blogs</h2>
              <Notification />
              {blogForm()}
              <Blogs />
            </Route>
          </Switch>

        </div>
      }
    </div>
  )
}

export default App