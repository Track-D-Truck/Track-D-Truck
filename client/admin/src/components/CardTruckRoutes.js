import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import socket from '../config/socket'
import { FETCH_TRUCK, UPDATE_TRUCK } from '../store/actions/TrucksActions'

export default function CardTruckRoutes() {
  const dispatch = useDispatch()
  const chosenTruck = useSelector(state => state.TruckReducer.chosenTruck)
  const chosenResult = useSelector(state => state.ResultReducer.chosenResult)
  console.log(chosenTruck, "<ini chosen truck")

  let routes = []
  let location = null
  if(chosenResult) {
     routes = chosenResult.route
     location = chosenResult.truck.location
  } 
  console.log(chosenResult, "<<ini data")
  const [coordinates, setCoordinates] = useState('')
    useEffect(()=> {
        socket.on('SET_COORDINATE', payload => {
          setCoordinates(payload.location)
          dispatch(FETCH_TRUCK, payload.truckId)
          // dispatch(UPDATE_TRUCK({location: payload.location}, payload.truckId))
          });
    },[location])

  // console.log(coordinates, "<<ini coordinates")
  return (
    <div className="styleRoutes">
      <div className="card headCardReport  mx-auto noBorder shadow-sm"> 
            <div className="ml-3 text-white row mx-auto">
                <h2 className="mb-0 mt-1">Routes</h2>
                </div>
        </div>
        <div className="card mx-auto bodyCardReport noBorder shadow" >
          <div className="mt-4 ml-4 overflow-auto">
        {chosenResult && routes.map((tps,i) => {
          return(
            <div key={i} className="mb-5">
              {tps.location != coordinates ?
              <span> X</span>
                :
              <svg id="Layer_1" enableBackground="new 0 0 30 30" height="30" viewBox="0 0 512 512" width="30" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m128 324h-32c-26.51 0-48 21.49-48 48 0 26.51 21.49 48 48 48h32c26.51 0 48-21.49 48-48 0-26.51-21.49-48-48-48z" fill="#32283c"/></g><g><path d="m368 356v-248c0-8.837-7.163-16-16-16h-160c8.837 0 16 7.163 16 16v248c0 8.837-7.163 16-16 16h160c8.837 0 16-7.163 16-16z" fill="#faa037"/></g><g><g><path d="m192 92h-160c-8.837 0-16 7.163-16 16v248c0 8.837 7.163 16 16 16h160c8.837 0 16-7.163 16-16v-248c0-8.837-7.163-16-16-16z" fill="#ffd241"/></g></g><g><g><path d="m57.333 316c-6.627 0-12-5.373-12-12v-165.333c0-6.627 5.373-12 12-12 6.627 0 12 5.373 12 12v165.333c0 6.627-5.372 12-12 12z" fill="#faa037"/></g><g><path d="m110.667 316c-6.627 0-12-5.373-12-12v-165.333c0-6.627 5.373-12 12-12 6.627 0 12 5.373 12 12v165.333c0 6.627-5.373 12-12 12z" fill="#faa037"/></g><g><path d="m164 316c-6.627 0-12-5.373-12-12v-165.333c0-6.627 5.373-12 12-12 6.627 0 12 5.373 12 12v165.333c0 6.627-5.373 12-12 12z" fill="#faa037"/></g></g><g><path d="m432 324h-32c-26.51 0-48 21.49-48 48 0 26.51 21.49 48 48 48h32c26.51 0 48-21.49 48-48 0-26.51-21.49-48-48-48z" fill="#32283c"/></g><g><circle cx="400" cy="372" fill="#555a6e" r="48"/></g><g><circle cx="400" cy="372" fill="#e6e6eb" r="16"/></g><g><path d="m304 324h-32c-26.51 0-48 21.49-48 48 0 26.51 21.49 48 48 48h32c26.51 0 48-21.49 48-48 0-26.51-21.49-48-48-48z" fill="#32283c"/></g><g><path d="m464 164h-240c-8.837 0-16 7.163-16 16v16h256c8.837 0 16-7.163 16-16 0-8.837-7.163-16-16-16z" fill="#a5c3dc"/></g><g><path d="m304 164h-80c-8.837 0-16 7.163-16 16v16h96c8.837 0 16-7.163 16-16 0-8.837-7.163-16-16-16z" fill="#d7e6f0"/></g><g><path d="m208 196h256v80h-256z" fill="#463c4b"/></g><g><path d="m208 196h96v80h-96z" fill="#555a6e"/></g><g><path d="m480 372h-256c-8.837 0-16-7.163-16-16v-80h256c17.673 0 32 14.327 32 32v48c0 8.837-7.163 16-16 16z" fill="#a5c3dc"/></g><g><path d="m320 372h-96c-8.837 0-16-7.163-16-16v-80h96c17.673 0 32 14.327 32 32v48c0 8.837-7.163 16-16 16z" fill="#d7e6f0"/></g><g><path d="m374.667 308h82.667c12.518 0 22.666 10.148 22.666 22.667 0 12.518-10.148 22.667-22.667 22.667h-82.667c-12.518 0-22.667-10.148-22.667-22.667.001-12.519 10.149-22.667 22.668-22.667z" fill="#555a6e"/></g><g><circle cx="374.667" cy="330.667" fill="#00d2d2" r="12"/></g><g><circle cx="457.333" cy="330.667" fill="#00d2d2" r="12"/></g><g><circle cx="272" cy="372" fill="#555a6e" r="48"/></g><g><circle cx="272" cy="372" fill="#e6e6eb" r="16"/></g><g><circle cx="96" cy="372" fill="#555a6e" r="48"/></g><g><circle cx="96" cy="372" fill="#e6e6eb" r="16"/></g></g></svg>
            }
              <span className='ml-3'>{tps.name}</span>
            </div>
          )
        })}

      </div>
      </div>
    </div>
  )
}
