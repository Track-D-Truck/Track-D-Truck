import React, { useEffect, useState } from 'react'
import {Modal, Button} from 'react-bootstrap'


export default function ModalEditTruck(props) {
  const [show, setShow] = useState(false)
	const chosenTruck = props.chosenTruck
	
	const [truck, setTruck] = useState({
		truck_code: '',
		capacity: '',
		cost: '',
		status: '',
		location: ''
	})
  const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	
	useEffect(()=> {
		setTruck({
		truck_code: chosenTruck.truck_code,
		capacity: chosenTruck.capacity,
		cost: chosenTruck.cost,
		status: chosenTruck.status,
		location: chosenTruck.location,
		})
	}, [])

	function handleSubmitTruck(event) {
		event.preventDefault()
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

          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick= {handleSubmitTruck}>Update</Button>
          </Modal.Footer>
        </Modal>
      </>
    )
}