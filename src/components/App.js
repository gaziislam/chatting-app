import { Component } from "react";
import { getAuth } from "../firebase-cinfig";
import { connect } from "react-redux";
import { setuser, clearuser } from "../actions";
import { Dimmer, Grid, Loader, Segment } from "semantic-ui-react";

import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Message from "./Message/Message";
import MetaPanel from "./MetaPanel/MetaPanel";

class App extends Component {
  componentDidMount() {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        this.props.setuser(user);
      } else {
        this.props.clearuser();
      }
    });
  }
  render() {
    return this.props.isLoading ? (
      <Segment style={{ height: "100vh" }}>
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
      </Segment>
    ) : (
      <>
        <Grid columns="equal" className="app">
          <Grid.Column width={2}>
            <ColorPanel></ColorPanel>
          </Grid.Column>

          <Grid.Column>
            <SidePanel userName={this.props.userName.displayName}></SidePanel>
          </Grid.Column>

          <Grid.Column width={4} style={{ marginLeft: 400 }}>
            <Message></Message>
          </Grid.Column>

          <Grid.Column width={4}>
            <MetaPanel></MetaPanel>
          </Grid.Column>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.user.isLoading,
  userName: state.user.currentUser,
});

export default connect(mapStateToProps, { setuser, clearuser })(App);
