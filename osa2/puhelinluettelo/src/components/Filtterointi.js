import React from 'react'


const Filtterointi = (props) => {
    var tasmaavat = props.persons.filter(function(person) {    
      return person.name.toLocaleLowerCase().includes(props.filtteri.toLocaleLowerCase())
    })
    const connectionsToShow = props.showAll
      ? props.persons
      : tasmaavat
    return (
      <ul>
        {connectionsToShow.map((connection, i) =>
        <li key = {connection.name}> {connection.name} {connection.number} </li>
        )}
      </ul>
    )
  }

  export default Filtterointi
  