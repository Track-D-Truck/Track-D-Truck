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

export function SET_DRIVERS(data) {
  return {
      type: "SET_DRIVERS",
      payload: data
  }; 
}

export function FETCH_DRIVERS() {

  return (dispatch, getState) => {
    fetch(`http://localhost:3005/Drivers`, {
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

export function DELETE_DRIVER(id) {
  return (dispatch, getState) => {
    fetch(`http://localhost:3005/Drivers/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
      })
      .catch(err => console.log(err))
    }
}


export function UPDATE_DRIVERS(data) {
  return (dispatch, getState) => {
    fetch(`http://localhost:3005/Drivers/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data,'success update');
      })
      .catch(err => console.log(err))
    }
}