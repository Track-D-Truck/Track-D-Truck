import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ModalEditDump from './ModalEditDump'
import { FETCH_DUMPS, SET_DUMPS, DELETE_DUMP } from '../store/actions/DumpsAction'

export default function TableDumpDetail() {
  const dispatch = useDispatch()
  const dumps = useSelector(state => state.DumpReducer.dumps)

  useEffect(() => {
    dispatch(FETCH_DUMPS())
  },[dispatch])

  return (
    <table className="table text-center thead-bg">
            <thead className='trucklist'>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Location</th>
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
                            <td>{dump.location[0]}, {dump.location[1]}</td>
                            <td>{dump.volume}</td>
                            <td>{dump.status}</td>
                            <td>
                                <button className="btn btn-secondary">Detail</button>
                                <ModalEditDump/>
                                <button className="btn btn-secondary" onClick={handleDeleteDump}>Delete</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
  )
}

