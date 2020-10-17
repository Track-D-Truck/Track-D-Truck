import React, { useEffect, useState } from 'react'

import ModalEditTruck from './ModalEditTruck'

export default function TableTruckDetail() {
    const [dummyTrucks, setDummyTrucks] = useState([])

    useEffect(() => {
        setDummyTrucks([
            {code: 'Truck_01', status: 'Maintenance', capacity: '2 Ton', cost: '100.000'},
            {code: 'Truck_05', status: 'Available', capacity: '3 Ton', cost: '50.000'},
            {code: 'Truck_02', status: 'Available', capacity: '3 Ton', cost: '50.000'},
            {code: 'Truck_03', status: 'Maintenance', capacity: '2 Ton', cost: '100.000'},
            {code: 'Truck_04', status: 'Available', capacity: '3 Ton', cost: '50.000'}
        ])
    }, [] )
    
    return (
        <table className="table text-center thead-bg">
            <thead className='trucklist'>
            <tr>
                <th scope="col">Truck Code</th>
                <th scope="col">Cost</th>
                <th scope="col">Capacity</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody style={{backgroundColor:'#FFF8CD'}}>
                {dummyTrucks.map((truck,i) => {
                    function handleDeleteTruck() {
                        const filtered = dummyTrucks.filter( e => e.code !== truck.code)
                        setDummyTrucks(filtered)
                    }
                    return(
                        <tr key={i}>
                            <th scope="row">{truck.code}</th>
                            <td>{truck.status}</td>
                            <td>{truck.capacity}</td>
                            <td>{truck.cost}</td>
                            <td>
                                <button className="btn btn-secondary">Detail</button>
                                <ModalEditTruck/>
                                <button className="btn btn-secondary" onClick={handleDeleteTruck}>Delete</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
