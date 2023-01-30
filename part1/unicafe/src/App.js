import { useState } from 'react'

const Header = () => <div><h1>Give feedback here</h1></div>

const Button = ({click,text }) =>  
  <button onClick={click}>{text}</button>

const StatisticLine = ({text, value}) => 
  <tr><th>{text}</th><th>{value}</th></tr>


const Stats = ({good, bad, neutral}) => {
  const all = good+neutral+bad
  const average = (good - bad)/all
  const positive = (good/all)*100
  return all !== 0 ? (
    <div> 
    <h2>Statistics</h2>
    <table>
      <tbody>
      <StatisticLine text="good" value = {good} />
      <StatisticLine text="neutral" value = {neutral} />
      <StatisticLine text="bad" value = {bad} />
      <StatisticLine text="all" value = {all} />
      <StatisticLine text="average" value={average}/>
      <StatisticLine text="positive %" value = {positive} />
      </tbody>
    </table>
    </div>
  ) : (<h4>No reviews yet.</h4> )  
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const feedback = (state, setState) => () => setState(prev => prev +1)

  return (
    <div>
      <Header />
      <Button click={feedback(good, setGood)} text={'good'}/>
      <Button click={feedback(neutral, setNeutral)} text={'neutral'}/> 
      <Button click={feedback(bad, setBad)} text={'bad'}/> 
      <Stats good={good} neutral={neutral} bad={bad}/>
      
    </div>
  )
}

export default App
