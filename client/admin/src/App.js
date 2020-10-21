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

import ReportNew from './pages/ReportNew'
import CheckOptimation from './components/CheckOptimation'

function App() {
  const status = useSelector(state => state.ResultReducer.status)
  return (

    <Router>
    <Route path="/login" component={Login}></Route>
    {/* {!status && <CheckOptimation/>} */}
        <Route exact path="/" component={Dashboard}></Route>
        <Route path="/trucks" component={Trucks}></Route>
        <Route path='/report' component={Report}/>
        <Route path='/dumps' component={GarbageDump}/>
        <Route path='/drivers' component={Drivers}/>
        <Route path='/test' component={ReportNew}/>
      </Router>
    
  );
}

export default App;
