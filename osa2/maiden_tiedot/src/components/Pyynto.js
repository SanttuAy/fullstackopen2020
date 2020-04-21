import React from 'react'


const Pyynto = (props) => {
    if (props.filtteri.length === 0) return ( <div>
     enter something in the search field</div> )
    if (props.tasmaavat.length > 10) return ( <div>Too many matches, specify another filter</div>)
    return (
        <></>
    )
}

export default Pyynto