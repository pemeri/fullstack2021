import React, { useState } from 'react'



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [allVotes, setAll] = useState( Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0) )

  
  const handleClick = () => {
    let randomNumber = Math.floor(Math.random() * 6)
    setSelected(randomNumber)
    //console.log('Selected: ', randomNumber)
  }

  const handleVoteClick = () => {
    //console.log('Selected for voting: ', selected)
    const votesArr = [...allVotes]
    votesArr[selected] += 1
    //console.log('votesArr after voting: ', votesArr)

    //console.log('allVotes before changing state: ', allVotes)
    setAll(allVotes => votesArr)
    //console.log('You voted for: ', selected)
    //console.log('All votes after voting: ', allVotes)
  }

    let maxVal = allVotes.reduce(function(a, b) {
      return Math.max(a, b);
    })
    let maxIndex = allVotes.indexOf(maxVal)
    //console.log('Max votes: ', maxIndex)

  return (
    <div>
      <h3>Anecdote of the day</h3>
      {anecdotes[selected]} <br />
      <button onClick={handleVoteClick}>Vote</button>
      <button onClick={handleClick}>Next anecdote</button> <br />
      <h3>Anecdote with most votes</h3>
      {anecdotes[maxIndex]}
    </div>
  )
}

export default App