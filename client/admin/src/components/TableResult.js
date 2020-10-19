import React from 'react'
import { useSelector } from 'react-redux'


export default function TableResult() {
  const chosenResult = useSelector(state => state.ResultReducer.chosenResult)
  let routes = []
  let truck = {}
  if(chosenResult) {
     routes = chosenResult.route
     truck = chosenResult.truck
     console.log(routes,'ini routes',truck);
  } 
  return (
    <table className="table text-center thead-bg mt-3">
            <thead className='trucklist'>
            <tr>
                <th scope="col">Truck Code</th>
                <th scope="col">Driver</th>
                <th scope="col">Load Tps/Capacity Truck</th>
                <th scope="col">Cost/Distance</th>
                <th scope="col">Total Distance</th>
                <th scope="col">Total Cost</th>
            </tr>
            </thead>
            {chosenResult &&
              <tbody style={{backgroundColor:'#FFF8CD'}}>
                <tr>
                  <th scope="row">{truck.truck_code}</th>
                  <td>{truck.Driver.name}</td>
                  <td>{chosenResult.totalVolume}/{truck.capacity}</td>
                  <td>{truck.cost}</td>
                  <td>{chosenResult.totalDistance} km</td>
                  <td>Rp {chosenResult.totalCost}</td>
                </tr>
              </tbody>
            }
        </table>
  )
}
