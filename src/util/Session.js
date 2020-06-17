export const signup = user => {
    console.log(user)
    fetch("api/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    })
};
  
export const login = user => (
    fetch("api/session", {
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