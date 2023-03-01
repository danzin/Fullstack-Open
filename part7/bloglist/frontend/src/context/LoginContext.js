import React, { createContext, useContext, useReducer } from 'react'
import { login } from '../services/login'
import blogService from '../services/blogs'

let user = window.localStorage.getItem('loggedNoteappUser')
  ? JSON.parse(window.localStorage.getItem('loggedNoteappUser'))
  : ''

const initialState = {
  name: '' || user.name,
  username: '' || user.username,
  token: '' || user.token,
}

const loginReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        username: action.payload.username,
        token: action.payload.token,
        name: action.payload.name,
      }
    case 'LOGOUT':
      return {
        ...initialState,
        user: '',
        token: '',
        name: '',
      }
    // case 'LOGOUT':
    //   return {
    //     ...initialState,
    //     user: '',
    //     token: '',
    //   }
    // case 'LOGIN_ERR':
    //   return {
    //     ...initialState,
    //     error: action.error,
    //   }
    default:
      throw new Error('error: ', action.type)
  }
}

export const LoginContextProvider = (props) => {
  const [user, dispatch] = useReducer(loginReducer, initialState)

  const loginUsr = async (userObj) => {
    const username = userObj.username
    const user = await login({
      username: userObj.username,
      password: userObj.password,
    })
    window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch({
      type: 'SET_USER',
      payload: { username: user.username, name: user.name, token: user.token },
    })
  }
  const logout = () => {
    dispatch({
      type: 'LOGOUT',
    })
    window.localStorage.clear()
  }

  return (
    <LoginContext.Provider value={{ user, loginUsr, logout }}>
      {props.children}
    </LoginContext.Provider>
  )
}

// /** Creating a LoginContext that will be shared between
//  * App.js and LoginForm.js components
//  * For now it only keeps the value of user and shares between the two components
//  */

const LoginContext = createContext()

export const useLogin = () => {
  return useContext(LoginContext)
}
