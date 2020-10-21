import React from 'react';
import { Provider, useSelector } from 'react-redux'

import {
  BrowserRouter as Router,
  // Switch,
  Route,
} from "react-router-dom";

import store from './store'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Trucks from './pages/Trucks'
import Report from './pages/Report'
import GarbageDump from './pages/GarbageDump'
import Drivers from './pages/Drivers'

import CheckOptimation from './components/CheckOptimation'
import Landing from './landing/LandingPage'
import Landing2 from './landing/LandingPage2'

function App() {
  const status = useSelector(state => state.ResultReducer.status)
  return (

    <Router>
    <Route path="/login" component={Login}></Route>
    {/* {!status && <CheckOptimation/>} */}
        <Route exact path="/" component={Landing2}></Route>
        <Route path="/trucks" component={Trucks}></Route>
        <Route path='/report' component={Report}/>
        <Route path='/dumps' component={GarbageDump}/>
        <Route path='/drivers' component={Drivers}/>
        <Route path='/test' component={ReportNew}/>
        <Route path='/landing' component={Landing}/>
        <Route path='/2landing2' component={Landing2}/>
      </Router>
    
  );
}

export default App;
