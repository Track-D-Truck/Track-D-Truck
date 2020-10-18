import React from 'react'

function Loading() {
    const loadingStyle = {
        position: "absolute",
        top: "0",
        right:"0",
        left:"0",
        bottom:"0",
        backgroundColor:"rgb(0 0 0 / 80%)",
        zIndex:"3"
    }
    return (
        <div  className="d-flex flex-column justify-content-center align-items-center"
        style={loadingStyle}>
        {/* <div class="p-2 bd-highlight">Flex item 1</div>
        <div class="p-2 bd-highlight">Flex item 2</div> */}
        <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_cbrbre30.json" mode="bounce" background="transparent"  speed="1"  
            style={{width: "300px", height: "300px"}} loop  autoplay></lottie-player>
        <h1 style={{color:"white"}}>Loading...</h1>
        </div>
    )

}
export default Loading