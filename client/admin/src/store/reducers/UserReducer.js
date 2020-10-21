
const initState = {
  loadingStatus: false,
  errorStatus: false,
  user: null
}

function dumpReducer(state = initState, action) {
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
    case "SET_USER":
      return {
        ...state,
        user: action.payload
      }
    default:
      return state
  }
}

export default dumpReducer