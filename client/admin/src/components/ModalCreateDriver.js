import React, { useState } from 'react'
import {Modal, Button} from 'react-bootstrap'

export default function ModalCreateDriver() {
	const [show, setShow] = useState(false);
	const [driver, setDriver] = useState({
		name: '',
		capacity: '',
		schedule: '',
		type: ''
	})

	// const [name, setName] = useState('')
	// const [capacity, setCapacity] = useState('')
	// const [schedule, setSchedule] = useState('')
	// const [type, setType] = useState('')
  const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	
	
	function handleSubmitDriver(event) {
		event.preventDefault()
		console.log(driver,'<<<<<<<<<<<');
		console.log('masuk')
		setShow(false)
	}

    return (
        <>
        <Button className="btn btn-secondary my-3" variant="primary" onClick={handleShow}>
          Create New
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create driver</Modal.Title>
          </Modal.Header>
          <Modal.Body>

						<form>
							<div className="form-group row">
								<label for="inputEmail" className="col-sm-2 col-form-label">Name</label>
								<div className="col-sm-10">
									<input type="text" className="form-control" id="staticEmail" 
										onChange={e => {
											setDriver({
													...driver,
													name: e.target.value
											})
									}}
										
										/>
								</div>
							</div>
							<div className="form-group row">
								<label for="inputType" className="col-sm-2 col-form-label">Type</label>
								<div className="col-sm-10">
									<input type="text" className="form-control" id="staticType" 
											onChange={e => {
												setDriver({
														...driver,
														type: e.target.value
												})
										}}
									/>
								</div>
							</div>
							<div className="form-group row">
								<label for="inputCapacity" className="col-sm-2 col-form-label">Capacity</label>
								<div className="col-sm-10">
									<input type="number" className="form-control" id="staticCapacity"
										onChange={e => {
												setDriver({
														...driver,
														capacity: e.target.value
												})
											}} />
								</div>
							</div>
							<div className="form-group row">
								<label for="inputSchedule" className="col-sm-2 col-form-label">Schedule</label>
								<div className="col-sm-10">
									<select class="custom-select mr-sm-2" id="inlineFormCustomSelect" onChange={e => {
											setDriver({
													...driver,
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
							</div>

						</form>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick= {handleSubmitDriver}>Submit</Button>
          </Modal.Footer>
        </Modal>
      </>
    )
}
