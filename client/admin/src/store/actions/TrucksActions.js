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

export function SET_TRUCKS(data) {
  return {
      type: "SET_TRUCKS",
      payload: data
  }
}

export function SET_TRUCK(data) {
  return(dispatch, getState) => {
    dispatch({
      type: "SET_TRUCK",
      payload: data
    })
  }
}

export function FETCH_TRUCKS() {
  
  return (dispatch, getState) => {
    dispatch(SET_LOADING(true))
    fetch(`http://localhost:3000/trucks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        data.forEach(truck => {
          truck.location = truck.location.split(',')
        });
        dispatch(SET_TRUCKS(data))
      })
      .catch(err => console.log(err))
      .finally(() => dispatch(SET_LOADING(false)))
    }
}

export function FETCH_TRUCK(id) {
  
  return (dispatch, getState) => {
    dispatch(SET_LOADING(true))
    fetch(`http://localhost:3000/trucks/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        data.location = data.location.split(',')
        dispatch(SET_TRUCK(data))
      })
      .catch(err => console.log(err))
      .finally(() => dispatch(SET_LOADING(false)))
    }
}

export function CREATE_TRUCK(data) {
  return (dispatch, getState) => {
    const trucks = getState().TruckReducer.trucks
    fetch(`http://localhost:3000/trucks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        trucks.concat(data)
        console.log(trucks);
        dispatch(FETCH_TRUCKS())
      })
      .catch(err => console.log(err))
    }
}

export function UPDATE_TRUCK(data, id) {
  console.log(data, id,'<<<<<<<< ini maam,');
  return (dispatch, getState) => {
    fetch(`http://localhost:3000/trucks/${id}`, {
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
        dispatch(FETCH_TRUCKS())
      })
      .catch(err => console.log(err))
    }
}

export function DELETE_TRUCK(id) {
  return (dispatch, getState) => {
    fetch(`http://localhost:3000/trucks/${id}`, {
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