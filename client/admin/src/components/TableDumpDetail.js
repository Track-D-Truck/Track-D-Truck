import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ModalEditDump from './ModalEditDump'
import Loading from './Loading'
import { FETCH_DUMPS, SET_DUMPS, DELETE_DUMP } from '../store/actions/DumpsAction'

export default function TableDumpDetail() {
  const dispatch = useDispatch()
  const dumps = useSelector(state => state.DumpReducer.dumps)
  const loading = useSelector(state => state.DumpReducer.loadingStatus)

  useEffect(() => {
    dispatch(FETCH_DUMPS())
  },[dispatch])

  if (loading) return <Loading/>
  
  return (
    <table className="table text-center thead-bg">
            <thead className='trucklist'>
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
            <tbody style={{backgroundColor:'#FFF8CD'}}>
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
                            <td>{dump.address}</td>
                            <td>
                                <span>lat:  {dump.location[0]}</span><br/>
                                <span>long:  {dump.location[1]}</span>
                                </td>
                            <td>{dump.volume}  m³</td>
                            <td>{dump.status}</td>
                            <td>
                                <ModalEditDump chosenDump={dump} />
                                <button className="btn btn-secondary" onClick={handleDeleteDump}>Delete</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
  )
}

