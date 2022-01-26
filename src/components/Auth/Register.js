import React, { Component } from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  getDatabase,
  ref,
  set,
} from "../../firebase-cinfig";

export default class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    errorMsg: "",
    successMsg: "",
    loader: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  isFormEmpty = ({ username, email, password, confirmPassword }) => {
    if (
      !username.length ||
      !email.length ||
      !password.length ||
      !confirmPassword
    ) {
      this.setState({ errorMsg: "Fill all the field" });
    } else if (password.length < 8 || confirmPassword.length < 8) {
      this.setState({ errorMsg: "Password should be greater than 8 carecter" });
    } else if (password !== confirmPassword) {
      this.setState({ errorMsg: "Password dose not match" });
    } else {
      return true;
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.isFormEmpty(this.state)) {
      this.setState({ loader: true });
      createUserWithEmailAndPassword(
        getAuth(),
        this.state.email,
        this.state.password
      )
        .then((userCredential) => {
          console.log(userCredential.user.uid);

          updateProfile(getAuth().currentUser, {
            displayName: this.state.username,
          })
            .then(() => {
              this.writeUserData(userCredential);
            })
            .then(() => {
              this.setState({ username: "" });
              this.setState({ email: "" });
              this.setState({ password: "" });
              this.setState({ confirmPassword: "" });
              this.setState({ errorMsg: "" });
              this.setState({ successMsg: "Account created successfully" });
              this.setState({ loader: false });
            })
            .catch((error) => {
              this.setState({ loader: false });
              const errorCode = error.code;
              if (errorCode) {
                this.setState({ errorMsg: "User name not valid" });
              }
            });
        })
        .catch((error) => {
          this.setState({ loader: false });
          const errorCode = error.code;
          if (errorCode.includes("email")) {
            this.setState({ errorMsg: "Email Already in use" });
          }
        });
    }
  };

  writeUserData = (user) => {
    const db = getDatabase();
    set(ref(db, "users/" + user.user.uid), {
      username: this.state.username,
    });
  };

  render() {
    const {
      username,
      email,
      password,
      confirmPassword,
      errorMsg,
      successMsg,
      loader,
    } = this.state;

    return (
      <Grid
        textAlign="center"
        verticalAlign="center"
        style={{ marginTop: "100px" }}
      >
        <Grid.Column style={{ maxWidth: 500 }}>
          <Header as="h1" icon textAlign="center" color="blue">
            <Icon name="group" />
            Let's Join Ajaira Pechal
          </Header>
          <Segment stacked>
            {/* error msg Start*/}
            {errorMsg ? (
              <Message error>
                <Message.Header>{errorMsg}</Message.Header>
              </Message>
            ) : (
              ""
            )}
            {/* error msg end*/}

            {/* success msg */}
            {successMsg ? (
              <Message positive>
                <Message.Header>{successMsg}</Message.Header>
              </Message>
            ) : (
              ""
            )}
            {/* success msg end*/}
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <label style={{ textAlign: "left" }}>
                  <Icon name="user" />
                  User Name
                </label>
                <input
                  name="username"
                  placeholder="First Name"
                  type="text"
                  onChange={this.handleChange}
                  value={username}
                />
              </Form.Field>
              <Form.Field className={errorMsg.includes("Email") ? "error" : ""}>
                <label style={{ textAlign: "left" }}>
                  <Icon name="mail" />
                  Email
                </label>
                <input
                  name="email"
                  placeholder="Your Email"
                  type="email"
                  onChange={this.handleChange}
                  value={email}
                />
              </Form.Field>
              <Form.Field
                className={errorMsg.includes("Password") ? "error" : ""}
              >
                <label style={{ textAlign: "left" }}>
                  <Icon name="key" />
                  Password
                </label>
                <input
                  name="password"
                  placeholder="Your Password"
                  type="password"
                  onChange={this.handleChange}
                  value={password}
                />
              </Form.Field>

              <Form.Field
                className={errorMsg.includes("Password") ? "error" : ""}
              >
                <label style={{ textAlign: "left" }}>
                  <Icon name="repeat" />
                  Confirm Password
                </label>
                <input
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  type="password"
                  onChange={this.handleChange}
                  value={confirmPassword}
                />
              </Form.Field>

              <Button
                className={loader ? "loading primary disabled" : ""}
                color="blue"
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </Segment>
          <Message>
            <Message.Header>
              Already have an account? <Link to="/login">Log In</Link>
            </Message.Header>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
