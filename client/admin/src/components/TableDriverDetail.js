import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'

import ModalEditTruck from './ModalEditTruck'
import Loading from './Loading'
import {FETCH_DRIVERS, SET_DRIVERS, DELETE_DRIVER, UPDATE_DRIVERS} from '../store/actions/DriversAction'
import {UPDATE_TRUCK, FETCH_TRUCKS} from '../store/actions/TrucksActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash} from '@fortawesome/free-solid-svg-icons'

export default function TableDriverDetail() {
    const dispatch = useDispatch()
    // const [dummyTrucks, setDummyTrucks] = useState([])
    useEffect(() => {
			if(trucks.length == 0  || drivers.length == 0) {
				dispatch(FETCH_TRUCKS())
				dispatch(FETCH_DRIVERS())
		}
    }, [] )
    const drivers = useSelector(state => state.DriverReducer.drivers)
    const loading = useSelector(state => state.DriverReducer.loadingStatus)
    const trucks = useSelector(state => state.TruckReducer.trucks)
		// console.log(trucks);
    if (loading) return <Loading/>

    return (
			<div className="p-5">
				<div className="card tableHeadBackground mx-auto noBorder shadow-sm"> 
					<div className="ml-3 text-white mx-auto">
					{/* <FontAwesomeIcon icon={['fas', 'Coffee']} /> */}
							<h2 className="mb-0 mt-1 font-weight-bold">Drivers List</h2>
							{/* <p class="font-weight-lighter font-italic">Table Driver</p> */}

					</div>
				</div>
				<div className="card tableBackground noBorder shadow" >
				<table className="table text-center mt-4 ">
							<thead className='table-borderless abuColor'  style={{fontWeight:'bold', fontSize:'1.2em'}} >
							<tr> 
									<th scope="col">ID</th>
									<th scope="col">Name</th>
									<th scope="col">Email</th>
									<th scope="col">Phone</th>
									<th scope="col">Status</th>
									<th scope="col">Action</th>
							</tr>
							</thead>
							<tbody>
									{drivers.map((driver,i) => {
											const  driverTruck = trucks.filter(truck => truck.DriverId == driver.id)
											
											function handleDeleteTruck() {
												Swal.fire({
													title: 'Are you sure?',
													icon: 'warning',
													showCancelButton: true,
													confirmButtonColor: '#27ae60',
													cancelButtonColor: '#d33',
													confirmButtonText: 'Yes, delete it!',
													}).then((result) => {
													if (result.isConfirmed) {
															Swal.fire(
															'Your data has been deleted!',
																	'',
															'success'
															)
															dispatch(DELETE_DRIVER(driver.id))
															const filtered = drivers.filter( e => e.id !== driver.id)
															dispatch(SET_DRIVERS(filtered))
													}
												})

											}

											function handleUpdateStatus(event) {
												let changedStatus = event.target.value
												// console.log(driverTruck,'kok gabisa');
												dispatch(UPDATE_DRIVERS({status: changedStatus}, driver.id))
													// console.log(changedStatus);
													driverTruck[0].DriverId = null
													driverTruck[0].Driver = null
													driverTruck[0].location = driverTruck[0].location.join()
													dispatch(UPDATE_TRUCK(driverTruck[0], driverTruck[0].id))
											}
													
											return(
													<tr key={i}>
															<th scope="row abuColor">{driver.id - 1}</th>
															<td>{driver.name}</td>
															<td>{driver.email}</td>
															<td>{driver.phone}</td>
															{/* <td>{driver.status}</td> */}
															<td>  <div className="form-group row my-0 ml-2 noBorder">
																	<form className="mx-auto noBorder" >
																			<div className="col-sm-10 noBorder">
																					<select className="custom-select mr-sm-2 noBorder"  
																							value={driver.status} onChange={handleUpdateStatus}>
																									<option disabled>Choose...</option>
																									<option value="available">Available</option>
																									<option value="unavailable" disabled>Unavailable</option>
																							</select>
																			</div>
																	</form>
								</div></td>
															<td>
																	{/* <button className="btn btn-secondary">Detail</button> */}
																	{/* <ModalEditTruck/> */}
																	<button className="btn noBorder" onClick={handleDeleteTruck}>
																	<FontAwesomeIcon icon={faTrash} color="#212529" className="" size="lg"/>
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
