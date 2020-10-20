import React from 'react'



// import TableTruckDetail from '../components/TableTruckDetail'
import Navbar from '../components/Navbar' 
import TableDumpDetail from '../components/TableDumpDetail'

// export default function TrucksPage() {
//     // const history = useHistory()


//     return (
//         <>
//         <Navbar/>
//             <div className="container">
                
//                 <h1 className="text-center">Trucks List</h1>
//                 <ModalCreateTruck/>
//                 {/* <button onClick={handleCreateTruck} className="btn btn-secondary my-3">Add New</button> */}
//                 <TableTruckDetail/>
//             </div>
//         </>
//     )
// }

export default function GarbageDump() {
    return (
        <>
        <Navbar/>
        <div className="container">
            
            <TableDumpDetail/>
         </div>      
        </>
    )
}