import React from 'react'
import { Link, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from './firebaseConfig'
import { setUser, removeUser } from './actions';
import { connect } from 'react-redux';
import './app.css';
import { Grid, Image, Dimmer, Loader, Segment } from 'semantic-ui-react'
import ColorPanel from './components/colorpanel/ColorPanel';
import SidePanel from './components/sidepanel/SidePanel';
import Message from './components/message/Message';
import MetaPanel from './components/metapanel/MetaPanel';

class App extends React.Component {

  componentDidMount() {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.props.setUser(user)
      } else {
        this.props.removeUser()
      }
    });
  }

  render() {
    return (
      <>

        {
          this.props.isLoading ?

            <Segment style={{ height: "100vh", width: "100vw" }}>
              <Dimmer active>
                <Loader size='big'>Loading</Loader>
              </Dimmer>
            </Segment>
            :
            <>
              <Grid columns='equal' className="app">
                <Grid.Row>
                  <Grid.Column width={1}>
                    <ColorPanel />
                  </Grid.Column>

                  <Grid.Column width={4}>
                    <SidePanel userName={this.props.userName.displayName} />
                  </Grid.Column>

                  <Grid.Column width={7}>
                    <Message userid={this.props.userName} groupid={this.props.groupid} />
                  </Grid.Column>

                  <Grid.Column width={4}>
                    <MetaPanel />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </>

        }

      </>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.user.isLoading,
  userName: state.user.currentUser,
  groupid: state.group.currentGroup
})
export default connect(mapStateToProps, { setUser, removeUser })(App)
