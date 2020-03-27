import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div> 
      <Header tiedot={course} />
      <Content tiedot={course} /> 
      <Total tiedot= {course} />
    </div>
  )
}


const Header = (props) => {
  return (
    <div>
      <h1>{props.tiedot.name}</h1>
    </div>
  )
}


const Content = (props) => {
    return (
    <div>
    <Part nimi = {props.tiedot.parts[0].name} harjoitukset = {props.tiedot.parts[0].exercises} />
    <Part nimi = {props.tiedot.parts[1].name} harjoitukset = {props.tiedot.parts[1].exercises} />
    <Part nimi = {props.tiedot.parts[2].name} harjoitukset = {props.tiedot.parts[2].exercises} />
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
      Number of exercises {props.tiedot.parts[0].exercises + props.tiedot.parts[1].exercises + props.tiedot.parts[2].exercises}
      </p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))