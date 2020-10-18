import React from 'react'

import FormLogin from '../components/FormLogin'
import loginImage from '../assets/loginimage.png'

export default function Login() {
    const style = {
        dashboard : {
            backgroundColor: '#FFF8CD',
            height: '100vh'
        },
        title: {
            fontFamily: 'Russo One',
            fontSize: '64px',
            color: '#A8DDA8',
            textAlign: 'center',
            textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
        }
    }

    return (
        <div style={style.dashboard}>
            <div className="container">
                <h1 style={style.title}>Track D'Truck</h1>
                <div className="d-flex flex-row">
                    <div className="col-8 mt-3">
                        <img src={loginImage} alt='loginComponent'></img>
                    </div>
                    <div className="col-4 my-auto">
                        <FormLogin/>
                    </div>
                </div>
            </div>
        </div>
    )
}

