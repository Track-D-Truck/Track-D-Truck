import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import TrucksPage from './pages/TrucksPage'
import Report from './pages/Report'

function App() {
  return (
    <Router>

      <Route exact path="/" component={Dashboard}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/trucks" component={TrucksPage}></Route>
      <Route path='/report' component={Report}/>
    </Router>
    
  );
}

export default App;
