import logo from "./logo.svg";
import "./App.css";
import { useJwt } from "react-jwt";
import { isExpired, decodeToken } from "react-jwt";

import { useState, useEffect } from "react";
function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tokenData, setTokenData] = useState({ success: false });
  const [userCreatedCallback, setUserCreatedCallback] = useState({
    message: "",
    success: false,
  });
  const [userLoginData, setUserLoginData] = useState({
    success: false,
    token: "",
  });
  const [decodedUserToken, setDecodedUserToken] = useState([]);
  useEffect(() => {
    console.log(userCreatedCallback);

    if (userLoginData.token !== "") {
    }
  }, [userCreatedCallback, userLoginData]);

  const loginUser = async () => {
    try {
      const login = await fetch(`http://localhost:4000/users/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const response = await login.json();
      console.log(response);
      setUserLoginData({
        success: response.success,
        token: response.token,
      });
      const decodedToken = decodeToken(response.token);
      console.log(decodedToken.userData, "line77");
      let moreData = decodeToken.userData;
      setTokenData({
        decodedToken,
        moreData: decodedToken.userData,
        success: true,
      });
    } catch (error) {
      console.error();
    }
  };
  const getUserData = async () => {
    try {
      const user = await fetch(`http://localhost:4000/users/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await user.json();
      console.log(data);
      const response = { data };
      setUserCreatedCallback({
        message: response.data.message,
        success: response.data.success,
      });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <div className="createUser">
        <label htmlFor="email">Email:</label>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          name="email"
          id="email"
        ></input>
        <label htmlFor="password">Password:</label>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          name="password"
          id="password"
        ></input>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
        ></input>
        <button onClick={() => getUserData()}>Submit</button>
      </div>
      <div className="loginUser">
        <label htmlFor="loginEmail">Email:</label>
        <input
          onChange={(e) => {
            setLoginEmail(e.target.value);
          }}
          type="email"
          name="loginEmail"
          id="loginEmail"
        ></input>
        <label htmlFor="loginPassword">Password:</label>
        <input
          onChange={(e) => {
            setLoginPassword(e.target.value);
          }}
          id="loginPassword"
          name="loginPassword"
        ></input>
        <button onClick={() => loginUser()}>Log In:</button>
      </div>
      {userCreatedCallback.success === true ? (
        <p>{userCreatedCallback.message}</p>
      ) : (
        <span></span>
      )}
      {tokenData.success === true ? (
        <p>{tokenData.moreData.userEmail}</p>
      ) : (
        <span></span>
      )}
      {tokenData.success === true ? (
        <p>{tokenData.moreData.Date}</p>
      ) : (
        <span></span>
      )}
      {tokenData.success === true ? (
        <p>{tokenData.moreData.userId}</p>
      ) : (
        <span></span>
      )}
    </div>
  );
}

export default App;
