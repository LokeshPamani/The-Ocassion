import {putCall, postCall, getCall, deleteCall} from '../APICalls'



export const getAllUsers=()=>{
    return getCall(`api/users`)
} 

export const deleteUser = (id)=>{
    return deleteCall(`api/users/${id}`)
}

export const newUser=(data)=>{
    return postCall(`api/users/adduser`,data)
}

export const updateUser=(id,data)=>{
    return putCall(`api/users/${id}`,data)
}