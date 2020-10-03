import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Login from './components/Login/Login'
import Signup from './components/Signup'
import HeaderDash from './components/Header/HeaderDash';
import { AuthRoute, ProtectedRoute } from "./util/route";
import AuthenticationError from './components/ErrorCodePages/AuthenticationError'

function App() {
  return (
    <div className="App">
      
      <Router>
        <Switch>
        {/* <Route exact path="/" component={Welcome} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/dashboard" component={Dashboard} /> */}
        {/* <Route exact path="/" component={Welcome} /> */}
      <AuthRoute path="/login" component={Login} />
      <AuthRoute path="/signup" component={Signup} />
      <Route exact path='/autherror' component={AuthenticationError} />
      <ProtectedRoute path="/"  component={HeaderDash} />
      
          {/* <Route exact path='/login' component={Login} /> */}
          {/* <Login /> */}
        </Switch>
      </Router>
    </div>
    // <HeaderDash />
  );
}

export default App;
