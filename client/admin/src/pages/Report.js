import React from 'react'
import { useSelector } from 'react-redux'

import Navbar from '../components/Navbar' 
import { Maps } from '../components/Maps'
import CardTrackingTruck from '../components/CardTrackingTruck'
import CardTruckRoutes from '../components/CardTruckRoutes'
import TableResult from '../components/TableResult'
import Loading from '../components/Loading'

export default function Report() {
	const loading = useSelector(state => state.TruckReducer.loadingStatus)

	if (loading) return <Loading/>
	return (
        <>
					<Navbar/>
					<div className='container mt-4'>
						<div className="row">

							<div className="col-sm-9">
								<CardTrackingTruck />
							</div>

							{/* <div className="col-sm-6">
								<div className='card shadow'>
									<Maps maps={routes}/>
								</div>
							</div> */}

							<div className="col-sm-3">
								<CardTruckRoutes/>
							</div>

						</div>

						<TableResult/>

					</div>
        </>
    )
}
