const baseApi = "https://reqres.in/api/users";
const page = 1;
/**
 * Set Header 
 */
const requestHeader = () =>{
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return headers; 
}


/**
 * Get User From Api 
 */
const getUsers = async (page) => {
  const users = localStorage.getItem('users');
  if (!users) {
    return users; 
  }
  requestHeader.method = 'GET';
  const response = await fetch(baseApi + '?page=' + page, requestHeader);
  if (response.status === 200) {
    const jsonObject = await response.json();
    if(jsonObject){
      localStorage.setItem('users', jsonObject);
      return jsonObject; 
    }
  }

  return {
    "error": true
  }
};


getUsers(page);
