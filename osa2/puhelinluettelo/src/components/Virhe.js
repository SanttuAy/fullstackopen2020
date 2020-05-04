import React from 'react'

const Virhe = ({ varoitus }) => {
    if (varoitus === null) {
      return null
    }
  
    const varoitusStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 40,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    return (
      <div style={varoitusStyle}>
        {varoitus}
      </div>
    )
  }

  export default Virhe



