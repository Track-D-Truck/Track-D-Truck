import React, { useEffect, useState } from 'react'
import {Modal, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import  {UPDATE_TRUCK} from '../store/actions/TrucksActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit} from '@fortawesome/free-solid-svg-icons'

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
        <Button className="btn noBorder " variant="primary" onClick={handleShow}
						style={{backgroundColor:"rgb(255 255 255 / 0%)"}}>
        	<FontAwesomeIcon icon={faEdit} color="#65AE07" size="lg"/>
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
         	<div className="card modalHeadBackground noBorder shadow"> 
						<div className="ml-3 text-white row my-auto">
						<Modal.Title>Edit Truck</Modal.Title>
						<Modal.Header className="noBorder ml-auto mr-4 mt-1 p-0" closeButton>
							
						</Modal.Header>
          	</div>
					</div>
					<div className="card modalBackground noBorder shadow  mx-auto" >
          <Modal.Body className="mt-3">

					<form  className="mt-2 px-3">
						<div className="form-group row">
									<label for="inputEmail" className="col-sm-3 col-form-label">Truck Code</label>
									<div className="col-sm-9">
										<input type="text" readonly disabled className="form-control-plaintext noBorder" id="staticEmail" value={truck.truck_code}/>
									</div>
								</div>

						{/* <div className="form-group row">
							<label for="inputEmail" className="col-sm-3 col-form-label">Status</label>
							<div className="ml-3">
								<select className="custom-select col-sm-9 noBorder form-control"   
									value={truck.status} style={{width:"200px"}}
									onChange={e => {
													setTruck({
															...truck,
															status: e.target.value
													})
											}}  
											>
												<option >Choose...</option>
												<option value="available">Available</option>
												<option value="unavailable">Unavailable</option>
										</select>

							</div>
									</div> */}

								<div className="form-group row">
									<label for="inputType" className="col-sm-3 col-form-label">Capacity</label>
									<div className="col-sm-9 form-inline">
										<input type="number" className="form-control mr-2 noBorder" id="staticType" 
											onChange={e => {
												setTruck({
														...truck,
														capacity: e.target.value
												})
										}}  
										value={truck.capacity}  style={{width:'100px'}}
										/><span style={{fontSize:"17px"}}>/m³</span>
									</div>
								</div>
								
								<div className="form-group row">
									<label for="inputEmail" className="col-sm-2 col-form-label">Cost</label>
									<div className="col-sm-10 form-inline"><span style={{fontSize:"17px"}}>Rp</span>
										<input type="text" className="form-control noBorder mx-2" id="staticEmail" value={truck.cost}
											onChange={e => {
												setTruck({
														...truck,
														cost: e.target.value
												})
										}}
											
											/><span style={{fontSize:"17px"}}>/ meter</span>
									</div>
								</div>
								
								<div className="form-group row">
									<label for="inputType" className="col-sm-3 col-form-label pr-0">Coordinate</label>
									<div className="col-sm-9">
										<input type="text" className="form-control noBorder" id="staticType" value={truck.location}
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
{/* 
						<div className="form-group row">
							<label for="inputSchedule" className="col-sm-3 col-form-label">Driver</label>
							<div className="col-sm-9">
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
						</div> */}

          </Modal.Body>
          <Modal.Footer>
            <Button className="noBorder" style={{backgroundColor: "#65AE07"}}  onClick= {handleSubmitTruck}>Update</Button>
          </Modal.Footer>
					</div>
        </Modal>
      </>
    )
}