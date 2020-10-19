import React from 'react';
import { Provider } from 'react-redux'

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

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Report}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/trucks" component={Trucks}></Route>
        <Route path='/report' component={Report}/>
        <Route path='/dumps' component={GarbageDump}/>
        <Route path='/drivers' component={Drivers}/>
      </Router>
    </Provider>
    
  );
}

export default App;
