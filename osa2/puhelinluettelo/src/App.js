import React, { useState, useEffect } from 'react'
import Naytettavat from './components/Naytettavat'
import PersonForm from './components/PersonForm'
import connectionService from './services/connections'


const App = () => {
  const [ persons, setPersons] = useState([  //kovakoodatut testejä varten, huomaa numero nimissä
    { name: 'Arto Hellas1', number: '040-1231244' }, 
    { name: 'Ada Lovelace1', number: '39-44-5323523' },
    { name: 'Dan Abramov1', number: '12-43-234345' },
    { name: 'Mary Poppendieck1', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('') // nimisyötekentän arvo
  const [ isAlready, setIsAlready ] = useState(false) //onko nimi jo luettelossa
  const [ newNumber, setNewNumber ] = useState('') // numerosyötekentän arvo
  const [ showAll, setShowAll ] = useState(true) // näytetäänkö kaikki vai filtterillä
  const [ filtteri, setFiltteri ] = useState('') // filtteri jolla haetaan näytettävät

  useEffect(() => {
    connectionService
      .getAll()
      .then(initialConnections => {
        setPersons(initialConnections)
      })
    }, [])

  const addNewConnection = (event) => {
    event.preventDefault()
    const connectionObject = {
        name: newName,
        number: newNumber
    }
    isAlready
    ? window.alert(`${newName} on jo lisätty luetteloon`)
    : 
    connectionService
      .create(connectionObject)
        .then(returnedConnection => {
        setPersons(persons.concat(returnedConnection))
        setNewName('')
        setNewNumber('')
      })
      if (isAlready) setIsAlready(false)
  }


  const handleFilterChange = (event) => {
    setFiltteri(event.target.value)
    if (filtteri !== '') setShowAll(false)
    else setShowAll(true)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value) //inputin syötekentän arvo
  }

  const tarkistus = () => {
    var nimet = persons.map((henkilo) => henkilo.name.toLocaleLowerCase())
    if (nimet.includes(newName.toLocaleLowerCase())) {
      setIsAlready(true)
    }
  } 

  /*const deletion = (id) => {
    console.log(`yhteys ${id} poistetaan`)
  }*/


  return ( 
    <div>
      <h2>Phonebook</h2>
      <div>
      filter show with <input
        value={filtteri}
        onChange={handleFilterChange} 
        />
      </div>
      <h3>add a new</h3>
      <PersonForm addNewConnection={addNewConnection} newName={newName} handleNameChange={handleNameChange} 
      newNumber={newNumber} handleNumberChange={handleNumberChange} tarkistus={tarkistus} />
      <h3>Numbers</h3>
      <Naytettavat 
        persons={persons} 
        filtteri={filtteri} 
        showAll={showAll} 
        setPersons = {setPersons}
      />
    </div>
  )

  //deletion={() => deletion(connection.id) }
}

export default App
