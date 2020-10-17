import React, { useEffect, useState } from 'react'

export default function TableTruckRecap() {
    const [dummyTrucks, setDummyTrucks] = useState([])

    useEffect(() => {
        setDummyTrucks([
            {code: 'Truck_02', status: 'Available', driver: 'Mang Jajang'},
            {code: 'Truck_03', status: 'Maintenance', driver: 'Mang Udin'},
            {code: 'Truck_04', status: 'Available', driver: 'Mang Acep'}
        ])
    }, [])

    return (
        <table className="table table-striped text-center">
            <thead>
                <tr>
                <th scope="col">Truck Code</th>
                <th scope="col">Status</th>
                <th scope="col">Driver</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">Truck_01</th>
                    <td>Available</td>
                    <td>Mang Oleh</td>
                </tr>
                {dummyTrucks.map((truck,i) => {
                    return(
                        <tr key={i}>
                            <th scope="row">{truck.code}</th>
                            <td>{truck.status}</td>
                            <td>{truck.driver}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
