import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Maahaku from './components/Maahaku'
import Maaluettelo from './components/Maaluettelo'


const App = () => {
    const [ maat, setMaat ] = useState([])
    const [ filtteri, setFiltteri ] = useState('') 

    useEffect(() => {
        axios
          .get('https://restcountries.eu/rest/v2/all')
          .then(response => {       //tapahtumankuuntelijan rekisteröinti
            setMaat(response.data)
          })
      }, [])
    


    const handleFilterChange = (event) => {
        setFiltteri(event.target.value)
    }


    return (
        <div>
            <Maahaku filtteri = {filtteri} handleFilterChange = {handleFilterChange} />
            <Maaluettelo maat = {maat} filtteri = {filtteri} />
        </div>
    )

}

export default App

