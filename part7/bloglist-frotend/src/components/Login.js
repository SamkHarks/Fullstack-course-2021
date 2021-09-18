import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'
/*
import { useState, useEffect } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setMessage } from '../reducers/notificationReducer'
*/

const Login = ({ username, password, handleUsernameChange, handlePasswordChange, handleLogin }) => {
  //const [username, setUsername] = useState('')
  //const [password, setPassword] = useState('')

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>username</Form.Label>
        <Form.Control type="text"
          id="username"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />

        <Form.Label>password</Form.Label>
        <Form.Control type="password"
          id="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
        <Button variant='primary' type="submit">log in</Button>
      </Form.Group>
    </Form>
  )
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}


export default Login