import React from 'react'
// import { useHistory } from 'react-router-dom'

import TableTruckDetail from '../components/TableTruckDetail'
import ModalCreateTruck from '../components/ModalCreateTruck'
import Navbar from '../components/Navbar' 
export default function TrucksPage() {
    // const history = useHistory()


    return (
        <>
        <Navbar/>
            <div className="container">
                
                <h1 className="text-center">Trucks List</h1>
                <ModalCreateTruck/>
                {/* <button onClick={handleCreateTruck} className="btn btn-secondary my-3">Add New</button> */}
                <TableTruckDetail/>
            </div>
        </>
    )
}
