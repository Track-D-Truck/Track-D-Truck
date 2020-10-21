import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {FETCH_TRUCKS, SET_TRUCK} from '../store/actions/TrucksActions'
import {FETCH_RESULT, SET_CHOSEN_RESULT} from '../store/actions/ResultAction'
import Loading from './Loading'
import { Maps } from '../components/Maps'
import {MyMapComponent} from '../components/MapsDefault'
import truck1 from '../assets/shipping-truck11.png'
import truck2 from '../assets/shipping-truck22.png'
import truck3 from '../assets/shipping-truck33.png'
import truck4 from '../assets/shipping-truck43.png'

export default function CardTrackingTruck(props) {

  const dispatch = useDispatch()
  // const trucks = useSelector(state => state.TruckReducer.trucks)
  const result = useSelector(state => state.ResultReducer.result)
  const loading = useSelector(state => state.TruckReducer.loadingStatus)
  const chosenResult = useSelector(state => state.ResultReducer.chosenResult)
  let truckActive = null
  let looping = -1
  const truckIcon = [truck1,truck2,truck3,truck4]
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
          <div className="mt-4 mx-auto">

          {truckActive && truckActive.map((e,i) => {
            function handleChangeTruck() {
              // console.log(e,'<<<<<<<<<<<<<<<<,,');
              dispatch(SET_CHOSEN_RESULT(e))
            }
            if(looping == truckActive.length) {
              looping = -1
            }
            looping += 1
            return(
              <span key={i} className='row mb-3'>
                <span>

                  <img src={truckIcon[looping]} alt="Logo" width="45px"/>
                </span>
                <h5 className='btn my-auto ml-2' onClick={handleChangeTruck}>{ e.truck.truck_code}</h5>
              </span>
            )
          })}

          </div>
        

        </div>
      </div>



        <div className="col-sm-8">
          <div className='card shadow mt-3'>
          
           {routes ? < Maps routes={routes}/> : 
                <MyMapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAK0QXUj4Jet4cJnWWV9nE1e62CbXPAcsc&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `380px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
           }
          </div>
        </div>
      </div>
  )
}
