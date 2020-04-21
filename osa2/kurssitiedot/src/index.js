import React from 'react'
import ReactDOM from 'react-dom'
import Course from './components/Course'


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]  
  
  return (
    <div>
      <h1> Web development curriculum </h1>
      <ul>
        <Courses tiedot= {courses}/>
      </ul>
      
    </div>
  )
}


const Courses = (props) => {
    var kaikki = props.tiedot.map(function (kurssi) {
      return(
        <ul key ={kurssi.id}>
          <h2>{kurssi.name}</h2>
          <Course tiedot = {kurssi}/>
        </ul>
      )
    })
    
  return kaikki
}


ReactDOM.render(<App />, document.getElementById('root'))