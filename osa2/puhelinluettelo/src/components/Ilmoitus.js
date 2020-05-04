import React from 'react'

const Ilmoitus = ({ viesti, varoitus }) => {
    if (viesti === null || varoitus !== null) {
      return null
    }
  
    return (
      <div className="ilmo">
        {viesti}
      </div>
    )
  }

  export default Ilmoitus