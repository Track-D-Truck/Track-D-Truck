const initState = {
  loadingStatus: false,
  errorStatus: false,
  dumps: [],
  chosenDumps: {},
  location: null
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
    case "SET_DUMPS":
      return {
        ...state,
        dumps: action.payload
      }
    case "SET_LOCATION":
      return {
        ...state,
        location: action.payload
      }
      
    default:
      return state
  }
}

export default dumpReducer