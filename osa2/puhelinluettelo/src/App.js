import React, { useState, useEffect } from 'react'
import Filtterointi from './components/Filtterointi'
import PersonForm from './components/PersonForm'
import axios from 'axios'



const App = () => {
  const [ persons, setPersons] = useState([ 
    { name: 'Arto Hellas1', number: '040-1231244' }, 
    { name: 'Ada Lovelace1', number: '39-44-5323523' },
    { name: 'Dan Abramov1', number: '12-43-234345' },
    { name: 'Mary Poppendieck1', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('') // nimisyötekentän arvo
  const [ isAlready, setIsAlready ] = useState(false)
  const [ newNumber, setNewNumber ] = useState('') // numerosyötekentän arvo
  const [ showAll, setShowAll ] = useState(true) // näytetäänkö kaikki vai filtterillä
  const [ filtteri, setFiltteri ] = useState('') // filtteri jolla haetaan näytettävät

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')


  const handleFilterChange = (event) => {
    //console.log('filtteri:', event.target.value) //mallin mukainen seuranta...
    setFiltteri(event.target.value)
    if (filtteri !== '') setShowAll(false)
    else setShowAll(true)
  }

  const handleNumberChange = (event) => {
    //console.log('numero:', event.target.value) //mallin mukaan seurataan tätäkin konsolissa
    setNewNumber(event.target.value)
  }

  const addNewConnection = (event) => {
    event.preventDefault()
    const connectionObject = {
        name: newName,
        number: newNumber
    }
    const lisataanko = isAlready
    ? window.alert(`${newName} on jo lisätty luetteloon`)
    : setPersons(persons.concat(connectionObject))
    setNewName('')
    setNewNumber('')
    if (isAlready) setIsAlready(false)
  }

  const handleNameChange = (event) => {
    //console.log('nimi:', event.target.value) // mallin mukaisesti seurataan konsolissa
    setNewName(event.target.value) //inputin syötekentän arvo
  }

  const tarkistus = () => {
    var nimet = persons.map((henkilo) => henkilo.name.toLocaleLowerCase())
    if (nimet.includes(newName.toLocaleLowerCase())) {
      setIsAlready(true)
    }
  } 


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
      <Filtterointi persons={persons} filtteri={filtteri} showAll={showAll}  />
    </div>
  )

}

export default App