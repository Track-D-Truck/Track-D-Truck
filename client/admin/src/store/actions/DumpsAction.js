export function SET_LOADING(status) {
  
}

export function SET_ERROR(status) {
  
}

export function FETCH_DUMPS() {

  return (dispatch, getState) => {
    fetch(`http://localhost:3000/tps`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        data.forEach(dump => {
          dump.location = dump.location.split(',')
          
        });
        dispatch(SET_DUMPS(data))
      })
      .catch(err => console.log(err))
    }
}

export function SET_DUMPS(data) {
  return {
      type: "SET_DUMPS",
      payload: data
  }; 
}

export function CREATE_DUMP(data) {
  return (dispatch, getState) => {
    fetch(`http://localhost:3000/tps`, {
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
        dispatch(SET_DUMPS(data))
      })
      .catch(err => console.log(err))
    }
}

export function DELETE_DUMP(id) {
  return (dispatch, getState) => {
    fetch(`http://localhost:3000/tps/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        dispatch(FETCH_DUMPS())
      })
      .catch(err => console.log(err))
    }
}