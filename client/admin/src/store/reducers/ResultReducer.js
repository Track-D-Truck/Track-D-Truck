const initState = {
  loadingStatus: false,
  errorStatus: false,
  result: [],
  // chosenTruck: ''
}

function truckReducer(state = initState, action) {
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
    // case "SET_TRUCK":
    //   return {
    //     ...state,
    //     chosenTruck: action.payload
    //   }
    default:
      return state
  }
}

export default truckReducer