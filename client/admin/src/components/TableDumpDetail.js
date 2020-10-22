import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'

import ModalEditDump from './ModalEditDump'
import Loading from './Loading'
import { FETCH_DUMPS, SET_DUMPS, DELETE_DUMP } from '../store/actions/DumpsAction'
import ModalCreateDump from '../components/ModalCreateDump'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash} from '@fortawesome/free-solid-svg-icons'

export default function TableDumpDetail() {
  const dispatch = useDispatch()
  const dumps = useSelector(state => state.DumpReducer.dumps)
  const loading = useSelector(state => state.DumpReducer.loadingStatus)

  useEffect(() => {
    if(dumps.length == 0) dispatch(FETCH_DUMPS())
  },[dispatch])

  if (loading) return <Loading/>
  
  return (
    <div className="p-5">
	
    <div className="card tableHeadBackground mx-auto noBorder shadow-sm"> 
            <div className="text-white row">
            {/* <FontAwesomeIcon icon={['fas', 'Coffee']} /> */}
            <span className="mx-auto">
                <h2 className="mb-0 mt-1 font-weight-bold">Dumps List</h2>
            </span>
                <span>
                    <ModalCreateDump />

                </span>
                {/* <p class="font-weight-lighter font-italic">Table Driver</p> */}
            </div>
        </div>
        <div className="card tableBackground  noBorder shadow" >
            <div className="mt-4">
            <table className="table text-center px-2">
                    <thead className='table-borderless abuColor'  style={{fontWeight:'bold', fontSize:'1.2em'}}>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Coordinate</th>
                        <th scope="col">Volume</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {dumps.map((dump,i) => {
                            function handleDeleteDump() {
                                Swal.fire({
                                    title: 'Are you sure?',
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#27ae60',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Yes, delete it!',
                                    }).then((result) => {
                                    if (result.isConfirmed) {
                                        Swal.fire(
                                        'Your data has been deleted!',
                                            '',
                                        'success'
                                        )
                                        dispatch(DELETE_DUMP(dump.id))
                                        const filtered = dumps.filter( e => e.id !== dump.id)
                                        dispatch(SET_DUMPS(filtered))
                                    }
                                })
                            }

                            return(
                                <tr key={i}>
                                    <th scope="row abuColor">{dump.id}</th>
                                    <td>{dump.name}</td>
                                    <td style={{width:"300px"}}>{dump.address}</td>
                                    <td>
                                        <span>lat:  {dump.location[0]}</span><br/>
                                        <span>long:  {dump.location[1]}</span>
                                        </td>
                                    <td>{dump.volume}  m³</td>
                                    <td>{dump.status}</td>
                                    <td>
                                        <ModalEditDump chosenDump={dump} />
                                        <button className="btn noBorder" onClick={handleDeleteDump}>
                                        <FontAwesomeIcon icon={faTrash} color="#212529" className="" size="lg"/>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                </div>
                </div>
        </div>
  )
}

