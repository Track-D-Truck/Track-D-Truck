import React from 'react'
import { useSelector } from 'react-redux'

export default function TableResult() {
  const chosenTruck = useSelector(state => state.TruckReducer.chosenTruck)
  return (
    <table className="table text-center thead-bg mt-3">
            <thead className='trucklist'>
            <tr>
								{/* <th scope="col">ID</th> */}
                <th scope="col">Truck Code</th>
                <th scope="col">Driver</th>
                <th scope="col">Capacity</th>
                <th scope="col">Current TPS</th>
				<th scope="col">Total Current Distance</th>
				<th scope="col">Total Current Cost</th>

            </tr>
            </thead>
            {chosenTruck &&
              <tbody style={{backgroundColor:'#FFF8CD'}}>
                <tr>
                  {/* <th scope="row">{i}</th> */}
                  <td>{chosenTruck.code}</td>
                  <td>{chosenTruck.driver}</td>
                  <td>{chosenTruck.capacity}</td>
                  <td>{chosenTruck.position}</td>
                  <td>{chosenTruck.totalDistance} km</td>
                  <td>Rp {50000*chosenTruck.totalDistance}</td>
                </tr>
              </tbody>
            }
        </table>
  )
}
