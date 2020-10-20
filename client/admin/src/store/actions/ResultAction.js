export function SET_LOADING(status) {
  return {
    type: "SET_LOADING",
    payload: status
  }
}

export function SET_ERROR(status) {
  return {
    type: "SET_ERROR",
    payload: status
  }
}

export function SET_RESULT(data) {
  return {
      type: "SET_RESULT",
      payload: data
  }; 
}

export function SET_CHOSEN_RESULT(data) {
  return {
      type: "SET_CHOSEN_RESULT",
      payload: data
  }; 
}

export function FETCH_RESULT() {
  return (dispatch, getState) => {
    dispatch(SET_LOADING(true))
    fetch(`http://localhost:3000/optimations/test`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
          dispatch(SET_RESULT(data))
      })
      .catch(err => console.log(err))
      .finally(() => dispatch(SET_LOADING(false)))
    }
}