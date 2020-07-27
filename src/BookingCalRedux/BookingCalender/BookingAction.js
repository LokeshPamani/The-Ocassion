import { FETCH_BOOKINGS_REQUEST, FETCH_BOOKINGS_SUCESS,FETCH_BOOKINGS_ERROR } from "./ReduxType";
import {getCall} from '../../CallAPIS'

export const fetchUserRequest=()=>{
    return{
        type : FETCH_BOOKINGS_REQUEST
    }
}

export const fetchUserSuccess=(user)=>{
    return{
        type : FETCH_BOOKINGS_SUCESS,
        payload : user
    }
}

export const fetchUserError=(error)=>{
    return {
        type : FETCH_BOOKINGS_ERROR,
        payload : error
    }
}

export const fetchUser =(path='security/usersgroups',queryParamter={}) =>{
    return function(dispatch){
        dispatch(fetchUserRequest())
        
        getCall(path,queryParamter).then(response=>{
            
            dispatch(fetchUserSuccess(response.data))
        }).catch(error => {
            dispatch(fetchUserError(error))
        })
    }
}