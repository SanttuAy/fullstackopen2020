
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer, {initializeAnecdotes} from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
//import anecdotes from './services/anecdotes'
//import anecdoteService from './services/anecdotes'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer
})
  
const store = createStore(
    reducer,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
)

/*anecdoteService.getAll().then(anecdotes =>
    anecdotes.forEach(anecdote => {
      store.dispatch({ type: 'NEW_ANECDOTE', data: anecdote })
    })
  )*/

/*anecdoteService.getAll().then(anecdotes =>
    store.dispatch(initializeAnecdotes(anecdotes)))*/

console.log(store.getState())


export default store