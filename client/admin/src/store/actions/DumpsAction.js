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

export function SET_DUMPS(data) {
  return {
      type: "SET_DUMPS",
      payload: data
  }; 
}


export function FETCH_DUMPS() {

  return (dispatch, getState) => {
    dispatch(SET_LOADING(true))
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
      .finally(() => dispatch(SET_LOADING(false)))
    }
}



export function CREATE_DUMP(data) {
  return (dispatch, getState) => {
    const dumps = getState().DumpReducer.dumps
    console.log(dumps,'cek dulu gais amsuk');
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
        dumps.push(data)
        dispatch(SET_DUMPS(dumps))
        // dispatch(FETCH_DUMPS())
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
      })
      .catch(err => console.log(err))
    }
}

export function UPDATE_DUMP(data, id) {
  return (dispatch, getState) => {
    fetch(`http://localhost:3000/tps/${id}`, {
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
        dispatch(FETCH_DUMPS())
      })
      .catch(err => console.log(err))
    }
}