import React from 'react'
import {useHistory} from "react-router-dom";
    
export default function FormLogin() {
    const history = useHistory()
    
    function handleSubmitLogin(event) {
        event.preventDefault()
        history.push(`/`);
    }
    return (
        <form onSubmit={handleSubmitLogin} className="align-self-center">
            <div className="form-group">
                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Email..."/>
            </div>
            <div className="form-group">
                <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Password..."/>
            </div>
            <button className="btn"  style={{backgroundColor:"#A8DDA8", fontWeight:'bold', color:"white"}}>Login</button>
        </form>
    )
}
