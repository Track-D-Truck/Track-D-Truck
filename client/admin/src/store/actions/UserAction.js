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

export function SET_USER(data) {
  return(dispatch, getState) => {
    dispatch({
      type: "SET_USER",
      payload: data
    })
  }
}

export function LOGIN_USER(data) {

  return (dispatch, getState) => {
    dispatch(SET_LOADING(true))
    fetch(`http://localhost:3000/login`, {
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
        // {access_token, name, id, phone, email}
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('name', data.name)
        data = {name : data.name , id: data.id, phone: data.id, email: data.email}
        dispatch(SET_USER(data))
      })
      .catch(err => console.log(err))
      .finally(() => {
        dispatch(SET_LOADING(false))

      })
    }
}