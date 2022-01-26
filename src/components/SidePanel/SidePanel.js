import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import UserPanel from "./UserPanel";
import Groups from "./Groups";

export default class SidePanel extends Component {
  render() {
    return (
      <Menu
        size="large"
        fixed="left"
        vertical
        style={{ background: "#5353c2" }}
      >
        <UserPanel userName={this.props.userName}></UserPanel>
        <Groups userName={this.props.userName} />
      </Menu>
    );
  }
}
