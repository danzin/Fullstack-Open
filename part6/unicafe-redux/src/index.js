import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD',
    })
  }

  const neutral = () => {
    store.dispatch({
      type: 'NEUTRAL',
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD',
    })
  }

  const zero = () => {
    store.dispatch({
      type: 'ZERO',
    })
  }

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={neutral}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset</button>
      
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().neutral}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)