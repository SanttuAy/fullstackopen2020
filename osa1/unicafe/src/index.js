import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}


//tehdään taulukko arvoille ja tähän lisäykset g/n/b


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleVoteGood = () => {
    //...
    setGood(good + 1)
  }  
  
  const handleVoteNeutral = () => {
  //...
    setNeutral(neutral +1)
  }  

  const handleVoteBad = () => {
//...
    setBad(bad + 1) 
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button
        handleClick={handleVoteGood}
        text='good'
      />
      <Button
        handleClick={handleVoteNeutral}
        text='neutral'
      />
      <Button
        handleClick={handleVoteBad}
        text='bad'
      />
      <h1>statistics</h1>
  <p>good {good}</p>
  <p>neutral {neutral}</p>
  <p>bad {bad}</p>
    </div>
  )
}



ReactDOM.render(<App />, 
  document.getElementById('root')
)