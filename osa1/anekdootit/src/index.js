import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [kaikkiAanet, setKaikkiAanet] = useState([0, 0, 0, 0, 0, 0])
  const [aanetNyt, setAanetNyt] = useState(0)
  
  function getRandomInt(minimi, maksimi) {
    minimi = Math.ceil(minimi);
    maksimi = Math.floor(maksimi);
    return Math.floor(Math.random() * (maksimi - minimi)) + minimi;
  }

  const handleArvonta = () => {
    const index = getRandomInt(0, props.anecdotes.length)
    setSelected(index)
    setAanetNyt(kaikkiAanet[index])
  }

  const handleAanestys = () => {
    kaikkiAanet[selected] = kaikkiAanet[selected] +1 
    setKaikkiAanet(kaikkiAanet.slice())
    //console.log(kaikkiAanet) //testitulostus
    setAanetNyt(kaikkiAanet[selected])
    }

  return (
    <div>
      <p>{props.anecdotes[selected]}</p>
      <p>has {aanetNyt} votes</p>
      <Button handleClick={handleAanestys} text='vote'/>
      <Button handleClick={handleArvonta} text='next anecdote'/>       
    </div>
  )
}



const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)