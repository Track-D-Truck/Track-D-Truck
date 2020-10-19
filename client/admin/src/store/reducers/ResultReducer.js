const initState = {
  loadingStatus: false,
  errorStatus: false,
  result: null,
  chosenResult: null
}

function ResultReducer(state = initState, action) {
  switch (action.type) {

    case "SET_LOADING":
      return {
        ...state,
        loadingStatus: action.payload
      }
    case "SET_ERROR":
      return {
        ...state,
        errorStatus: action.payload
      }
    case "SET_RESULT":
      return {
        ...state,
        result: action.payload
      }
    case "SET_CHOSEN_RESULT":
      return {
        ...state,
        chosenResult: action.payload
      }
    default:
      return state
  }
}

export default ResultReducer