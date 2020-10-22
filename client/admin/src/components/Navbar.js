import React from 'react'
import { Link, useHistory } from "react-router-dom"

import RoomChat from './RoomChat'
export default function Navbar() {
	const history = useHistory()
	
	function logout() {
		localStorage.clear()
		history.push('/login')
	}
	
    return (
        <nav className="navbar navbar-expand-lg navbar-light" >
					<Link className="navbar-brand" to="/" style={{color:'white', fontSize:'1.4em', fontWeight: 'bold'}}>Track D'Truck</Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav" >
							<ul className="navbar-nav" >
								<li className={history.location.pathname == '/trucks' ? 'nav-item active' : 'nav-item'}>
										<Link className="nav-link" to="/trucks">Trucks</Link>
								</li>
								{/* <li className="nav-item">
										<Link className="nav-link" to="/login">Login</Link>
								</li> */}
								<li className={history.location.pathname == '/dumps' ? 'nav-item active' : 'nav-item'}>
										<Link className="nav-link" to="/dumps">Dumps </Link>
								</li>
								<li className={history.location.pathname == '/drivers' ? 'nav-item active' : 'nav-item'}>
										<Link className="nav-link" to="/drivers">Drivers</Link>
								</li>
								<li className={history.location.pathname == '/report' ? 'nav-item active' : 'nav-item'}>
										<Link className="nav-link" to="/report">Report</Link>
								</li>
							</ul>
							<span className="ml-auto">
							{/* <RoomChat/> */}
							<button className=" btn btn-secondary" id="borderButton" onClick={logout}>
								Logout
							</button>
							</span>
					</div>
    		</nav>
    )

		// <ul class="navbar-nav mr-auto">
		// <li class="nav-item active">
		// 	<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
		// </li>
		// <li class="nav-item">
		// 	<a class="nav-link" href="#">Link</a>
		// </li>
			}
