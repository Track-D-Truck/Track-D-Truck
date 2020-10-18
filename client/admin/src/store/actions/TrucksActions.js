export function SET_LOADING(status) {
  // dispatch({
  //   type: "SET_LOADING",
  //   payload: status
  // })
}

export function SET_ERROR(status) {
  
}

export function SET_TRUCKS(data) {
  return {
      type: "SET_TRUCKS",
      payload: data
  }; 
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
        console.log(data,'<<<<<<<<<');
        data.forEach(truck => {
          truck.location = truck.location.split(',')
        });
        dispatch(SET_TRUCKS(data))
      })
      .catch(err => console.log(err))
    }
}

export function CREATE_TRUCK(data) {
  return (dispatch, getState) => {
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
        console.log(data,'<<<<<<<<<');
        dispatch(SET_TRUCKS(data))
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
        console.log(data,'<<<<<<<<<');
        dispatch(FETCH_TRUCKS())
      })
      .catch(err => console.log(err))
    }
}