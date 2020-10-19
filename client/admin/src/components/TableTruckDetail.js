import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {FETCH_TRUCKS, SET_TRUCKS, DELETE_TRUCK, UPDATE_TRUCK} from '../store/actions/TrucksActions'
import {FETCH_DRIVERS} from '../store/actions/DriversAction'
import ModalEditTruck from './ModalEditTruck'
import Loading from './Loading'

export default function TableTruckDetail() {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(FETCH_TRUCKS())
        dispatch(FETCH_DRIVERS())
    },[])

    const loading = useSelector(state => state.TruckReducer.loadingStatus)
    const drivers = useSelector(state => state.DriverReducer.drivers)
    const trucks = useSelector(state => state.TruckReducer.trucks)
    if (loading) return <Loading/>
    return (
        <table className="table text-center thead-bg">
            <thead className='trucklist'>
            <tr>
                <th scope="col">Truck Code</th>
                <th scope="col">Driver</th>
                <th scope="col">Capacity</th>
                <th scope="col">Status</th>
                <th scope="col">Location</th>
                <th scope="col">Cost</th>
                <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody style={{backgroundColor:'#FFF8CD'}}>

                {trucks.map((truck,i) => {
                    function handleDeleteTruck() {
                        dispatch(DELETE_TRUCK(truck.id))
                        const filtered = trucks.filter( e => e.id !== truck.id)
                        dispatch(SET_TRUCKS(filtered))
                    }

                    function handleUpdateDriver(event) {
                        truck.DriverId = event.target.value
                      dispatch(UPDATE_TRUCK(truck, truck.id))
                    }
                    return(
                        <tr key={i}>
                            <th scope="row">{truck.truck_code}</th>
                            <td>  
                            <div className="form-group row">
                            <form >
                            <div className="col-sm-10">
                                <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" 
                                        value={truck.DriverId} onChange={handleUpdateDriver}>
                                            <option value=''>Set Driver...</option>
                                            {drivers.map((driver) => {
                                                    return(
                                                        <option value={driver.id}>{driver.name}</option>
                                                    )
                                            })}
                                        </select>
                                    </div>
                                </form>
                            </div>
                        </td>
                            <td>{truck.capacity}</td>
                            <td>{truck.status}</td>
                            <td>{truck.location[0]}, {truck.location[1]}</td>
                            <td>{truck.cost}</td>
                            <td>
                                <ModalEditTruck chosenTruck={truck} />
                                <button className="btn btn-secondary" onClick={handleDeleteTruck}>Delete</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
