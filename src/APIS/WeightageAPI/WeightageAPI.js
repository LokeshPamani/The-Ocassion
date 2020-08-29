import {putCall} from '../APICalls'


export const assignWeightage=data=>{
   return  putCall('api/weight',data)
}