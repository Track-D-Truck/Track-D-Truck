import React from 'react'

import FormLogin from '../components/FormLogin'
import loginImage from '../assets/loginimage.png'

export default function Login() {
    const style = {
        dashboard : {
            height: '100vh'
        },
        title: {
            fontFamily: 'Russo One',
            fontSize: '80px',
            color: '#27ae60',
            textAlign: 'center',
            textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
        },
        imageLogin: {

        }
    }
   
    return (
        <div style={style.dashboard}>
            <div id="gifLogin">
            <lottie-player src=" https://assets3.lottiefiles.com/packages/lf20_is82b4.json" background="transparent"  speed="0.6"  
            style={{width: "400px", height: "400px"}} loop  autoplay></lottie-player>
                
            </div>
            <div className="container">
                <h1 className="mt-4 " style={style.title}>Track D'Truck</h1>
                        <FormLogin />

                <div className="row " >
                    <div className="col-1">

                    </div>
                    <div className="col-6 mt-5">
                        {/* <img src={loginImage} alt='loginComponent' style={style.imageLogin}></img> */}
                    </div>
                    <div className="col-3 my-auto">
                        {/* <lottie-player src=" https://assets3.lottiefiles.com/packages/lf20_is82b4.json" background="transparent"  speed="0.6"  
            style={{width: "300px", height: "300px"}} loop  autoplay></lottie-player> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

