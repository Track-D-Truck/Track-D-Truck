import React, { useEffect, useState } from 'react'
import {Modal, Button} from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import  {UPDATE_DUMP} from '../store/actions/DumpsAction'

export default function ModalEditDump(props) {
	const dispatch = useDispatch()
	const [show, setShow] = useState(false);
	const chosenDump = props.chosenDump
	const [dump, setDump] = useState({
		name: '',
		location: '',
		volume: '',
		status: '',
		address: ''
	})

	useEffect(()=> {
		setDump({
			name: chosenDump.name,
			location: chosenDump.location,
			volume: chosenDump.volume,
			status: chosenDump.status,
			address: chosenDump.address
		})
	}, [])

  const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	
	
	function handleSubmitDump(event) {
		event.preventDefault()
		dump.location = dump.location.join()
		dispatch(UPDATE_DUMP(dump, chosenDump.id))
		setShow(false)
	}

    return (
        <>
        <Button className="btn btn-secondary mx-3" variant="primary" onClick={handleShow}>
          Edit
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
					
          <Modal.Header closeButton>
            <Modal.Title>Edit Dump</Modal.Title>
          </Modal.Header>
          <Modal.Body>

						<form>
							<div className="form-group row">
								<label for="inputEmail" className="col-sm-2 col-form-label">Name</label>
								<div className="col-sm-10">
									<input type="text" className="form-control" id="staticEmail" value={dump.name}
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
								<label for="inputType" className="col-sm-2 col-form-label">Address</label>
								<div className="col-sm-10">
									<input type="text" className="form-control" id="staticType" value={dump.address}
											onChange={e => {
												setDump({
														...dump,
														address: e.target.value
												})
										}}
									/>
								</div>
							</div>


							<div className="form-group row">
								<label for="inputType" className="col-sm-2 col-form-label">Location</label>
								<div className="col-sm-10">
									<input type="text" className="form-control" id="staticType" value={dump.location}
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
								<div className="col-sm-10 form-inline">
									<input type="number" className="form-control mr-2" id="staticCapacity" 
										value={dump.volume} style={{width:'100px'}}
										onChange={e => {
												setDump({
														...dump,
														volume: e.target.value
												})
											}} /> <span style={{fontSize:"17px"}}>/m³</span>
								</div>
							</div>

							{/* <div className="form-group row">
								<label for="inputCapacity" className="col-sm-2 col-form-label">Status</label>
								<div className="col-sm-10">
									<input type="text" className="form-control" id="staticCapacity" value={dump.status}
										onChange={e => {
												setDump({
														...dump,
														status: e.target.value
												})
											}} />
								</div>
							</div> */}
							<div className="form-group row">
							<label for="inputCapacity" className="col-sm-2 col-form-label">Status</label>
									<form >
											<div className="col-sm-10">
													<select className="custom-select mr-sm-2" id="inlineFormCustomSelect" 
															value={dump.status} onChange={e => {
																setDump({
																		...dump,
																		status: e.target.value
																})
															}}>
																	<option value=''>Choose...</option>
																	<option value="active">Active</option>
																	<option value="inactive">Inactive</option>
															</select>
											</div>
									</form>
							</div>

							{/* <div className="form-group row">
								<label for="inputSchedule" className="col-sm-2 col-form-label">Status</label>
								<div className="col-sm-10">
									<select class="custom-select mr-sm-2" id="inlineFormCustomSelect" value={dump.status}
									onChange={e => {
											setDump({
													...dump,
													status: e.target.value
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
