import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from "react-router-dom";

import Loading from './Loading'
import {LOGIN_USER} from '../store/actions/UserAction'
export default function FormLogin() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const loading = useSelector(state => state.DriverReducer.loadingStatus)
    const getUser = useSelector(state => state.UserReducer.user)
    if (loading) return <Loading/>
    if (getUser) history.push('/')
    
    function handleSubmitLogin(event) {
        event.preventDefault()
        dispatch(LOGIN_USER(user))
    }

    return (
        <form onSubmit={handleSubmitLogin} className="align-self-center pt-5 mt-5 mx-auto" style={{width:"30%"}}>
            <div className="form-group">
                
                <input type="email" required className="form-control"  placeholder="Email..." 
                onChange={e => {
                    setUser({
                        ...user,
                        email: e.target.value
                    })
                }}/>
            </div>
            <div className="form-group">
                <input type="password" required className="form-control" placeholder="Password..."
                onChange={e => {
                    setUser({
                        ...user,
                        password: e.target.value
                    })
                }}/>
            </div>
            <button className="btn noBorder"  style={{backgroundColor:"#27ae60", fontWeight:'bold', color:"white"}}>Login</button>
        </form>
    )
}
