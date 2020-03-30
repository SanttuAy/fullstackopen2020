import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}


const Statistics = (props) => {
  if (props.aanet.all === 0) {
    return(
    <div>
      <p>
        No feedback given
      </p>
    </div>
    )
  }

  return (
    <div>
      <StatisticLine text="good" value ={props.aanet.good} />
      <StatisticLine text="neutral" value ={props.aanet.neutral} />
      <StatisticLine text="bad" value ={props.aanet.bad} />
      <StatisticLine text="all" value ={props.aanet.all}/>
      <StatisticLine text="average" value = {Average (props)} />
      <StatisticLine text="positive" value ={Positive (props)} />
    </div>
  )
}


const StatisticLine = (props) => {
  const {text, value} = props
  return (
    <table>
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
      </tbody>
    </table>
  )
}


const Average = (props) => {
  return (
    <>
       {((props.aanet.good * 1) + (props.aanet.neutral * 0) + (props.aanet.bad * (-1) ) ) / props.aanet.all} 
    </>
  )
}


const Positive = (props) => {
  return (
    <>
       { props.aanet.good * 100 / props.aanet.all } % 
    </>
  )
}


const App = () => {
  const [aanet, setAanet] = useState({
  good: 0, neutral: 0, bad: 0, all: 0
  })

  const handleVoteGood = () => {
    setAanet({ ...aanet, good: aanet.good + 1, all: aanet.all + 1 })
  } 
  
  const handleVoteNeutral = () =>
    setAanet({ ...aanet, neutral: aanet.neutral + 1, all: aanet.all + 1 })

  const handleVoteBad = () =>
    setAanet({ ...aanet, bad: aanet.bad + 1, all: aanet.all + 1 })

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleVoteGood} text='good'/>
      <Button handleClick={handleVoteNeutral} text='neutral' />
      <Button handleClick={handleVoteBad} text='bad' />
      <h1>statistics</h1>
      <Statistics aanet={aanet} /> 
    </div>
  )
}



ReactDOM.render(<App />, 
  document.getElementById('root')
)