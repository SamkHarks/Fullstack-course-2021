import React, { useState } from 'react'

const Button = ({handler, text}) => {
  return (
    <button onClick={handler}>
      {text}
    </button>
  )
}

const ShowAnecdote = ({selected, anecdotes, points}) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]} <br/>
      has {points[selected]} votes <br/>
    </div>
  )
}

const MostPoints = ({points, anecdotes}) => {
  const maxPoints = Math.max(...points);
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>
      {anecdotes[points.indexOf(maxPoints)]} has {maxPoints} votes
      </p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
   
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  const handleNext = () => setSelected(Math.floor(Math.random()*anecdotes.length));

  const handleVote = () => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
  } 


  return (
    <div>
      <ShowAnecdote selected={selected} anecdotes={anecdotes} points={points} />
      <Button handler={handleVote} text="vote" />
      <Button handler={handleNext} text="next anecdote" />
      <MostPoints points={points} anecdotes={anecdotes} />
    </div>
  )
}

export default App