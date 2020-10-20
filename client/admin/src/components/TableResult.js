import React from 'react'
import { useSelector } from 'react-redux'


export default function TableResult() {
  const chosenResult = useSelector(state => state.ResultReducer.chosenResult)
  let routes = []
  let truck = {}
  if(chosenResult) {
      let currencyFormat = chosenResult.totalCost.toLocaleString('id-ID', {
        style: "currency",
        currency: "IDR"
      })
      chosenResult.totalCost = currencyFormat.split(',')
      chosenResult.totalDistance = chosenResult.totalDistance.toLocaleString()
     routes = chosenResult.route
     truck = chosenResult.truck
    //  console.log(routes,'ini routes',truck);
  } 
  return (
    <table className="table text-center thead-bg mt-3">
            <thead className='trucklist'>
            <tr>
                <th scope="col">Truck Code</th>
                <th scope="col">Driver</th>
                <th scope="col">Vol TPS/ <br/>Capacity Truck</th>
                <th scope="col">Cost/Distance</th>
                <th scope="col">Total Distance</th>
                <th scope="col">Total Cost</th>
            </tr>
            </thead>
            {chosenResult &&
              <tbody style={{backgroundColor:'#FFF8CD'}}>
                <tr>
                  <th scope="row">{truck.truck_code}</th>
                  {truck.Driver ?
                  <td>{truck.Driver.name}</td> :
                  <td style={{color:'red'}}> no driver</td>
                  }
                  <td>{chosenResult.totalVolume}/{truck.capacity} m³</td>
                  <td>Rp {truck.cost} / meter</td>
                  <td>{chosenResult.totalDistance} km</td>
                  <td>{chosenResult.totalCost[0]}</td>
                </tr>
              </tbody>
            }
        </table>
  )
}
