import React, { Component } from 'react'
import { Grid, Menu, Header, Dropdown } from 'semantic-ui-react'
import { app } from '../../firebaseConfig';
import { getAuth, signOut } from '@firebase/auth';

export default class UserPanel extends Component {

    handleLogout = () => {
        const auth = getAuth(app);
        signOut(auth).then(() => {
            alert("Logout");
        }).catch((error) => {
            alert("There is some error")
        });
    }

    trigger = (
        <span>{this.props.userName} </span>
    )

    options = [
        {
            text: <span>Logged as {this.props.userName} </span>
        },
        {
            text: <span>Hello World </span>
        },
        {
            text: <span onClick={this.handleLogout}>Logout</span>
        }
    ]

    render() {
        // console.log(this.props.userName);
        return (
            <>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Header as="h2" textAlign="center" style={{ color: "#fff", marginTop: "2rem" }}>MERN ADDA </Header>

                            <Header as="h4" textAlign="left" color="yellow" style={{ marginLeft: "3rem", zIndex: "99999" }}>
                                <Dropdown trigger={this.trigger} options={this.options} />
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </>
        )
    }
}
