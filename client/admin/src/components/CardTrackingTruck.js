import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {FETCH_TRUCKS, SET_TRUCK} from '../store/actions/TrucksActions'
import {FETCH_RESULT, SET_CHOSEN_RESULT} from '../store/actions/ResultAction'
import Loading from './Loading'
export default function CardTrackingTruck(props) {

  const dispatch = useDispatch()
  // const trucks = useSelector(state => state.TruckReducer.trucks)
  const result = useSelector(state => state.ResultReducer.result)
  const loading = useSelector(state => state.TruckReducer.loadingStatus)
  let truckActive = null
  useEffect(() => {
    dispatch(FETCH_RESULT())
  }, [dispatch])

  if(result) truckActive = result.bestSchema.filter(e => e.truck.status === 'available')

  // useEffect(() => {
  //   dispatch(FETCH_TRUCKS())
  // }, [dispatch])
  if (loading) return <Loading/>

  return (
    <div className='card shadow styleTrackingTruck'>
								
      <div className="card-header">
        Tracking
        </div>
      <div className="card-body">
        
        {truckActive && truckActive.map((e,i) => {
          function handleChangeTruck() {
              dispatch(SET_CHOSEN_RESULT(e))
          }
          return(
            <span key={i} className='row mb-3'>
              <h5 className='btn' onClick={handleChangeTruck}>{ e.truck.truck_code}</h5>
            </span>
          )
        })}

      </div>
    </div>
  )
}
