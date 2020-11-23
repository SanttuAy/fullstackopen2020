import React, { useState, useEffect } from 'react'
import { useSelector,  useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'


const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
 
 
  if (notification === null) {
    return null
  }
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  /*dispatch(window.confirm(notify({notification})),
  setTimeout(() => {
    dispatch(notify(null))
  }, 5000), */

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification