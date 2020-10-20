import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {FETCH_TRUCKS, SET_TRUCKS, DELETE_TRUCK, UPDATE_TRUCK} from '../store/actions/TrucksActions'
import {FETCH_DRIVERS, UPDATE_DRIVERS} from '../store/actions/DriversAction'
import ModalEditTruck from './ModalEditTruck'
import Loading from './Loading'
import socket from '../config/socket'

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
        <>
        {/* <form onSubmit={submitChat}>
            <input onChange={handleChat}/>
            <button className="btn">test </button>
        </form>
            {coordinate.map((e) => {
                return(
                    <h1>{e}</h1>

                )
            })} */}
            <h1>{coordinates}</h1>

        <table className="table text-center thead-bg">
            <thead className='trucklist'>
            <tr>
                <th scope="col">Truck Code</th>
                <th scope="col">Driver</th>
                <th scope="col">Capacity</th>
                <th scope="col">Status</th>
                <th scope="col">Coordinate</th>
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
                    console.log(truck,'cek truck');
                    function handleUpdateDriver(event) {
                        if(event.target.value) {
                            dispatch(UPDATE_DRIVERS( {status: 'available'}, truck.DriverId))
                            truck.DriverId = event.target.value
                            truck.location = truck.location.join()
                            dispatch(UPDATE_TRUCK(truck, truck.id))
                            dispatch(UPDATE_DRIVERS( {status: 'unavailable'}, truck.DriverId))
                        }
                        else {
                            truck.DriverId = 0
                            truck.location = truck.location.join()
                            dispatch(UPDATE_DRIVERS( {status: 'available'}, truck.DriverId))
                            dispatch(UPDATE_TRUCK(truck, truck.id))
                        }
                    }
                      
                    return(
                        <tr key={i}>
                            <th scope="row">{truck.truck_code}</th>
                            <td>  
                            <div className="form-group row">
                            <form >
                            <div className="col-sm-10">
                                <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" 
                                        value={truck.DriverId} onChange={handleUpdateDriver} style={{width:"150px"}}> 
                                            {truck.DriverId ? 
                                        <option value={truck.DriverId} disabled>{truck.Driver.name}</option>
                                        : null    
                                    }
                                        <option value=''>Set Driver...</option>
                                            {drivers.filter(driver => driver.status == 'available').map((driver) => {
                                                console.log(driver.status,'cekkkk');
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
                            <td>{truck.status}</td>
                            <td>
                                <span>lat:  {truck.location[0]}</span><br/>
                                <span>long:  {truck.location[1]}</span>
                                </td>
                            <td>Rp {truck.cost} / meter</td>
                            <td>
                                <ModalEditTruck chosenTruck={truck} />
                                <button className="btn btn-secondary" onClick={handleDeleteTruck}>Delete</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </>
    )
}
