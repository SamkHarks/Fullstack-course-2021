import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notification)

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