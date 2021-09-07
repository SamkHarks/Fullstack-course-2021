import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedBlogappUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
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
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const addBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(newBlog)
      .then(returnedBlog => {
        returnedBlog.user = { id: returnedBlog.user.id, username: user.username, name: user.name }
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`added blog ${returnedBlog.title} by ${returnedBlog.author}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setMessage('Failed to save blog', error.message)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const updateLikes = id => {
    const blog = blogs.find(b => b.id===id)
    const changedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        returnedBlog.user = blog.user
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(error => {
        setMessage('Failed to update blog', error.message)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }


  const removeBlog = id => {
    blogService
      .removeById(id)
      .then(() => {
        setBlogs(blogs.filter(b => b.id !== id))
      })
      .catch(error => {
        setMessage('Failed to remove blog', error.message)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const showBlogs = () => {
    blogs.sort((a,b) => b.likes-a.likes)
    return (
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id}
            blog={blog}
            updateLikes={() => updateLikes(blog.id)}
            removeBlog={() => removeBlog(blog.id)}
            user={user}
          />
        )}
      </div>
    )
  }

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef} >
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>

      { user === null
        ? <div>
          <h2>login to application</h2>
          <Notification message={message} />
          <Login
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </div>
        : <div>
          <h2>blogs</h2>
          <Notification message={message} />
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          {blogForm()}
          {showBlogs()}
        </div>
      }

    </div>
  )
}

export default App