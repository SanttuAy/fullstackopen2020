import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notify, showMessage } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick}) => {
    return(
        <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
            <button onClick={ handleClick }>vote</button>
            </div>
        </div>
    )
  }

  const AnecdoteList = (props) => {
  //  const dispatch = useDispatch()
  //  const anecdotes = useSelector(state => state.anecdotes)

    return(
      <ul>
        {props.anecdotes.map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => 
              props.vote(anecdote.id, { 
                ...anecdote, 
                votes: anecdote.votes + 1 
              },
              props.notify(anecdote.content))
            }
          />
        ) }
      </ul>
    )
  }

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
  } 
}

const mapDispatchToProps = {
  vote,
  notify
}
  //export default AnecdoteList
  const ConnectedNotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
  export default ConnectedNotes