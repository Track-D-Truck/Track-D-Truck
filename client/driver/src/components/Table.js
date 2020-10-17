import React from 'react'
import { useHistory } from 'react-router-dom'

export default function Table(params) {
    const history = useHistory()
    return (
        <div>
            <table className="rounded-shadow">
                <thead>
                    <tr>
                        <th>Garbage Dump</th>
                        <th>Location</th>
                        <th>Volume</th>
                        <th>Progress</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>TPS-01</td>
                        <td>Jl. Asia Afrika ...</td>
                        <td>3 m3</td>
                        <td style={{color: '#2ECC71'}}>Done</td>
                        <td><button className="btn-route" onClick={() => {history.push('/route')}}>Route</button> <button className="btn-update" style={{ backgroundColor: '#95A5A6'}} disabled={true}>Update</button></td>
                    </tr>
                    <tr>
                        <td>TPS-02</td>
                        <td>Jl. Setiabudi</td>
                        <td>4 m3</td>
                        <td style={{color: '#F1C40F'}}>On Going</td>
                        <td><button className="btn-route" onClick={() => {history.push('/route')}}>Route</button> <button className="btn-update">Update</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}