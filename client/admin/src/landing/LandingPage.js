// import "./assets/css/paper-kit copy.css";

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Row, Col } from "reactstrap";
import {FETCH_RESULT} from '../store/actions/ResultAction'
// import Loading from "../components/Loading"
import loginImage from '../assets/loginimage.png'


function IndexHeader() {
  const dispatch = useDispatch()

  const result = useSelector(state => state.ResultReducer.result)
  let loading = useSelector(state => state.TruckReducer.loadingStatus)

  console.log(result, "<< ini result")
  console.log(loading, "<<ini loading")

  function handleOnClick(e) {
    e.preventDefault()
    dispatch(FETCH_RESULT())
  }


  if(result) {
    let currencyFormat = result.BEST.bestCost.toLocaleString('id-ID', {
      style: "currency",
      currency: "IDR"
    })
    result.BEST.bestCost = currencyFormat.split(',')
  }


  const style = {
    dashboard : {
        backgroundColor: '#FFF8CD',
        height: '100vh',
        // backgroundImage:
        // "url(https://i.pinimg.com/originals/93/1f/69/931f69bacd19b8953f57f9a9d174170a.gif)"
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
    <>
     <div style={style.dashboard}>
            <div className="container">
                <h1 style={style.title}>Track D'Truck</h1>
                <div className="d-flex flex-row">
                    <div className="col-8 mt-3">
                        <img src={loginImage} alt='loginComponent'></img>
                    </div>
                    <div
        className="page-header"
        data-parallax={true}
      >
        <div className="filter" />
        <Container>
          <div className="motto text-center">
            <h1 style={{color: 'black',}}>Fleet Optimization Generator</h1>
            <h3>Let's generate the best fleet schema to obtain the most optimum cost.</h3>
            <p className="description">
              Be sure the '
              
              <a className="text-danger" href="#pablo" disabled>
                  Trucks 
                </a>
                ', ' 
                <a className="text-danger" href="#pablo" disabled>
                   Drivers
                </a>
                ', and '
                <a className="text-danger" href="#pablo" disabled>
                  Dump Storages
                </a>
                ' data have been set up.
              </p>
            <br />
            <Button className="btn-round" color="info" type="button"  outline onClick={handleOnClick}>
                <i className="nc-icon nc-spaceship" />{" "}
                Optimize
              </Button>
            <br/>
            <br/>
            {/* {result && 
            <div className="d-flex justify-content-start">
              
            <lottie-player className="mx-auto px-auto" src="https://assets2.lottiefiles.com/datafiles/mNmtyo9inv5Ak3m/data.json" background="transparent"  speed="1"  
            style={{width: "300px", height: "300px"}} loop  autoplay></lottie-player>
            </div>
            } */}
            {result && 
            <Row className="text-center">
            <Col className="ml-auto mr-auto" md="12">
              <h2 className="title">Optimation Completed</h2>
            </Col>
            <Col className="ml-auto mr-auto" md="6">
              <h4 className="description">Total permutation</h4>
              <h3 className="description">{result.PERMUTATIONS}</h3>
              </Col>
              <Col className="ml-auto mr-auto" md="6">
              <h4 className="description">Most optimum cost</h4>
              <h3 className="description">{result.BEST.bestCost}</h3>
              </Col>
            <Col className="ml-auto mr-auto" sm="6" style={{marginTop:"50px"}}>
            <p className="description">
                Let's jump to the {" "}
                <a className="text-danger" href="#pablo" disabled>
                  Optimization schema result
                </a>
                . It is possible to revamp the trucks, drivers, and Dump storages composition incase unforeseen event
                occurs.
              </p>
            </Col>

            </Row>
            }

          </div>
          <div
          className="moving-clouds"
          style={{
            backgroundImage: "url(" + require("./clouds.png") + ")",
          }}
        />          
        </Container>
      </div>
                </div>
            </div>
        </div>


    
    </>
  );
}

export default IndexHeader;
