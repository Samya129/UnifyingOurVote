import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../../services/auth.service";

import Pic from "../../assets/images/login.png";
import "./style.css";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          props.history.push("/YourCommunity");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div>
        <img src={Pic} alt="loginImage" className="img-fluid"/>
      </div>
      <div className= "form col-md-6 offset-md-3">
        <div className="title">Log in
        </div>

            <Form onSubmit={handleLogin} ref={form}>

              <div className= "container2">

              <div className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required]}
                />
              </div>

              </div>

              <br></br>

              <div className="form-group">

                <button className="btn btn-light btn-block" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>

              </div>

              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div 
        style={{ borderTop: "5px solid #121e42 "}}>
      </div>

      <br></br>

      <div>
        <h2 className= "quote">"It is not possible to be in favor of justice for some people and not be in favor of justice for all people." - Martin Luther King, Jr.</h2>
      </div>

      <br></br>

      <div 
        style={{ borderTop: "5px solid #121e42 "}}>
      </div>
      <br></br>

    </div>
  );
};

export default Login;