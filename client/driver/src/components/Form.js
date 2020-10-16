import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { loginAccount } from '../store/actions/userAction'

export default function Form(props) {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            history.goBack()
        }
    }, [history])

    const login = e => {
        e.preventDefault()
        dispatch(loginAccount(userData))
    }

    return (
        <div>
            <div className="flex-center section">
                <div className="login-form-container rounded-shadow yellow-background" style={{display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', height: '400px', width: '400px'}}>
                    <div className="header" style={{ paddingTop: '50px'}}>
                        <h3>Welcome</h3>
                    </div>
                    <form className="flex-center" style={{flexDirection: 'column'}} onSubmit={login}>
                        <input className="rounded-shadow form-input"
                        type="text"
                        placeholder="Email"
                        value={userData.email}
                        onChange={e => {
                            setUserData({
                                ...userData,
                                email: e.target.value
                            })
                        }}/>
                        <input className="rounded-shadow form-input"
                        type="password"
                        placeholder="Password"
                        value={userData.password}
                        onChange={e => {
                            setUserData({
                                ...userData,
                                password: e.target.value
                            })
                        }}/>
                        <button className="btn-login">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}