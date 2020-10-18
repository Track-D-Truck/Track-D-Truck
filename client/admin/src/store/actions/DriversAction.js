export function FETCH_DRIVERS() {

  return (dispatch, getState) => {
    fetch(`http://localhost:3000/Drivers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        dispatch(SET_DRIVERS(data))
      })
      .catch(err => console.log(err))
    }
}

export function SET_DRIVERS(data) {
  return {
      type: "SET_DRIVERS",
      payload: data
  }; 
}