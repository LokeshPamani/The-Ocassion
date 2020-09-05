import {putCall , getCall, deleteCall} from '../APICalls'



export const getAllUsers=()=>{
    return getCall(`api/users`)
} 

export const deleteUser = (id)=>{
    return deleteCall(`api/users/${id}`)
}