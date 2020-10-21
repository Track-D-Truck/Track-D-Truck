import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'



// import TableTruckDetail from '../components/TableTruckDetail'
import Navbar from '../components/Navbar' 
import TableDumpDetail from '../components/TableDumpDetail'


export default function GarbageDump() {
    const location = useSelector(state => state.DumpReducer.location)

    console.log(location,'ini di garbage');
    return (
        <>
        <Navbar/>
        
        <div className="container">
            
            <TableDumpDetail/>
         </div>      
        </>
    )
}