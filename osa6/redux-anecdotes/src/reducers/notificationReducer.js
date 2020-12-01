const notificationReducer = (state = 'alkuteksti', action) => {
    console.log('notificationReducerista ACTION: ', action)
    console.log('notificationReducerista state now: ', state)

    switch (action.type) {
       case 'SET_MESSAGE':
           return `you voted ${action.content}`
        default:
            return state  
    }
}

export const notify = content => {
    console.log('notifyssa: ', content)
    return {
      type: 'SET_MESSAGE',
      content
    }
  }

  /*
export const removeMessage = () => {
  return {
    type: 'SET_MESSAGE',
    notification:null
  }
}*/

export default notificationReducer