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
    const loading = useSelector(state => state.TruckReducer.loadingStatus)
    const drivers = useSelector(state => state.DriverReducer.drivers)
    const trucks = useSelector(state => state.TruckReducer.trucks)

    useEffect(() => {

        if(trucks.length == 0  || drivers.length == 0) {
            dispatch(FETCH_TRUCKS())
            dispatch(FETCH_DRIVERS())
        }
    },[])

    useEffect(()=> {
        socket.on('SET_COORDINATE', coordinate => {

            setCoordinates(coordinate)
          });
    },[coordinates])

    

    // console.log(drivers,'cek driver dulu')
    // console.log(trucks,'ceck truck dulu');
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
            <div className="text-white row">
            {/* <FontAwesomeIcon icon={['fas', 'Coffee']} /> */}
            <span className="mx-auto">
                <h2 className="mb-0 mt-1 font-weight-bold">Trucks List</h2>
            </span>
                <span>
                    <ModalCreateTruck />

                </span>
                {/* <p class="font-weight-lighter font-italic">Table Driver</p> */}
            </div>
        </div>
        <div className="card tableBackground noBorder shadow" >
            <table className="table text-center mt-4 ">
            <thead className='table-borderless abuColor' style={{fontWeight:'bold', fontSize:'1.2em'}}>
            <tr>
                <th scope="col">Truck Code</th>
                <th scope="col">Driver</th>
                <th scope="col">Capacity</th>
                {/* <th scope="col">Coordinate</th> */}
                <th scope="col">Cost</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody>

                {trucks.map((truck,i) => {
                    function handleDeleteTruck() {
                        dispatch(UPDATE_DRIVERS( {status: 'available'}, truck.DriverId))
                        const filtered = trucks.filter( e => e.id !== truck.id)
                        dispatch(DELETE_TRUCK(truck.id))
                        dispatch(SET_TRUCKS(filtered))
                    }
                    function handleUpdateDriver(event) {
                        if(event.target.value) {
                            truck.DriverId = event.target.value
                            truck.location = truck.location.join()
                            // console.log(truck,'cek ini dulu');
                            dispatch(UPDATE_TRUCK(truck, truck.id))
                            dispatch(UPDATE_DRIVERS( {status: 'unavailable'}, truck.DriverId))
                        }
                        else {
                            dispatch(UPDATE_DRIVERS( {status: 'available'}, truck.DriverId))
                            truck.DriverId = null
                            truck.Driver = null
                            truck.location = truck.location.join()
                            dispatch(UPDATE_TRUCK(truck, truck.id))
                        }
                    }
                    function handleUpdateStatus(event) {
                        const driverId = truck.DriverId
                        truck.status = event.target.value
                        truck.DriverId= null 
                        truck.Driver= null
                        truck.location = truck.location.join()
                        if(event.target.value == 'available') {
                            dispatch(UPDATE_TRUCK(truck, truck.id))
                        } else if (event.target.value == 'unavailable') {
                            dispatch(UPDATE_DRIVERS( {status: 'available'}, driverId))
                            dispatch(UPDATE_TRUCK(truck, truck.id))
                        }
                    }
                      
                    return(
                        <tr key={i}>
                            <th scope="row abuColor">{truck.truck_code}</th>
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
                                            {truck.status =='available' ? drivers.filter(driver => driver.status == 'available').map((driver) => {
                                                // console.log(driver,'cekkkk');
                                                    return(
                                                        <option  value={driver.id}>{driver.name}</option>
                                                    )
                                            })
                                        :
                                        null
                                        }
                                        </select>
                                    </div>
                                </form>
                            </div>
                        </td>
                            <td>{truck.capacity} m³</td>
                            {/* <td>
                                <span>lat:  {truck.location[0]}</span><br/>
                                <span>long:  {truck.location[1]}</span>
                                </td> */}
                            <td>Rp {truck.cost} / m</td>
                            <td>
                                <div className="form-group row my-0  noBorder">
                                <form className="mx-auto noBorder" >
                                <div className="col-sm-10 noBorder">
                                    <select className="custom-select mr-sm-2 noBorder" id="inlineFormCustomSelect" 
                                        value={truck.status} onChange={handleUpdateStatus} style={{width:"150px"}}> 
                                                <option disabled>Choose...</option>
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
                                    <FontAwesomeIcon icon={faTrash} color="#212529" className="shadow iconHover" size="lg"/>
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
