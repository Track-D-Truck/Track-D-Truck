import React, { useState } from 'react'
import {Modal, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import {CREATE_DUMP} from '../store/actions/DumpsAction'

export default function ModalCreateDump() {
	const dispatch = useDispatch()
	const [show, setShow] = useState(false)
	const [dump, setDump] = useState({
		name: '',
		location: '',
		status: '',
		volume: ''
	})

  const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	
	
	function handleSubmitDump(event) {
		event.preventDefault()
		// dump.location = dump.location.join()
		dump.status = 'inactive'
		dispatch(CREATE_DUMP(dump))
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
            <Modal.Title>Create Dump</Modal.Title>
          </Modal.Header>
          <Modal.Body>

						<form>
							<div className="form-group row">
								<label for="inputEmail" className="col-sm-2 col-form-label">Name</label>
								<div className="col-sm-10">
									<input type="text" className="form-control" id="staticEmail" 
										onChange={e => {
											setDump({
													...dump,
													name: e.target.value
											})
									}}
										
										/>
								</div>
							</div>
							<div className="form-group row">
								<label for="inputType" className="col-sm-2 col-form-label">Location</label>
								<div className="col-sm-10">
									<input type="text" className="form-control" id="staticType" 
											onChange={e => {
												setDump({
														...dump,
														location: e.target.value
												})
										}}
									/>
								</div>
							</div>
							<div className="form-group row">
								<label for="inputCapacity" className="col-sm-2 col-form-label">Volume</label>
								<div className="col-sm-10">
									<input type="number" className="form-control" id="staticCapacity"
										onChange={e => {
												setDump({
														...dump,
														volume: e.target.value
												})
											}} />
								</div>
							</div>

							{/* <div className="form-group row">
								<label for="inputCapacity" className="col-sm-2 col-form-label">Status</label>
								<div className="col-sm-10">
									<input type="number" className="form-control" id="staticCapacity"
										onChange={e => {
												setDump({
														...dump,
														status: e.target.value
												})
											}} />
								</div>
							</div> */}

							{/* <div className="form-group row">
								<label for="inputSchedule" className="col-sm-2 col-form-label">Schedule</label>
								<div className="col-sm-10">
									<select class="custom-select mr-sm-2" id="inlineFormCustomSelect" onChange={e => {
											setDump({
													...dump,
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
            <Button variant="primary" onClick= {handleSubmitDump}>Submit</Button>
          </Modal.Footer>
        </Modal>
      </>
    )
}
