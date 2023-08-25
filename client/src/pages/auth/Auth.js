import React, { useState } from "react";
import Logo from "../../img/logo.png";
import "./Auth.css";
import {useDispatch, useSelector} from 'react-redux'
import { logIn, signUp } from "../../action/AuthAction";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const loading = useSelector((state)=> state.authReducer.loading)
  const dispatch = useDispatch();
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    password: "",
    confirmpassword: "",
    username: "",
  });
  const [confirmPass, setConfirmPass] = useState(true);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      data.password === data.confirmpassword ? dispatch(signUp(data)): setConfirmPass(false);
      }
      else{
        dispatch(logIn(data))
      }
    }
  
  const resetForm = () => {
    setConfirmPass(true);
    setData({  firstname: "",
    lastname: "",
    password: "",
    confirmpassword: "",
    username: "",});
  };

  return (
    <>
      <div className="Auth">
        <div className="a-left">
          <img src={Logo} alt="logo" />
          <div className="webname">
            <h1>SocialSphere</h1>
            <h6>Explore the ideas</h6>
          </div>
        </div>

        <div className="a-right">
          <form className="infoForm authform" onSubmit={handleSubmit}>
            <h1>{isSignup ? "Sign up" : "Log In"}</h1>

            {isSignup && (
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  className="infoInput"
                  name="firstname"
                  onChange={handleChange}
                  value={data.firstname}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="infoInput"
                  name="lastname"
                  onChange={handleChange}
                  value={data.lastname}
                />
              </div>
            )}

            <div>
              <input
                type="text"
                placeholder="UserName"
                className="infoInput"
                name="username"
                onChange={handleChange}
                value={data.username}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="infoInput"
                name="password"
                onChange={handleChange}
                value={data.password}
              />
              {isSignup && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="infoInput"
                  name="confirmpassword"
                  onChange={handleChange}
                  value={data.confirmpassword}
                />
              )}
            </div>
            <span
              style={{
                display: confirmPass ? "none" : "block",
                color: "red",
                fontSize: "12px",
                alignSelf: "flex-end",
                marginRight: "5px",
              }}
            >
              *Confirm Password is not same
            </span>
            <div>
              <span
                style={{ fontSize: "14px", cursor: "pointer" }}
                onClick={() =>{ setIsSignup((prev) => !prev);
                resetForm();}}
              >
                {isSignup
                  ? "Already have an account? Login"
                  : "Need an account? Signup"}
              </span>
            </div>
            <button className="button info-btn" type="submit" disabled={loading}>
            {loading ? 'Loading': isSignup ? "Signup" : "Login" }
              
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Auth;
