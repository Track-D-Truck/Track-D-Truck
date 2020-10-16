import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

export default function Form(props) {
    const [garbageDump, setGarbageDump] = useState({
        lat: '',
        long: '',
        address: '',
        pickup_schedule: '',
        volume: ''
    })
    // const dispatch = useDispatch()
    const history = useHistory()
    const addGarbageDump = e => {
        e.preventDefault()
        console.log(garbageDump);
    }

    return (
        <div>
            <div className="flex-center">
                <div className="login-form-container flex-center rounded-shadow yellow-background" style={{flexDirection: 'column', padding: '50px'}}>
                    <form className="flex-center" style={{flexDirection: 'column'}} onSubmit={addGarbageDump}>
                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%'}}>
                            <input className="rounded-shadow form-input"
                            type="text"
                            placeholder="Latitude"
                            value={garbageDump.lat}
                            onChange={e => {
                                setGarbageDump({
                                    ...garbageDump,
                                    lat: e.target.value
                                })
                            }}
                            style={{ marginRight: '10px'}}/>
                            <input className="rounded-shadow form-input"
                            type="text"
                            placeholder="longitude"
                            value={garbageDump.long}
                            onChange={e => {
                                setGarbageDump({
                                    ...garbageDump,
                                    long: e.target.value
                                })
                            }}/>                          
                        </div>
                        <input className="rounded-shadow form-input"
                        type="text"
                        placeholder="Address"
                        value={garbageDump.address}
                        onChange={e => {
                            setGarbageDump({
                                ...garbageDump,
                                address: e.target.value
                            })
                        }}
                        style={{ width: '100%' }}/>
                        <select className="rounded-shadow form-input"
                        style={{ backgroundColor: 'white', width: '100%'}}
                        onChange={e => {
                            setGarbageDump({
                                ...garbageDump,
                                pickup_schedule: e.target.value
                            })
                        }}>
                            <option value=''> -- Select Pick Up Schedule -- </option>
                            <option value="monday">Monday</option>
                            <option value="tuesday">Tuesday</option>
                            <option value="wednesday">Wednesday</option>
                            <option value="thursday">Thursday</option>
                            <option value="friday">Friday</option>
                            <option value="saturday">Saturday</option>
                            <option value="sunday">Sunday</option>
                        </select>
                        <input className="rounded-shadow form-input"
                        type="text"
                        placeholder="Volume"
                        value={garbageDump.volume}
                        onChange={e => {
                            setGarbageDump({
                                ...garbageDump,
                                volume: e.target.value
                            })
                        }}
                        style={{ width: '100%' }}/>
                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%'}}>
                            <button className="btn-update" style={{ marginRight: '10px', width: '100px'}}>Save</button>
                            <button className="btn-back" onClick={() => {history.goBack()}}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}