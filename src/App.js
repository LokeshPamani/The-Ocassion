import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Login from './components/Login/Login'
import Signup from './components/Signup'
import Welcome from './components/welcome'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route exact path="/" component={Welcome} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/dashboard" component={Dashboard} />
          {/* <Route exact path='/login' component={Login} /> */}
          {/* <Login /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
