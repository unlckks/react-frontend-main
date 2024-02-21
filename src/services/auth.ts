import axios from "axios";
const USER_API_URL = "http://localhost:9000/user/";
//const USER_API_URL = "https://9429d5b9-a4ce-43d8-bf6b-637cc223febe.mock.pstmn.io/";
// set API for RESET Passowrd  
//const USER_API_URL_RESET ="https://sde-backend-40b2c0bbfd8e.herokuapp.com/api/"

const register = (username: string, email: string, password: string) => {
  return axios.post(USER_API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username: string, password: string) => {
  return axios
    .post(USER_API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      // alert(JSON.stringify(response.data)); // for debugging purposes
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(USER_API_URL + "logout").then((response) => {
    return response.data;
  });
};

const resetPasswordRequest = (email: string) => {
  return axios
    .post(USER_API_URL + 'password-reset-link', {
      email,
    })
    .then((response) => {
      // Handle success - maybe show a success message to the user
      console.log(response.data);
    })
    .catch((error) => {
      // Handle error - show an error message to the user
      console.error('Error sending reset email:', error);
    });
};


const resetPassword = async (token: string, password: string) => {
  try {
    const response = await axios.post(USER_API_URL + 'password-reset/confirm', { token, password });
    return response.data.message;
  } catch (error) {
    //if token is not  invaild , 
    console.error(error);
    throw new Error('Error resetting password. Please try again later.');
  }
};

const getCurrentUser = (): any | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};




/**
 * This represents some generic auth provider API, like Firebase.
 */
const fakeAuthProvider = {
    isAuthenticated: false,
    signin(callback: VoidFunction) {
      fakeAuthProvider.isAuthenticated = true;
      setTimeout(callback, 100); // fake async
    },
    signout(callback: VoidFunction) {
      fakeAuthProvider.isAuthenticated = false;
      setTimeout(callback, 100);
    },
  };


  const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
    fakeAuthProvider,
    resetPasswordRequest,
    resetPassword
  }
  
  export default AuthService;