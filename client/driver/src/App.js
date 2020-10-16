import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import './App.css';
import Navbar from './components/Navbar'
import Home from './pages/Home';
import Login from './pages/Login';
import DetailRoute from './pages/DetailRoute'
import store from './store/'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar/>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/login" exact>
                <Login />
              </Route>
              <Route path="/route" exact>
                <DetailRoute />
              </Route>
            </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
