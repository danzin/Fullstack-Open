import React, { createContext, useContext, useReducer } from 'react'

const initialState = {
  type: null,
  message: null,
}

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        type: action.payload.type,
        message: action.payload.message,
      }
    case 'CLEAR_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initialState,
  )
  const showNotification = (type, msg) => {
    notificationDispatch({
      type: 'SET_NOTIFICATION',
      payload: { type: type, message: msg },
    })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }
  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

const NotificationContext = createContext()
export const useNotification = () => {
  return useContext(NotificationContext)
}

export default NotificationContext
