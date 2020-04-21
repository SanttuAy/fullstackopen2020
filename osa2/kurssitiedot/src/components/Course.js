import React from 'react'

const Course = (props) => { //propsina yhden kurssin parts-taulukko
    return(
      <div>
        <Content tiedot={props.tiedot.parts} /> 
        <Total tiedot= {props.tiedot.parts} />
      </div>
    )
  }
  
  
  const Content = (props) => {
    return (
      <div>
        <ul>
          <Part kurssinosat = {props.tiedot} />
        </ul>
      </div>
    )
  }
  
  
  const Part = (props) => {
    const nimetJaMaarat = props.kurssinosat.map(osa => <li key ={osa.id}>{osa.name} {osa.exercises} </li>)
    return (
      nimetJaMaarat
    )
  }
  
  
  const Total = (props) => {
    var summa = props.tiedot.reduce(function(sum, osa){
      return sum + osa.exercises
    }, 0)
    return (
      <div>
        <p style={{fontWeight: "bold"}}>
        Total of {summa} exercises
        </p>
      </div>
    )
  }

export default Course