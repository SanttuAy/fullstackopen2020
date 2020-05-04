import React from 'react'

const Ilmoitus = ({ viesti }) => {
    if (viesti === null) {
      return null
    }
  
    return (
      <div className="ilmo">
        {viesti}
      </div>
    )
  }

  export default Ilmoitus