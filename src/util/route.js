import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, withRouter } from "react-router-dom";

const mapStateToProps = ({ session: { userId} , errors }) => ({
  loggedIn: Boolean(userId),
  loginError : (errors === 'LOGIN_ERROR')
 });

const Auth = ({ loggedIn, path, component: Component ,loginError }) => (
    <Route
      path={path}
      render={props => (
        loggedIn ?
        <Redirect to='/home' /> :
        loginError?
          <Redirect to='/autherror' /> :
        <Component {...props} />
      )}
    />
  );
  
  const Protected = ({ loggedIn, path, component: Component }) => (
    <Route
      path={path}
      render={props => (
        loggedIn ?
        <Component {...props} /> :
        <Redirect to='/login' />
      )}
    />
  );

  export const AuthRoute = withRouter(
    connect(mapStateToProps)(Auth)
  );export const ProtectedRoute = withRouter(
    connect(mapStateToProps)(Protected)
  );