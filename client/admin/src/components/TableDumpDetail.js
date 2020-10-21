import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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
    dispatch(FETCH_DUMPS())
  },[dispatch])

  if (loading) return <Loading/>
  
  return (
    <div className="p-5">
	
        <div className="card tableHeadBackground mx-auto noBorder shadow-sm"> 
            <div className="ml-3 text-white row">
            {/* <FontAwesomeIcon icon={['fas', 'Coffee']} /> */}
                <h2 className="mb-0 mt-1">Dumps List</h2>
                <ModalCreateDump/>
                {/* <p class="font-weight-lighter font-italic">Table Driver</p> */}
            </div>
            {/* <div>
                <ModalCreateDump/>
            </div> */}
        </div>
        <div className="card tableBackground noBorder shadow" >
            <div className="mt-4">
            <table className="table text-center px-2">
                    <thead className='table-borderless' style={{color:'#65AE07'}}>
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
                                dispatch(DELETE_DUMP(dump.id))
                                const filtered = dumps.filter( e => e.id !== dump.id)
                                dispatch(SET_DUMPS(filtered))
                            }
                            return(
                                <tr key={i}>
                                    <th scope="row">{dump.id}</th>
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
                                        <FontAwesomeIcon icon={faTrash} color="#65AE07" className="shadow" size="lg"/>
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

