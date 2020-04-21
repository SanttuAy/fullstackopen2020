import React from 'react'

const Maahaku = (props) => {
    return (
        <div>
            find countries <input 
            value= {props.filtteri}
            onChange={props.handleFilterChange}
            />
        </div>
    )

}

export default Maahaku