import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}


const Average = (props) => {
  return (
    <div>
       <p>average {((props.aanet.good * 1) + (props.aanet.neutral * 0) + (props.aanet.bad * (-1) ) ) / props.aanet.all} </p> 
    </div>
  )
}


const Positive = (props) => {
  return (
    <div>
       <p>positive { props.aanet.good * 100 / props.aanet.all } % </p> 
    </div>
  )
}


const App = () => {
  const [aanet, setAanet] = useState({
  good: 0, neutral: 0, bad: 0, all: 0  //, average: null, postive: null
  })

  const handleVoteGood = () => {
    setAanet({ ...aanet, good: aanet.good + 1, all: aanet.all + 1 }) //,
  } 
  
  const handleVoteNeutral = () =>
    setAanet({ ...aanet, neutral: aanet.neutral + 1, all: aanet.all + 1 }) //,

  const handleVoteBad = () =>
    setAanet({ ...aanet, bad: aanet.bad + 1, all: aanet.all + 1 }) //, 

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleVoteGood} text='good'/>
      <Button handleClick={handleVoteNeutral} text='neutral' />
      <Button handleClick={handleVoteBad} text='bad' />
      <h1>statistics</h1>
      <p>good {aanet.good}</p>
      <p>neutral {aanet.neutral}</p>
      <p>bad {aanet.bad}</p>
      <p>all {aanet.all}</p>
      <Average aanet={aanet} />
      <Positive aanet={aanet} /> 
    </div>
  )
}



ReactDOM.render(<App />, 
  document.getElementById('root')
)