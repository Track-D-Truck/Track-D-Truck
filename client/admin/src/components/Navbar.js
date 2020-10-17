import React from 'react'
import { Link, useHistory } from "react-router-dom"

export default function Navbar() {
	const history = useHistory()
	function logout() {
		history.push('/login')
	}
	
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
					<Link className="navbar-brand" to="/">Track D'Truck</Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
							<ul className="navbar-nav">
							<li className="nav-item active">
									<Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
							</li>
							<li className="nav-item">
									<Link className="nav-link" to="/login">Login</Link>
							</li>
							<li className="nav-item">
									<Link className="nav-link" to="/report">Report</Link>
							</li>
							{/* <li className="nav-item">
									<a className="nav-link" href="#">Pricing</a>
							</li>
							<li className="nav-item">
									<a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
							</li> */}
							</ul>
							<button className="ml-auto btn btn-secondary" onClick={logout}>
								Logout
							</button>
					</div>
    		</nav>
    )
}
