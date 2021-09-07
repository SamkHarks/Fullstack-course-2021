import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  if (message.includes('Wrong') || message.includes('Failed')) {
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  return (
    <div className="message">
      {message}
    </div>
  )

}

export default Notification