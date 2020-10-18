import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ModalEditTruck from './ModalEditTruck'
import Loading from './Loading'
import {FETCH_DRIVERS, SET_DRIVERS} from '../store/actions/DriversAction'

export default function TableDriverDetail() {
    // const [dummyTrucks, setDummyTrucks] = useState([])
    const drivers = useSelector(state => state.DriverReducer.drivers)
    const loading = useSelector(state => state.DriverReducer.loadingStatus)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(FETCH_DRIVERS())
    }, [] )

    if (loading) return <Loading/>
    return (
        <table className="table text-center thead-bg">
            <thead className='trucklist'>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody style={{backgroundColor:'#FFF8CD'}}>
                {drivers.map((driver,i) => {
                    function handleDeleteTruck() {
                        const filtered = drivers.filter( e => e.id !== driver.id)
                        dispatch(SET_DRIVERS(filtered))
                    }
                    return(
                        <tr key={i}>
                            <th scope="row">{driver.id}</th>
                            <td>{driver.name}</td>
                            <td>{driver.email}</td>
                            <td>{driver.phone}</td>
                            <td>{driver.status}</td>
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
