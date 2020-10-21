import React, { useState } from 'react'
import {Modal, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import {CREATE_DUMP} from '../store/actions/DumpsAction'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus} from '@fortawesome/free-solid-svg-icons'

export default function ModalCreateDump() {
	const dispatch = useDispatch()
	const [show, setShow] = useState(false)
	const [dump, setDump] = useState({
		name: '',
		location: '',
		status: '',
		volume: '',
		address: ''
	})

  const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	
	
	function handleSubmitDump(event) {
		event.preventDefault()
		// dump.location = dump.location.join()
		dump.status = 'inactive'
		console.log(dump,'<<<<<<<<<');
		dispatch(CREATE_DUMP(dump))
		setShow(false)
	}

    return (
        <>
				<Button className="btn ml-auto mr-4 mt-1" 
					style={{backgroundColor:"rgb(255 255 255 / 0%)", fontWeight:"bold", borderColor:"white", borderWidth:"2px"}}
					variant="primary" onClick={handleShow}
					>
         <FontAwesomeIcon icon={faPlus} color="white"/>
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
			<div className="card modalHeadBackground noBorder shadow mx-auto"> 
						<div className=" text-white row my-auto" >
						<span className="mx-auto">
						<Modal.Title className="font-weight-bold  ml-5">Create Dump</Modal.Title>
						</span>
                <span>
						<Modal.Header className="noBorder ml-auto mr-4 mt-1 p-0" closeButton>
						</Modal.Header>
						</span>
                {/* <h2 className="mb-0 mt-1">Trucks List</h2>
                <ModalCreateTruck/> */}
						</div>
					</div>
					<div className="card modalBackground noBorder shadow  mx-auto" >
          <Modal.Body className="mt-3">

						<form className="mt-2 px-3">
							<div className="form-group row">
								<label for="inputEmail" className="col-sm-3 col-form-label">Name</label>
								<div className="col-sm-9">
									<input type="text" className="form-control noBorder" id="staticEmail" 
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
									<input type="text" className="form-control noBorder" id="staticType" 
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
								<label for="inputType" className="col-sm-3 col-form-label">Coordinate</label>
								<div className="col-sm-9">
									<input type="text" className="form-control noBorder" id="staticType" 
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
										onChange={e => {
												setDump({
														...dump,
														volume: e.target.value
												})
											}} /><span style={{fontSize:"17px"}}>/m³</span>
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
					</div>
        </Modal>
      </>
    )
}
