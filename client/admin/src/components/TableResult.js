import React from 'react'
import { useSelector } from 'react-redux'


export default function TableResult() {
  const chosenResult = useSelector(state => state.ResultReducer.chosenResult)
  let routes = []
  let truck = {}
  let tempDistance
  if(chosenResult) {
    let currencyFormat = chosenResult.totalCost.toLocaleString('id-ID', {
      style: "currency",
      currency: "IDR"
    })
    chosenResult.totalCost = currencyFormat.split(',')
    tempDistance = (chosenResult.totalDistance/1000).toFixed(2)
    // chosenResult.totalDistance = tempDistance
    routes = chosenResult.route
    truck = chosenResult.truck
    //  console.log(routes,'ini routes',truck);
  } 
  return (
    <div className="noBorder shadow"  > 
    <table className="table text-center  mt-3">
            <thead className='table-borderless thead-bg' style={{color:'white'}} >
            <tr>
                <th scope="col">Truck Code</th>
                <th scope="col">Driver</th>
                <th scope="col">Waste Vol / Truck Capacity</th>
                <th scope="col">Cost/Distance</th>
                <th scope="col">Total Distance</th>
                <th scope="col">Total Cost</th>
            </tr>
            </thead>
            {chosenResult &&
              <tbody style={{backgroundColor: 'rgb(245 245 245)'}}>
                <tr>
                  <th scope="row">{truck.truck_code}</th>
                  {truck.Driver ?
                  <td>{truck.Driver.name}</td> :
                  <td style={{color:'red'}}> no driver</td>
                  }
                  <td>{chosenResult.totalVolume}/{truck.capacity} m³</td>
                  <td>Rp {truck.cost} / meter</td>
                  <td>{tempDistance} km</td>
                  <td>{chosenResult.totalCost[0]}</td>
                </tr>
              </tbody>
            }
        </table>
        </div>
  )
}
