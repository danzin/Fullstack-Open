import React from 'react'
import { useNotification } from './NotificationContext';

const Notification = () => {

  const {notification} = useNotification()

  const style = {
    borderStyle: 'solid',
    borderWidth: '2px',
    borderColor: notification.type === 'success' ? 'green' : 'red',
    padding: 10,
    marginBottom: 5,
    display: notification.message ? 'block' : 'none',

  }
  
  return (
    <div style={style}>
      <div>{notification.message}</div>
    </div>
  )
}

export default Notification
