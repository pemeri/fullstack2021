import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text} </td>
      <td>{value}</td>
      
    </tr>
  )
}

const Statistics = ({good, neutral, bad, num, avg}) => {

  if(num === 0) {
    return (
      <div>No feedback given</div>
    )
  }

  return (
    <div>
        <table>
          <tbody>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="All" value={good+neutral+bad} />
        <StatisticLine text="Average" value={avg} />
        <StatisticLine text="Positive" value={(good / (good+neutral+bad) )*100} />
        </tbody>
        </table>
      </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allRatings, setAll] = useState([])

  const handleGoodClick = () => {
    setAll(allRatings.concat(1))
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setAll(allRatings.concat(0))
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setAll(allRatings.concat(-1))
    setBad(bad + 1)
  }

  const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length

  return (
    <div>
      <h2>Give feedback</h2>
      <Button text="Good" handleClick={handleGoodClick}/>
      <Button text="Neutral" handleClick={handleNeutralClick} />
      <Button text="Bad" handleClick={handleBadClick} />

      <h3>Statistics</h3>
      <Statistics good={good} neutral={neutral} bad={bad} num={allRatings.length} avg={arrAvg(allRatings)} />

    </div>
  )
}

export default App