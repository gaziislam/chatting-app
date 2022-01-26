import React, { Component } from "react";
import { getAuth, signOut } from "../../firebase-cinfig";
import { Grid, Header } from "semantic-ui-react";
import { Dropdown } from "semantic-ui-react";

export default class UserPanel extends Component {
  dropOptions = () => [
    {
      text: <span>Loged as {this.props.userName}</span>,
      disabled: true,
    },
    {
      text: <span>Change Profile Pic</span>,
    },
    {
      text: <span onClick={this.handleLogOut}>Log Out</span>,
    },
  ];

  handleLogOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Logout");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <Grid>
        <Grid.Column>
          <Grid.Row>
            <Header
              as="h2"
              style={{
                fontSize: "30px",
                color: "#fff",
                marginLeft: "20px",
                marginTop: "20px",
              }}
            >
              Chatt App
            </Header>
          </Grid.Row>
          <Header
            style={{
              fontSize: "16px",
              color: "#fff",
              marginLeft: "20px",
              marginTop: "20px",
            }}
            as="h4"
          >
            <Dropdown
              trigger={<span>{this.props.userName}</span>}
              options={this.dropOptions()}
            ></Dropdown>
          </Header>
        </Grid.Column>
      </Grid>
    );
  }
}
