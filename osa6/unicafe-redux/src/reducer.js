const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const lisattyGood = state.good + 1
      return {...state, good: lisattyGood}
    case 'OK':
      const lisattyOk = state.ok + 1
      return {...state, ok: lisattyOk}
    case 'BAD':
      const lisattyBad = state.bad + 1
      return {...state, bad: lisattyBad}
      case 'ZERO':
        return {...state, good: 0, ok: 0, bad: 0}
    default: 
      return state
  }
  
}

export default counterReducer