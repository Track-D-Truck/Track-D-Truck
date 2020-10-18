import React from 'react'
// import { useHistory } from 'react-router-dom'

import ModalCreateDriver from '../components/ModalCreateDriver'
import TableDriverDetail from '../components/TableDriverDetail'
import Navbar from '../components/Navbar' 
export default function TrucksPage() {
    // const history = useHistory()


    return (
        <>
        <Navbar/>
            <div className="container">
                
                <h1 className="text-center">Driver List</h1>
                <ModalCreateDriver/>
                {/* <button onClick={handleCreateTruck} className="btn btn-secondary my-3">Add New</button> */}
                <TableDriverDetail/>
            </div>
        </>
    )
}
