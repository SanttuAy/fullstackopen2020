import React from 'react'
import connectionService from '../services/connections'

const Naytettavat = (props) => {
    var tasmaavat = props.persons.filter(function(person) {    
      return person.name.toLocaleLowerCase().includes(props.filtteri.toLocaleLowerCase())
    })
    const connectionsToShow = props.showAll
      ? props.persons
      : tasmaavat

    const deletionOf = (id, name) => {
      const kysymys = `Poistetaanko ${name} ?`
      const varmistus = window.confirm(kysymys)
      varmistus
      ?
      connectionService
      .poisto(id)
      .then(returnedConnections => { 
      console.log(returnedConnections)
      props.setPersons(props.persons.filter(alkio => alkio.id !==id))
      props.setViesti(
        `${name} poistettiin luettelosta`
      )
      setTimeout(() => {
        props.setViesti(null)
      }, 5000) 
    })
      .catch(error => {
        console.log('Poisto ei onnistu!')
      })
      : console.log('poistoa ei tehty')
    }

    return (
      <ul>
        {connectionsToShow.map((connection, i) =>
        <li key = {i}> {connection.name} {connection.number}
        <button onClick={() => deletionOf(connection.id, connection.name)}>delete</button>
        </li>
        )}
      </ul>
    )
  }

  export default Naytettavat

