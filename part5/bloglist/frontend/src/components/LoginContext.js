import React from 'react'
/** Creating a LoginContext that will be shared between
 * App.js and LoginForm.js components
 * For now it only keeps the value of user and shares between the two components
 */
export const LoginContext = React.createContext()