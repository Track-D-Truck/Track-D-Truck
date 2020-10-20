import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ModalEditTruck from './ModalEditTruck'
import Loading from './Loading'
import {FETCH_DRIVERS, SET_DRIVERS, DELETE_DRIVER, UPDATE_DRIVERS} from '../store/actions/DriversAction'
import {UPDATE_TRUCK, FETCH_TRUCKS} from '../store/actions/TrucksActions'

export default function TableDriverDetail() {
    const dispatch = useDispatch()
    // const [dummyTrucks, setDummyTrucks] = useState([])
    useEffect(() => {
        dispatch(FETCH_TRUCKS())
        dispatch(FETCH_DRIVERS())
    }, [] )
    const drivers = useSelector(state => state.DriverReducer.drivers)
    const loading = useSelector(state => state.DriverReducer.loadingStatus)
    const trucks = useSelector(state => state.TruckReducer.trucks)

    // console.log(trucks,'tesst aja');
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
                    console.log(driver, "<<ini driver")
                    const  driverTruck = trucks.filter(truck => truck.DriverId == driver.id)

                    function handleDeleteTruck() {
                        dispatch(DELETE_DRIVER(driver.id))
                        const filtered = drivers.filter( e => e.id !== driver.id)
                        dispatch(SET_DRIVERS(filtered))
                    }

                    function handleUpdateStatus(event) {
                        let changedStatus = event.target.value
                        // console.log(driverTruck[0]);
                        driverTruck[0].DriverId = 0
                        driverTruck[0].location = driverTruck[0].location.join()
                        console.log(driverTruck[0],'kok gabisa');
                        console.log(changedStatus);
                        dispatch(UPDATE_TRUCK(driverTruck[0], driverTruck[0].id))
                        dispatch(UPDATE_DRIVERS({status: changedStatus}, driver.id))
                    }
                        
                    return(
                        <tr key={i}>
                            <th scope="row">{driver.id}</th>
                            <td>{driver.name}</td>
                            <td>{driver.email}</td>
                            <td>{driver.phone}</td>
                            {/* <td>{driver.status}</td> */}
                            <td>  <div className="form-group row">
                                <form >
                                    <div className="col-sm-10">
                                        <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" 
                                            value={driver.status} onChange={handleUpdateStatus}>
                                                <option>Choose...</option>
                                                <option value="available">Available</option>
                                                <option value="unavailable" disabled>Unavailable</option>
                                            </select>
                                    </div>
                                </form>
							</div></td>
                            <td>
                                {/* <button className="btn btn-secondary">Detail</button> */}
                                {/* <ModalEditTruck/> */}
                                <button className="btn btn-secondary" onClick={handleDeleteTruck}>Delete</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
