import React from 'react'
import PropTypes from 'prop-types'

const Login = ({ username, password, handleUsernameChange, handlePasswordChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
      username
        <input type="text"
          id="username"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <input type="password"
          id="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">log in</button>
    </form>
  )
}

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default Login