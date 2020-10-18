export function SET_RESULT(data) {
  return {
      type: "SET_TRUCKS",
      payload: data
  }; 
}

export function FETCH_RESULT() {
  console.log('masuk nih');
  return (dispatch, getState) => {
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
        console.log(data,'dapet datanya');
        // data.forEach(truck => {
        //   truck.location = truck.location.split(',')
        // });
        dispatch(SET_RESULT(data))
      })
      .catch(err => console.log(err))
    }
}