import React from 'react'
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'

export default function Navbar() {
    const isLogin = useSelector(state => state.userReducer.isLogin)
    return (
        <nav>
            <Link id="logo" to="/">
                <h1>Driver</h1>
            </Link>
            <div>
                {isLogin && <button className="btn-logout">Logout</button>}                
            </div>
        </nav>
    )
}