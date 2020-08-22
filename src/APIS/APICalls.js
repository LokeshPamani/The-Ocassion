import axios from 'axios'

const BASEURL="http://localhost:5001/"
const options = {
  headers: {
         "Content-Type": "application/json"
       }}
axios.defaults.withCredentials = true;

export const getCall = url => (
    // fetch(BASEURL+url, {
    //   method: "GET",
    //   credentials: 'include'
    // }).then(res=>res.json())
    axios.get( BASEURL+url)
  );
  


export const postCall = (url,data) => (
    // fetch(BASEURL+url, {
    //   method: "POST",
    //   body: JSON.stringify(data),
    //   credentials: 'include',
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // }).then(res=>res.json())
    axios.post( BASEURL+url,JSON.stringify(data),options)
  );

  export const putCall = (url,data) => (
    // fetch(BASEURL+url, {
    //   method: "POST",
    //   body: JSON.stringify(data),
    //   credentials: 'include',
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // }).then(res=>res.json())
    axios.put( BASEURL+url,JSON.stringify(data),options)
  );
  
