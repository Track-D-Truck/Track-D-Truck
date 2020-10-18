import React, { useEffect, useState } from 'react'
import {Modal, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import  {UPDATE_TRUCK} from '../store/actions/TrucksActions'

export default function ModalEditTruck(props) {
	const dispatch = useDispatch()
	const [show, setShow] = useState(false)
	const chosenTruck = props.chosenTruck
	const [truck, setTruck] = useState({
		truck_code: '',
		capacity: '',
		cost: '',
		status: '',
		location: '',
		Driver: ''
	})
  const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const drivers = useSelector(state => state.DriverReducer.drivers)

	useEffect(()=> {
		setTruck({
		truck_code: chosenTruck.truck_code,
		capacity: chosenTruck.capacity,
		cost: chosenTruck.cost,
		status: chosenTruck.status,
		location: chosenTruck.location,
		})
	}, [setTruck])



	function handleSubmitTruck(event) {
		event.preventDefault()
		truck.location = truck.location.join()
		dispatch(UPDATE_TRUCK(truck, chosenTruck.id))
		setShow(false)
    }
    
    return (
        <>
        <Button className="btn btn-secondary my-3 mx-2" variant="primary" onClick={handleShow}>
          Edit
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Truck</Modal.Title>
          </Modal.Header>
          <Modal.Body>

					<form>
						<div className="form-group row">
									<label for="inputEmail" className="col-sm-2 col-form-label">Truck Code</label>
									<div className="col-sm-10">
										<input type="text" readonly className="form-control-plaintext" id="staticEmail" value={truck.truck_code}/>
									</div>
								</div>

								<div className="form-group row">
									<label for="inputType" className="col-sm-2 col-form-label">Capacity</label>
									<div className="col-sm-10">
										<input type="number" className="form-control" id="staticType" 
											onChange={e => {
												setTruck({
														...truck,
														capacity: e.target.value
												})
										}}  
										value={truck.capacity}
										/>
									</div>
								</div>
								
								<div className="form-group row">
									<label for="inputEmail" className="col-sm-2 col-form-label">Cost</label>
									<div className="col-sm-10">
										<input type="text" className="form-control" id="staticEmail" value={truck.status}
											onChange={e => {
												setTruck({
														...truck,
														status: e.target.value
												})
										}}
											
											/>
									</div>
								</div>
								
								<div className="form-group row">
									<label for="inputType" className="col-sm-2 col-form-label">Location</label>
									<div className="col-sm-10">
										<input type="text" className="form-control" id="staticType" value={truck.location}
												onChange={e => {
													setTruck({
															...truck,
															location: e.target.value
													})
											}}
										/>
									</div>
								</div>
						</form>

						<div className="form-group row">
							<label for="inputSchedule" className="col-sm-2 col-form-label">Driver</label>
							<div className="col-sm-10">
								<select class="custom-select mr-sm-2" id="inlineFormCustomSelect" onChange={e => {
										setTruck({
												...truck,
												Driver: e.target.value
										})
									}} >
										<option selected>Choose...</option>
										{ drivers.map((driver) => {
											return(
												<option value={driver.name}>{driver.id} - {driver.name}</option>
											)
										})}
									</select>
							</div>
						</div>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick= {handleSubmitTruck}>Update</Button>
          </Modal.Footer>
        </Modal>
      </>
    )
}