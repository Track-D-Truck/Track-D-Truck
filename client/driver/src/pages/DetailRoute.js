import React from 'react'
import { useHistory } from 'react-router-dom'

export default function DetailRoute(params) {
    const history = useHistory()
    return (
        <div className="flex-center section">
            <div className="flex-center" style={{ flexDirection: 'column'}}>
                <div className="header">
                    <h3>Detail Route</h3>
                </div>
                <div>
                    <div style={{ height: '500px', width: '500px', backgroundColor: 'yellow'}}>Gambar Maps</div>
                </div>
                <div className="btn-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <button className="btn-go">Go</button>
                    <button className="btn-back" onClick={() => { history.push('/')}}>Back</button>
                </div>
            </div>
        </div>
    )
}