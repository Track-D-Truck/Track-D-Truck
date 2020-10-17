import React from 'react'
import {useHistory} from "react-router-dom";

import Chart from '../components/Cart'
import TableTruckRecap from '../components/TableTruckRecap'
import Navbar from '../components/Navbar'    

export default function Dashboard() {
    const history = useHistory()
    
    function handleMoreDetail() {
        history.push(`/trucks`);
    }
    return (
        <>  
        <Navbar/>
        <div className="d-flex flex-row" style={{backgroundColor: '#e2f1de', height:"90vh"}}>
            <div className="mx-auto my-auto" >
                <Chart/>
            </div>
            <div className="mx-auto my-auto">
                <h4>Recap Truck</h4>
                <TableTruckRecap/>
                <button onClick={handleMoreDetail} className="btn" style={{backgroundColor:"#c8e7ba", fontWeight:'bold'}}>More Detail..</button>
            </div>
        </div>
    </>
    )
}
