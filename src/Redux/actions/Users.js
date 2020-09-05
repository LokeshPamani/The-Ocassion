import {getAllUsers} from '../../APIS/UsersAPI/UsersAPI'

export const FETCH_USERS_REQUEST="FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS="FETCH_USERS_SUCCESS";
export const FETCH_USERS_ERROR="FETCH_USERS_ERROR"

export const  fetchUsersRequest=()=>{
    return {
        type : FETCH_USERS_REQUEST
    }
}

export const fetchUsersSuccess=(users)=>{
    return {
        type : FETCH_USERS_SUCCESS,
        payload : users
    }
}

export const fetchUsersError=(error)=>{
    return {
        type : FETCH_USERS_ERROR,
        payload : error
    }
}

export const fetchUsers=(data)=>{
    return (dispatch)=>{
        dispatch(fetchUsersRequest());
        getAllUsers().then(res=>{
            const users = res.data;
            dispatch(fetchUsersSuccess(users));
        }).catch(err=>{
            const errMessage= err.response.data;
            dispatch(fetchUsersError(errMessage));
        })
    }
}