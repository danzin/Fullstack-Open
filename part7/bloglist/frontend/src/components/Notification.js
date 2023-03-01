import React from 'react'
import { useNotification } from '../context/NotificationContext'

const Notification = () => {
  const { notification } = useNotification()

  if (!notification) {
    return null
  }

  return <div className={notification.type}>{notification.message}</div>
}

export default Notification
