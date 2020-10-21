import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import {useHistory} from "react-router-dom";

import {FETCH_RESULT} from '../store/actions/ResultAction'

function CheckOptimation() {
  const history = useHistory()
  const dispatch = useDispatch()
    const landingStyle = {
        position: "absolute",
        top: "0",
        right:"0",
        left:"0",
        bottom:"0",
        backgroundColor:"rgb(0 0 0 / 60%)",
        zIndex:"3"
    }
    // const [loading, setLoading] = useState('')
    // setLoading(true)

    function setHandleRUN() {
      dispatch(FETCH_RESULT())
      // setLoading(false)
      history.push(`/`);
    }

    return (
        <div  className="d-flex flex-column justify-content-center align-items-center"
          style={landingStyle}>
        {/* <div class="p-2 bd-highlight">Flex item 1</div>
        <div class="p-2 bd-highlight">Flex item 2</div> */}
        <lottie-player src="https://assets2.lottiefiles.com/datafiles/mNmtyo9inv5Ak3m/data.json" background="transparent"  speed="1"  
            style={{width: "200px", height: "200px"}} loop  autoplay></lottie-player>
            <h1 style={{color:"white"}}>Welcome, Bambang!</h1>
            <h3 className="text-white"> The truck route optimization is not yet running. Run now?    </h3>
            <button className="btn buttonGenerate noBorder shadow mt-2 p-3" onClick={setHandleRUN}>Run Optimation </button>
        </div>
    )

}
export default CheckOptimation