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
        <div className="card loginBg noBorder py-4 mt-5 shadow mx-auto" style={{width:'350px'}}>
            <h1 className="font-weight-bold text-center" style={{color:'#27ae60'}}>Login</h1>
            <form onSubmit={handleSubmitLogin} className="align-self-center mx-auto my-2">
                <div className="form-group">
                    
                    <input type="email" required className="form-control my-3"  
                        style={{width:'250px', borderBottom: '3px solid #27ae60 !important',
                        borderRadius: 0}} placeholder="Email..." 
                    onChange={e => {
                        setUser({
                            ...user,
                            email: e.target.value
                        })
                    }}/>
                </div>
                <div className="form-group">
                    <input type="password" required className="form-control my-3" placeholder="Password..."
                    onChange={e => {
                        setUser({
                            ...user,
                            password: e.target.value
                        })
                    }}/>
                </div>
                <button className="btn noBorder"  style={{backgroundColor:"#27ae60", fontWeight:'bold', color:"white"}}>Login</button>
            </form>
        </div>
    )
}
