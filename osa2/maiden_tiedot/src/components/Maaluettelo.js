import React from 'react'
import Pyynto from './Pyynto'



const Maaluettelo = (props) => {

    
    var tasmaavat = props.maat.filter(function(maa) {    
            return maa.name.toLocaleLowerCase().includes(props.filtteri.toLocaleLowerCase())
        
    })
    const countriesToShow = tasmaavat.length > 10
        ? []
        : tasmaavat
 
    return ( 
        <div>
            <ul>
                {countriesToShow.map(function(country, i) { 
                    return <li key={i} >{country.name}</li>
                })}
            </ul>
            <Pyynto filtteri = {props.filtteri} tasmaavat = {tasmaavat} />
        </div>
    )
}

export default Maaluettelo

