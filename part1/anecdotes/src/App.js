import { useState } from 'react'

const Anecdote = ({anecdotes, selected}) => <>
  {anecdotes[selected]}
  </>

const Button = ({click, text}) =>
 <div><button onClick={click}>{text}</button></div>
const Stat = ({selected, votes}) => <div>Has {votes[selected]} votes</div>
const Footer = ({highVote, max, votes}) => {
  return (
  <div>
  <h2>Anecdote with most votes</h2>
  <p>{highVote}</p>
  <Stat votes={votes} selected={max}/>
  </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [votes, setVote ] = useState(new Array(anecdotes.length).fill(0))
  const max = votes.findIndex(num => num === Math.max(...votes));

  const randomAnecdote = () => setSelected(random => Math.floor(Math.random() * anecdotes.length))
  const castVote = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVote(votesCopy)
  }

  console.log((votes))

  console.log(max)
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={anecdotes} selected={selected} />
      <Stat votes={votes} selected={selected}/>
      <Button text={'next anecdote'} click = {randomAnecdote} />
      <Button text={'vote'} click = {castVote}  />
      <Footer highVote={anecdotes[max]} votes={votes} max={max}/>
    </div>
  )
}

export default App