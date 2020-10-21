import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {FETCH_TRUCKS, SET_TRUCK} from '../store/actions/TrucksActions'
import {FETCH_RESULT, SET_CHOSEN_RESULT} from '../store/actions/ResultAction'
import Loading from './Loading'
import { Maps } from '../components/Maps'

export default function CardTrackingTruck(props) {

  const dispatch = useDispatch()
  // const trucks = useSelector(state => state.TruckReducer.trucks)
  const result = useSelector(state => state.ResultReducer.result)
  const loading = useSelector(state => state.TruckReducer.loadingStatus)
  const chosenResult = useSelector(state => state.ResultReducer.chosenResult)
  let truckActive = null

  // useEffect(() => {
  //   dispatch(FETCH_RESULT())
  // }, [])
   
  useEffect(() => {
    dispatch(FETCH_RESULT())
  }, [dispatch])
  
  if (loading) return <Loading/>

  if(result) truckActive = result.BEST.bestSchema

  let routes = null
  if(chosenResult) {
     routes = chosenResult.route
  } 
  // console.log(routes,'check ini dahhhhh');  
  return (
    <div className="row">

    <div className="col-sm-4 cardReport">
								
      <div className="card headCardReport mx-auto noBorder shadow-sm"> 
            <div className="ml-3 text-white row mx-auto">
                <h2 className="mb-0 mt-1">Trucks List</h2>

            </div>
        </div>
        <div className="card mx-auto bodyCardReport noBorder shadow" >
          <div className="mt-4 ml-4">

          {truckActive && truckActive.map((e,i) => {
            function handleChangeTruck() {
              // console.log(e,'<<<<<<<<<<<<<<<<,,');
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
      </div>



        <div className="col-sm-8">
          <div className='card shadow mt-3'>
           {routes && < Maps routes={routes} />}
          </div>
        </div>
      </div>
  )
}
