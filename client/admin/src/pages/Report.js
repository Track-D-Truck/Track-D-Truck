import React from 'react'

import Navbar from '../components/Navbar' 
import { Maps } from '../components/Maps'
import CardTrackingTruck from '../components/CardTrackingTruck'
import CardTruckRoutes from '../components/CardTruckRoutes'
import TableResult from '../components/TableResult'

export default function Report() {

	return (
        <>
					<Navbar/>
					<div className='container mt-2'>
						<div className="row">

							<div className="col-sm-4">
								<CardTrackingTruck />
							</div>

							<div className="col-sm-6">
								<div className='card shadow'>
									{/* <Maps /> */}
								</div>
							</div>

							<div className="col-sm-2">
								<CardTruckRoutes/>
							</div>

						</div>

						<TableResult/>

					</div>
        </>
    )
}
