import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div> 
      <Header course={course} />
      <Content nimi1={part1} harjoitukset1={exercises1} nimi2={part2} harjoitukset2={exercises2} nimi3={part3} harjoitukset3={exercises3} />
      <Total summa={exercises1 + exercises2 + exercises3} />
    </div>
  )
}


const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}


const Content = (props) => {
  return (
    <div>
    <Part nimi = {props.nimi1} harjoitukset = {props.harjoitukset1} />
    <Part nimi = {props.nimi2} harjoitukset = {props.harjoitukset2} />
    <Part nimi = {props.nimi3} harjoitukset = {props.harjoitukset3} />
    </div>
  )
}


const Part = (props) => {
  return (
      <div>
      <p>
        {props.nimi} {props.harjoitukset}
      </p>
    </div>
  )
}


const Total = (props) => {
  return (
    <div>
      <p>
      Number of exercises {props.summa}
      </p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))