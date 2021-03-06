
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

//EDELLINEN VERSIO
/*
export const vote = id => {
  return {
    type: 'VOTE',
    data:{ id }
  }
}*/
export const vote = (id, newObject) => {
  return async dispatch => {
    const changedAnecdote = await anecdoteService.update(id, newObject)
    dispatch({
      type: 'VOTE',
      data: changedAnecdote
    })
  }
}

// EDELLINEN VERSIO
/*export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}*/
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}
//EDELLINEN VERSIO
/* export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data
   //   data: {
  //    content,
  //    id: getId(),
  //    votes: 0
  //  }
  }
}*/

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
  console.log('anecdoteReducerista ACTION', action)
  console.log('anecdoteReducerista state now: ', state)

  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
        return action.data
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(n => n.id === id)
      const changedAnecdote = { 
        ...anecdoteToVote, 
        votes: anecdoteToVote.votes += 1 
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      )
    default:
      return state
  }
}

export default anecdoteReducer