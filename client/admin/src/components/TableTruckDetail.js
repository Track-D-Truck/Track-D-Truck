import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {FETCH_TRUCKS, SET_TRUCKS, DELETE_TRUCK, SET_TRUCK} from '../store/actions/TrucksActions'
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

                    return(
                        <tr key={i}>
                            <th scope="row">{truck.truck_code}</th>
                            {truck.Driver ?
                            <td>{truck.Driver}</td> :
                            <td>..set driver.. </td> 
                            }
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
