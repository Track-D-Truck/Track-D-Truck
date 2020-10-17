const initState = {
  loadingStatus: false,
  errorStatus: false,
  dumps: [],
  chosenDumps: {}
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
    case "FETCH_TRUCKS":
      return {
        ...state,
        dumps: action.payload
      }
    default:
      return state
  }
}

export default dumpReducer