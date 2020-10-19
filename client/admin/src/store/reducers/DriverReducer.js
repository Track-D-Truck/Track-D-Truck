const initState = {
  loadingStatus: false,
  errorStatus: false,
  drivers: [],
  chosenDriver: {}
}

function dumpReducer(state = initState, action) {
  console.log(action,'<<<<<<<<<<<<<,');
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
    case "SET_DRIVERS":
      return {
        ...state,
        drivers: action.payload
      }
    default:
      return state
  }
}

export default dumpReducer