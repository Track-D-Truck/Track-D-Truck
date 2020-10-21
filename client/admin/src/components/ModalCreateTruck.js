import React, { useState } from 'react'
import {Modal, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import {CREATE_TRUCK} from '../store/actions/TrucksActions'



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus} from '@fortawesome/free-solid-svg-icons'

export default function ModalCreateTruck() {
	const [show, setShow] = useState(false);
	const dispatch = useDispatch()
	const getCurrentTrucks = useSelector(state => state.TruckReducer.trucks)
	
	const currentTrucks = getCurrentTrucks[getCurrentTrucks.length-1]
	let currentTruckID
	if(currentTrucks) currentTruckID = currentTrucks.id 
	const nextTrucks = `truck-${currentTruckID+1}`

	const [truck, setTruck] = useState({
		truck_code: '',
		capacity: '',
		cost: '',
		status: '',
		location: ''
	})

  const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	
	
	function handleSubmitTruck(event) {
		event.preventDefault()
		// truck.truck_code = 'bambang' // nextTrucks
		// truck.location = '-6.86666, 107.60000' // pool truck
		truck.status = 'available'
		dispatch(CREATE_TRUCK(truck))
		setShow(false)
	}

    return (
        <>
        	<Button className="btn ml-auto mr-4 mt-1" 
					style={{backgroundColor:"rgb(255 255 255 / 0%)", fontWeight:"bold", borderColor:"white"}}
					variant="primary" onClick={handleShow}>
         <FontAwesomeIcon icon={faPlus} color="white"/>
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
					<div className="card modalHeadBackground noBorder shadow"> 
						<div className="ml-3 text-white row my-auto">
						<Modal.Title>Create Truck</Modal.Title>
						<Modal.Header className="noBorder ml-auto mr-4 mt-1 p-0" closeButton>
							
						</Modal.Header>
                {/* <h2 className="mb-0 mt-1">Trucks List</h2>
                <ModalCreateTruck/> */}
						</div>
					</div>
					<div className="card modalBackground noBorder shadow  mx-auto" >
          <Modal.Body className="mt-3">
								
						<form className="mt-2 px-3">
							{/* <div className="form-group row">
								<label for="inputEmail" className="col-sm-2 col-form-label">Truck Code</label>
								<div className="col-sm-10">
									<input type="text" readonly className="form-control-plaintext" id="staticEmail" value={nextTrucks}/>
								</div>
							</div> */}
							<div className="form-group row">
								<label for="inputType" className="col-sm-3 col-form-label">Truck Code</label>
								<div className="col-sm-9 pr-5">
									<input type="text" className="form-control noBorder" id="staticType" 
											onChange={e => {
												setTruck({
														...truck,
														truck_code: e.target.value
												})
										}}
									/>
								</div>
							</div>
							
							<div className="form-group row">
								<label for="inputType" className="col-sm-3 col-form-label">Capacity</label>
								<div className="col-sm-9 form-inline">
									<input type="number" className="form-control mr-3 noBorder" id="staticType" 
											onChange={e => {
												setTruck({
														...truck,
														capacity: e.target.value
												})
										}} 
									/> <span style={{fontSize:"17px"}}>/m³</span>
								</div>
							</div>

							<div className="form-group row">
								<label for="inputCapacity" className="col-sm-2 col-form-label ">Cost</label>
									<div className="col-sm-10 form-inline"><span style={{fontSize:"17px"}}>Rp</span>
									<input type="number" className="form-control mx-3 noBorder" id="staticCapacity" style={{width:'100px'}}
										onChange={e => {
												setTruck({
														...truck,
														cost: e.target.value
												})
											}}/> <span style={{fontSize:"17px"}}>/ meter</span>
								</div>
							</div>
							{/* <div className="form-group row">
								<label for="inputSchedule" className="col-sm-2 col-form-label">Schedule</label>
								<div className="col-sm-10">
									<select class="custom-select mr-sm-2" id="inlineFormCustomSelect" onChange={e => {
											setTruck({
													...truck,
													schedule: e.target.value
											})
										}} >
											<option selected>Choose...</option>
											<option value="Sunday">Sunday</option>
											<option value="Monday">Monday</option>
											<option value="Tuesday">Tuesday</option>
											<option value="Wednesday">Wednesday</option>
											<option value="Thursday">Thursday</option>
											<option value="Friday">Friday</option>
											<option value="Saturday">Saturday </option>
										</select>
								</div>
							</div> */}

						</form>

          </Modal.Body>
          <Modal.Footer>
            <Button className="noBorder" style={{backgroundColor: "#65AE07"}} onClick= {handleSubmitTruck}>Submit</Button>
          </Modal.Footer>
					</div>

        </Modal>
      </>
    )
}
