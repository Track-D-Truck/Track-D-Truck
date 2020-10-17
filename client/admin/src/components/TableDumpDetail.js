import React from 'react'
// import { Link } from "react-router-dom"

import ModalEditDump from './ModalEditDump'

export default function TableDumpDetail() {

 function handleDeleteTruck() {
  // const filtered = dummyTrucks.filter( e => e.code !== truck.code)
  // setDummyTrucks(filtered)
}

  return (
    <div className="flex-center section">
        <div className="flex-center" style={{ flexDirection: 'column'}}>
            <div className="header">
                <h3>Garbage Dump List</h3>
            </div>
            <div style={{ width: '100%', float: 'right', display: 'flex', alignItems: 'start', marginBottom: '10px'}}>
            </div>
            <div>
              <table className="table text-center thead-bg rounded-shadow">
                <thead className='trucklist'>
                    <tr>
                      <th>ID</th>
                      <th>Location</th>
                      <th>Volume</th>
                      <th>Pick up schedule</th>
                      <th>Action</th>
                    </tr>
                </thead>
                <tbody  style={{backgroundColor:'#FFF8CD'}}>
                    <tr>
                      <td>01</td>
                      <td>Jl. Asia Afrika ...</td>
                      <td>3 m3</td>
                      <td>Monday, Tuesday</td>
                      <td><button className="btn btn-secondary">Detail</button> 
                        <ModalEditDump/> 
                        <button className="btn btn-secondary"  onClick={handleDeleteTruck}>Delete</button></td>
                    </tr>
                </tbody>
              </table>
            </div>
        </div>
    </div>
  )
}

