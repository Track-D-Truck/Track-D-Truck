import React, { useEffect, useState } from 'react'
import {Modal, Button} from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import  {UPDATE_DUMP} from '../store/actions/DumpsAction'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit} from '@fortawesome/free-solid-svg-icons'

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
        <Button className="btn noBorder" variant="primary" onClick={handleShow}
						style={{backgroundColor:"rgb(255 255 255 / 0%)"}}>
        	<FontAwesomeIcon icon={faEdit} color="#212529" size="lg"/>
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
					
          <div className="card modalHeadBackground noBorder shadow mx-auto"> 
						<div className="ml-3 text-white row my-auto">
						<span className="mx-auto">
						<Modal.Title className="font-weight-bold  ml-4">Edit Dump</Modal.Title>
						</span>
                <span>
						<Modal.Header className="noBorder ml-auto mr-4 mt-1 p-0" closeButton>
						</Modal.Header>
						</span>
						</div>
					</div>
					<div className="card modalBackground noBorder shadow  mx-auto" >
          <Modal.Body className="mt-3">

						<form className="mt-2 px-3">
							<div className="form-group row">
								<label for="inputEmail" className="col-sm-3 col-form-label">Name</label>
								<div className="col-sm-9">
									<input type="text" className="form-control noBorder" id="staticEmail" value={dump.name}
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
								<label for="inputType" className="col-sm-3 col-form-label"  style={{width:'200px'}}>Address</label>
								<div className="col-sm-9">
									<input type="text" className="form-control noBorder" id="staticType" value={dump.address}
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
								<label for="inputType" className="col-sm-3 col-form-label">Location</label>
								<div className="col-sm-9">
									<input type="text" className="form-control noBorder" id="staticType" value={dump.location}
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
								<label for="inputCapacity" className="col-sm-3 col-form-label">Volume</label>
								<div className="col-sm-9 form-inline">
									<input type="number" className="form-control noBorder mr-2" id="staticCapacity" 
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
								<label for="inputCapacity" className="col-sm-3 col-form-label">Status</label>
								<div className="col-sm-9">
									<input type="text" className="form-control noBorder" id="staticCapacity" value={dump.status}
										onChange={e => {
												setDump({
														...dump,
														status: e.target.value
												})
											}} />
								</div>
							</div> */}
							<div className="form-group row">
							<label for="inputCapacity" className="col-sm-3 col-form-label">Status</label>
									<form >
											<div className="col-sm-9">
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
					</div>
        </Modal>
      </>
    )
}
