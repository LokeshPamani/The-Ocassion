import * as apiUtil from '../../util/Session';
import { receiveErrors } from "./Errors";
import { Redirect } from 'react-router-dom'
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";

const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
});


export const login = user => async dispatch => {
  apiUtil.login(user).then(response=>{
    console.log(response)
    if (response.statusText=== "OK") {  
      return dispatch(receiveCurrentUser(response.data));
      
    }
  }).catch(err=>{
    console.log('error comes',err.response);
    return dispatch(receiveErrors({message : 'LOGIN_ERROR'}));  //TODO i have to cange this text by a predefined message coming from server
  })
  // let data,response;
  // try{
  //   response = await apiUtil.login(user);
  //   data= response.data
  // }
  // catch(err){
  //   data=err
  //   console.log(data)
  // }
  //   //const data = await response.json();
    
  //   if (response.ok) {
        
  //     return dispatch(receiveCurrentUser(data));
      
  //   }
  //   return dispatch(receiveErrors(data));
  };
  
export const signup = user => async dispatch => {
    const response = await apiUtil.signup(user);
    const data = await response.json();
    
    if (response.ok) {
      return dispatch(receiveCurrentUser(data));
    }
    return dispatch(receiveErrors(data));
  };

export const logout = () => async dispatch => {
    const response = await apiUtil.logout();
   // const data = await response.json();
   console.log(response, ' ', response.ok)
    if (response.ok) {
      return dispatch(logoutCurrentUser());
    }
   
    // const data = await response.json();
    // return dispatch(receiveErrors(data));
  };