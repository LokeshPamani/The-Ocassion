import {getCall,postCall,putCall} from '../APICalls'


export const assignWeightage=data=>{
   return  postCall('api/weight',data)
}