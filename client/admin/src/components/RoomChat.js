import React, { useState } from 'react'
import {Modal, Button} from 'react-bootstrap'

export default function RoomChat() {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)
  const [roomchats, setRoomChats] = useState([])
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState('')
  const username = 'bambang'//localStorage.name

  function handleSubmitChat(event) {
    event.preventDefault()
    const temp = {name: username, message: message}
    setChat(temp)
    setRoomChats([...roomchats, chat])
    setMessage('')
  }
  
  return (
    <>
    <Button className="btn noBorder mr-2" variant="primary" onClick={handleShow}
        style={{backgroundColor:"rgb(255 255 255 / 0%)"}}>
      CHAT{/* <FontAwesomeIcon icon={faEdit} color="#212529" size="lg"/> */}
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
						<Modal.Title className="font-weight-bold  ml-4">..Sender Name..</Modal.Title>
						</span>
                <span>
						<Modal.Header className="noBorder ml-auto mr-4 mt-1 p-0" closeButton>
						</Modal.Header>
						</span>
						</div>
					</div>
					<div className="card modalBackground noBorder shadow  mx-auto" >
          <Modal.Body className="mt-3" >
          <div className="card ">

          </div>
          </Modal.Body>
          <Modal.Footer>
            <label style={{width:'200px'}}></label>
            <form>
            <input style={{width:'380px'}} value={message} placeholder="send message" onChange={e => {
												setMessage(e.target.value)
										}}  ></input>

            </form>
              <Button onClick={handleSubmitChat} className="noBorder ml-2" id="greenColor">Send</Button>
          </Modal.Footer>
					</div>
        </Modal>
      </>
  )
}
