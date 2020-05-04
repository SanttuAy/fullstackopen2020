import React, { useState, useEffect } from 'react'
import './index.css'
import Naytettavat from './components/Naytettavat'
import PersonForm from './components/PersonForm'
import connectionService from './services/connections'
import Ilmoitus from './components/Ilmoitus'
import Virhe from './components/Virhe'
//POISTA VIRHE-KOMPONENTTI, ELLET PALAUTA 2-20-TEHTÄVÄÄ & SIIVOA POIS CSS-TIEDOSTOSTA


const App = () => {
  const [ persons, setPersons] = useState([  //kovakoodatut testejä varten, huomaa numero nimissä palvelimella oleviin nähden
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
  const [ paivitettava, setPaivitettava] = useState(-1) //päivitettävän id
  const [ viesti, setViesti] = useState(null) //viesti suoritetusta toimenpiteestä 
  const [ varoitus, setVaroitus ] = useState(null) // varoituksen teksti
  
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

    const paivitetaanko = 
    isAlready
    ? window.confirm(`${newName} on jo lisätty luetteloon. Päivitetäänkö tiedot?`)
    : 
    connectionService
      .create(connectionObject)
        .then(returnedConnection => {
        setPersons(persons.concat(returnedConnection))
        setViesti(
          `Henkilö nimeltä ${newName} lisättiin puhelinluetteloon`
        )
        setTimeout(() => {
          setViesti(null)
        }, 5000)  
        setNewName('')
        setNewNumber('')
      })
      if (isAlready) setIsAlready(false)

//      console.log( paivitetaanko === true ) //TESTAUSTA

    if (paivitetaanko === true) { //saa arvon true/false jos confirm-ikkunasta valitaan vastaava vaihtoehto
      connectionService
        .update(paivitettava, connectionObject)
        .then(response => {
          setPersons(persons.map(person => person.id !== paivitettava ? person : response))
          setViesti(
            `Henkilön ${newName} tiedot päivitettiin`
          )
          setTimeout(() => {
            setViesti(null)
          }, 5000)
        })
        .catch(error => { //kun henkilötieto on jo poistettu
          setVaroitus(
            `Henkilön ${newName} tiedot on jo poistettu puhelinluettelosta!`
          )
          setTimeout(() => {
            setVaroitus(null)
          }, 5000)
          setPersons(persons.filter(p => p.name !== newName))
        })
        setNewName('')
        setNewNumber('')
    }   
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
      const etsitty = persons.find( person => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase() ) 
      setPaivitettava(etsitty.id) 
    }
  } 
  

  return ( 
    <div>
      <h2>Phonebook</h2>
      <Ilmoitus viesti={viesti} persons = {persons} varoitus={varoitus} />
      <Virhe varoitus = {varoitus} persons = {persons} />
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
        setPersons={setPersons}
        viesti={viesti}
        setViesti={setViesti}
      />
    </div>
  )

}

export default App
