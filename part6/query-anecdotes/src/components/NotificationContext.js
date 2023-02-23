import React, { createContext, useContext, useReducer } from 'react'

const initialState = {
  message: null,
  type: null,
}
const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        message: action.payload.message,
        type: action.payload.type,
      }
    case 'CLEAR_NOTIFICATION':
      return initialState
    default:
      return state
  }

}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, initialState)

  return (
    <NotificationContext.Provider value={{ notification, notificationDispatch }}>
      {props.children}
    </NotificationContext.Provider>
  )

}

const NotificationContext = createContext()
export const useNotification = () => {
  return useContext(NotificationContext);
};

export default NotificationContext
