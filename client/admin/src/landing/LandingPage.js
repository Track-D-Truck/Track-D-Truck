import "./assets/css/paper-kit ke2.css";

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { Button, Container, Row, Col } from "reactstrap";
import {FETCH_RESULT} from '../store/actions/ResultAction'
import Loading from "../components/Loading"
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
    title: {
        fontFamily: 'Russo One',
        fontSize: '64px',
        color: '#A8DDA8',
        textAlign: 'center',
        textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        paddingTop: '0px'
    }
}


  return (
    <>
    <div
        className="page-header"
        data-parallax={true}
      >
   


        {/* <div className="filter" /> */}
        <div className="container">
                <h1 style={style.title} className="m-0">Track D'Truck</h1>
                <img src={loginImage} alt='loginComponent' style={{margin:'auto', paddingLeft: '50px'}}></img>
        </div>
        <Container>
          <div className="motto text-center">
            <h1 style={{fontFamily: 'Russo One'}}>Fleet Optimization Generator</h1>
            <br />
            <h3>Let's generate the best fleet schema to obtain the most optimum cost.</h3>
            <p className="description">
              Be sure the '
              <Link className="text-danger" to="/trucks" disabled>
                  Trucks 
                </Link>
                ', ' 
                <Link className="text-danger" to="/drivers" disabled>
                   Drivers
                </Link>
                ', and '
                <Link className="text-danger" to="/dumps" disabled>
                  Dump Storages
                </Link>
                ' data have been set up.
              </p>
            <br />
            <Button className="btn-round"  color="info"   type="button"  outline onClick={handleOnClick}>
                Optimize
              </Button>
            <br/>
            <br/>
            <br/>
            <br/>
            {loading && 
            <div className="d-flex justify-content-center" style={{border:'1px'}}> 
              <lottie-player className="mx-auto px-auto" src="https://assets2.lottiefiles.com/datafiles/mNmtyo9inv5Ak3m/data.json" background="transparent"  speed="1"  
              style={{width: "300px", height: "300px"}} loop  autoplay></lottie-player>
            </div>
            }
            {result && !loading &&
            <Row className="text-center">
            <Col className="ml-auto mr-auto" md="12">
              <h2 className="title">Optimization Completed!</h2>
            </Col>
            <Col className="ml-auto mr-auto" md="6">
              <h4 className="description">Total permutation</h4>
              <h3 className="description">{result.PERMUTATIONS}</h3>
              </Col>
              <Col className="ml-auto mr-auto" md="6">
              <h4 className="description">Most optimum cost</h4>
              <h3 className="description">{result.BEST.bestCost[0]}</h3>
              </Col>
            <Col className="ml-auto mr-auto mt-3" sm="8">
            <p className="description">
                Let's jump to the {" "}
                <Link className="text-danger" to="/report" disabled>
                  Optimization schema result
                </Link>
                . It is possible to revamp the data composition in case unforeseen event occurs.
              </p>
            </Col>

            </Row>
            }

          </div>        
        </Container>
      </div>
    </>
  );
}

export default IndexHeader;
