//OLD FORMAT
import React, { Component } from "react";
import "./style.css";
import Pic from "../../assets/images/signup.png";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { connect } from "react-redux";
import { register } from "../../actions/auth";

const vradio = (value) => {
  if (value === false) {
    return (
      <div className="alert alert-danger" role="alert">
        To proceed you must agree to our terms and conditions.
      </div>
    );
  }
};

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};


class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRadio = this.onChangeRadio.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      radio: false,
      successful: false
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeRadio(e) {
    this.setState({
      radio: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      this.props
        .dispatch(
          register(this.state.username, this.state.email, this.state.password, this.state.radio)
        )
        .then(() => {
          this.setState({
            successful: true,
          });
        })
        .catch(() => {
          this.setState({
            successful: false,
          });
        });
    }
  }




  
  render() {
    const { message } = this.props;

    return (
      <div className= "container">

        <div>
          <img src={Pic} alt="signupImage" className="img-fluid "/>
        </div>

        <div className="form col-md-6 offset-md-3">

          <div className="title">Sign Up 
          </div>

          <div className= "container2">


          <Form
            onSubmit={this.handleRegister}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
              <br></br>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder="Enter a username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder="Enter your email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />

                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Enter a password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                  <div 
                    style={{ borderTop: "20px solid #121e42 "}}>
                  </div>

                  <label>I agree to the terms and conditions.</label>
                  <Input
                    type="radio"
                    className="form-control"
                    name="radio"
                    value={this.state.password}
                    onChange={this.onChangeRadio}
                    validations={[ vradio ]}
                  />
                  <div 
                    style={{ borderTop: "20px solid #121e42 "}}>
                  </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />

          </Form>
        </div>
      </div>

        <br></br>
        <br></br>
        <br></br>

        <div 
          style={{ borderTop: "5px solid #121e42 "}}>
        </div>

        <br></br>

        <div>
          <h2 className= "quote">"If you can't fly then run, if you can't run then walk, if you can't walk then crawl, but whatever you do you have to keep moving forward.” -Martin Luther King Jr.</h2>
        </div>

        <br></br>

        <div 
          style={{ borderTop: "5px solid #121e42 "}}>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}
//export default Signup;
export default connect(null, mapStateToProps)(Signup);
