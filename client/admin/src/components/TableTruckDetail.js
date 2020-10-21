import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {FETCH_TRUCKS, SET_TRUCKS, DELETE_TRUCK, UPDATE_TRUCK} from '../store/actions/TrucksActions'
import {FETCH_DRIVERS, UPDATE_DRIVERS} from '../store/actions/DriversAction'
import ModalEditTruck from './ModalEditTruck'
import Loading from './Loading'
import socket from '../config/socket'
import ModalCreateTruck from '../components/ModalCreateTruck'  

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash} from '@fortawesome/free-solid-svg-icons'

export default function TableTruckDetail() {
    const dispatch = useDispatch()
    // const [chat, setChat] = useState('')
    const [coordinates, setCoordinates] = useState('')
    useEffect(() => {
        dispatch(FETCH_TRUCKS())
        dispatch(FETCH_DRIVERS())
    },[])

    useEffect(()=> {
        socket.on('SET_COORDINATE', coordinate => {

            setCoordinates(coordinate)
          });
    },[coordinates])

    
    const loading = useSelector(state => state.TruckReducer.loadingStatus)
    const drivers = useSelector(state => state.DriverReducer.drivers)
    const trucks = useSelector(state => state.TruckReducer.trucks)
    console.log(drivers)
    console.log(trucks);
    if (loading) return <Loading/>

    // const coordinate = null 
    
    // function handleChat(event) {
    //     setChat(event.target.value)
    //     socket.emit('CURRENT_COORDINATE', coordinate)
    // }

    // function submitChat(event) {
    //     event.preventDefault()
    //     socket.emit('SET_COORDINATE', chat)
    // }

    return (
        <div className="p-5">
	
        <div className="card tableHeadBackground mx-auto noBorder shadow-sm"> 
            <div className="ml-3 text-white row">
            {/* <FontAwesomeIcon icon={['fas', 'Coffee']} /> */}
                <h2 className="mb-0 mt-1">Trucks List</h2>
                <ModalCreateTruck/>
                {/* <p class="font-weight-lighter font-italic">Table Driver</p> */}
            </div>
        </div>
        <div className="card tableBackground noBorder shadow" >
            <table className="table text-center mt-4 ">
            <thead className='table-borderless' style={{color:'#65AE07', fontWeight:'bold', fontSize:'1.2em'}}>
            <tr>
                <th scope="col">Truck Code</th>
                <th scope="col">Driver</th>
                <th scope="col">Capacity</th>
                <th scope="col">Coordinate</th>
                <th scope="col">Cost</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody>

                {trucks.map((truck,i) => {
                    function handleDeleteTruck() {
                        dispatch(DELETE_TRUCK(truck.id))
                        const filtered = trucks.filter( e => e.id !== truck.id)
                        dispatch(SET_TRUCKS(filtered))
                    }
                    function handleUpdateDriver(event) {
                        if(event.target.value) {
                            console.log(truck,'cek truck');
                            truck.DriverId = event.target.value
                            truck.location = truck.location.join()
                            dispatch(UPDATE_TRUCK(truck, truck.id))
                            dispatch(UPDATE_DRIVERS( {status: 'unavailable'}, truck.DriverId))
                        }
                        else {
                            dispatch(UPDATE_DRIVERS( {status: 'available'}, truck.DriverId))
                            truck.DriverId = null
                            truck.location = truck.location.join()
                            dispatch(UPDATE_TRUCK(truck, truck.id))
                        }
                    }
                    function handleUpdateStatus(event) {
                        if(event.target.value == 'available') {
                            dispatch(UPDATE_TRUCK({status: event.target.value, DriverId: null}, truck.id))
                            dispatch(UPDATE_DRIVERS( {status: 'available'}, truck.DriverId))
                        } else if (event.target.value == 'unavailable') {
                            dispatch(UPDATE_TRUCK({status: event.target.value}, truck.id))
                        }
                    }
                      
                    return(
                        <tr key={i}>
                            <th scope="row">{truck.truck_code}</th>
                            <td>  
                            <div className="form-group row my-0  noBorder">
                            <form className="mx-auto noBorder" >
                            <div className="col-sm-10 noBorder">
                                <select className="custom-select mr-sm-2 noBorder" id="inlineFormCustomSelect" 
                                        value={truck.DriverId} onChange={handleUpdateDriver} style={{width:"150px"}}> 
                                            {truck.DriverId ? 
                                        <option value={truck.DriverId} disabled>{truck.Driver.name}</option>
                                        : null    
                                    }
                                        <option value=''>Set Driver...</option>
                                            {drivers.filter(driver => driver.status == 'available').map((driver) => {
                                                // console.log(driver,'cekkkk');
                                                    return(
                                                        <option  value={driver.id}>{driver.name}</option>
                                                    )
                                            })}
                                        </select>
                                    </div>
                                </form>
                            </div>
                        </td>
                            <td>{truck.capacity} m³</td>
                            <td>
                                <span>lat:  {truck.location[0]}</span><br/>
                                <span>long:  {truck.location[1]}</span>
                                </td>
                            <td>Rp {truck.cost} / meter</td>
                            <td>
                                <div className="form-group row my-0  noBorder">
                                <form className="mx-auto noBorder" >
                                <div className="col-sm-10 noBorder">
                                    <select className="custom-select mr-sm-2 noBorder" id="inlineFormCustomSelect" 
                                        value={truck.status} onChange={handleUpdateStatus} style={{width:"150px"}}> 
                                                <option >Choose...</option>
												<option value="available">Available</option>
												<option value="unavailable">Unavailable</option>
                                        </select>
                                        </div>
                                    </form>
                                    </div>
                                </td>
                            <td>
                                <ModalEditTruck chosenTruck={truck} />
                                <button className="btn noBorder" onClick={handleDeleteTruck}>
                                    <FontAwesomeIcon icon={faTrash} color="#65AE07" className="shadow" size="lg"/>
                                    </button>
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </div>
    )
}
