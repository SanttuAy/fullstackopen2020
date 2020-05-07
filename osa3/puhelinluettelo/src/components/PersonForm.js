import React from 'react'
import Tallennus from './Tallennus'


const PersonForm = (props) => {
    const addNewConnection = props.addNewConnection
    const newName = props.newName
    const handleNameChange = props.handleNameChange
    const newNumber = props.newNumber
    const handleNumberChange = props.handleNumberChange
    const tarkistus = props.tarkistus

    return (
    <form onSubmit={addNewConnection}>
      <div>
          name: <input
            value={newName}
            onChange={handleNameChange} 
        />
      </div>
      <div>
          number: <input
            value={newNumber}
            onChange={handleNumberChange}
        />
      </div>
      <Tallennus tarkistus={tarkistus}  />
      </form>
    )
}

export default PersonForm