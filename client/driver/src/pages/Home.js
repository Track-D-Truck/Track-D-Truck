import React from 'react'
import Table from '../components/Table'

export default function Home(params) {
    return (
        <div className="flex-center section">
            <div className="flex-center" style={{ flexDirection: 'column'}}>
                <div className="header">
                    <h3>Garbage Dump List</h3>
                </div>
                <div>
                    <Table/>
                </div>
            </div>
        </div>
    )
}