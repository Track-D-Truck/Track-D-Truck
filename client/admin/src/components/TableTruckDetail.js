import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ModalEditTruck from './ModalEditTruck'
import {FETCH_TRUCKS, SET_TRUCKS, DELETE_TRUCK} from '../store/actions/TrucksActions'

export default function TableTruckDetail() {
    const dispatch = useDispatch()
    const trucks = useSelector(state => state.TruckReducer.trucks)

    useEffect(() => {
        dispatch(FETCH_TRUCKS())
      },[dispatch])
    
    return (
        <table className="table text-center thead-bg">
            <thead className='trucklist'>
            <tr>
                <th scope="col">Truck Code</th>
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
                            <td>{truck.capacity}</td>
                            <td>{truck.status}</td>
                            <td>{truck.location[0]}, {truck.location[1]}</td>
                            <td>{truck.cost}</td>
                            <td>
                                <button className="btn btn-secondary">Detail</button>
                                <ModalEditTruck/>
                                <button className="btn btn-secondary" onClick={handleDeleteTruck}>Delete</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
