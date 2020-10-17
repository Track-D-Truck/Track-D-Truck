import React from 'react'
import { Link } from "react-router-dom"

export default function GarbageDump() {
    return (
        <div className="flex-center section">
            <div className="flex-center" style={{ flexDirection: 'column'}}>
                <div className="header">
                    <h3>Garbage Dump List</h3>
                </div>
                <div style={{ width: '100%', float: 'right', display: 'flex', alignItems: 'start', marginBottom: '10px'}}>
                    <Link className="btn btn-login" style={{ backgroundColor: '#95A5A6', textDecoration: 'none'}} to="/garbagedump/add">Add New</Link>
                </div>
                <div>
                    <table className="rounded-shadow">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Location</th>
                                <th>Volume</th>
                                <th>Pick up schedule</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>01</td>
                                <td>Jl. Asia Afrika ...</td>
                                <td>3 m3</td>
                                <td>Monday, Tuesday</td>
                                <td><button className="btn-route">Detail</button> <button className="btn-update">Edit</button> <button className="btn-back">Delete</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}