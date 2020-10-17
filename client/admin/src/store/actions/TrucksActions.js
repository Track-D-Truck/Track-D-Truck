export function SET_LOADING(status) {
  // dispatch({
  //   type: "SET_LOADING",
  //   payload: status
  // })
}

export function SET_ERROR(status) {
  
}

export function FETCH_TRUCKS() {

  const dummyTruck = [
    {
      id: 1,
      code: 'truck01',
      driver: 'jajang',
      capacity: 100,
      position: 'parung',
      route : ['sentul','bogor', 'parung', 'katulampa', 'bintaro'],
      totalDistance : 50
    } , {
      id: 2,
      code: 'truck02',
      driver: 'jajang',
      capacity: 100,
      position: 'katulampa',
      route : ['sentul','bogor', 'parung', 'katulampa', 'bintaro'],
      totalDistance : 75
    }
  ]
  return(dispatch, getState) => {
    dispatch({
      type: "FETCH_TRUCKS",
      payload: dummyTruck
    })
  }
//   return (dispatch, getState) => {
//     // console.log(dispatch,'ini jalan gaaaaaa');
//     fetch("http://localhost:3000/pokemon", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json"
//         }
//     })
//         .then((res) => {
//             return res.json()
//         })
//         .then((data) => {
//             dispatch({
//                 type: "FETCH_POKEMONS",
//                 payload: data
//             })
//         })
//         .catch(err => console.log(err))
// }
}

export function FETCH_TRUCK(truck) {
  return(dispatch, getState) => {
    dispatch({
      type: "FETCH_TRUCK",
      payload: truck
    })
  }
}