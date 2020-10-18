import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {FETCH_TRUCKS, SET_TRUCK} from '../store/actions/TrucksActions'
import {FETCH_RESULT} from '../store/actions/ResultAction'

export default function CardTrackingTruck(props) {

  const dispatch = useDispatch()
  const trucks = useSelector(state => state.TruckReducer.trucks)

  useEffect(() => {
    dispatch(FETCH_TRUCKS())
  }, [dispatch])

  useEffect(() => {
    dispatch(FETCH_RESULT())
  }, [dispatch])

  return (
    <div className='card shadow styleTrackingTruck'>
								
      <div className="card-header">
        Tracking
        </div>
      <div className="card-body">
        
        {trucks.map((truck,i) => {
          function handleChangeTruck() {
              dispatch(SET_TRUCK(truck))
          }
          return(
            <span key={i} className='row mb-3'>
              <h5 className='btn' onClick={handleChangeTruck}>{ truck.truck_code}</h5>
            </span>
          )
        })}

      </div>
    </div>
  )
}
