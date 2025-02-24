
import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { BsFillShieldLockFill, BsKeyFill } from "react-icons/bs";
import "./Login.css"; // Import CSS

const Login = () => {
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    const details = jwtDecode(credentialResponse.credential);
    console.log(details);
    localStorage.setItem("user", JSON.stringify(details));
    navigate("/");
  };

  return (
    <div className="login-container">
      <h1 className="login-heading">WELCOME TO YOUTUBE</h1>
      <div className="icon-container">
        <BsFillShieldLockFill size={40} className="icon" />
        <BsKeyFill size={40} className="icon" />
      </div>
      <div className="google-login-box">
        <GoogleOAuthProvider clientId="486340617177-627cq1s06j912ps9ot0lnrqube6b4vlp.apps.googleusercontent.com">
          <GoogleLogin onSuccess={handleSuccess} onError={() => console.log("Login Failed")} />
        </GoogleOAuthProvider>
      </div>
      <p className="click-here-text">Click here to login</p>
    </div>
  );
};

export default Login;
