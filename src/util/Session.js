import axios from 'axios'

const BASEURL="http://localhost:5001"


export const signup = user => {
    
    console.log(user)
    fetch(BASEURL+"/api/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    })
};
  
export const login = user => (
    fetch(BASEURL+"/api/session", {
      method: "POST",
      body: JSON.stringify(user),
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      }
    })
  );

export const logout = () => {
  //  fetch(BASEURL+"/api/session", { method: "DELETE" ,credentials: 'include'})
  axios.defaults.withCredentials = true;
  //console.log('the url is',url,wmc_tokens)
  console.log('before the axios')
 return (axios.delete(BASEURL+"/api/session"))
};

export const checkLoggedIn = async () => {
    const response = await fetch(BASEURL+'/api/session',{credentials: 'include'});
    console.log('response is ',response)
    let preloadedState;
    try{
    const result = await response.json();
    console.log('the out put ',result)
    //const {user}=result
    const {userId , username}=result
    const user={
      userId :userId,
      username : username
    }
    console.log('user is ',user)
    if (user) {
      preloadedState = {
        session: user
      };
    }
    console.log('preloaded state is in try  ',preloadedState) 
    }
    catch{
      preloadedState = {};
    }
     
    console.log('preloaded state is ',preloadedState) 
    
    return preloadedState;
  };