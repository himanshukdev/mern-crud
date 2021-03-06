import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';
import Register from './components/auth/Register';

import ContactState from './context/contacts/contactState';
import AuthState from './context/auth/AuthState';
import Login from './components/auth/Login';
import AlertState from './context/alert/AlertState';
import Alerts from './components/layout/Alerts';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alerts></Alerts>
                <Switch>
                  <PrivateRoute exact path="/" component={Dashboard}></PrivateRoute>
                  <Route exact path="/home" component={Home}></Route>
                  <Route exact path="/login" component={Login}></Route>
                  <Route exact path="/register" component={Register}></Route>

                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
