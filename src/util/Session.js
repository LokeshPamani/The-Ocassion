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
      headers: {
        "Content-Type": "application/json"
      }
    })
  );

export const logout = () => (
    fetch("api/session", { method: "DELETE" })
  );

export const checkLoggedIn = async preloadedState => {
    const response = await fetch('/api/session');
    const { user } = await response.json();
     preloadedState = {};
    if (user) {
      preloadedState = {
        session: user
      };
    }
    return preloadedState;
  };