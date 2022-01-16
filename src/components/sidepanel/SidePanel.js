import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import UserPanel from './UserPanel'
import Groups from './Groups'

export default class SidePanel extends Component {
    render() {
        return (
            <div>
                <Menu vertical size="large" style={{ background: "#5353C2", height: "100vh" }}>
                    <UserPanel userName={this.props.userName} />
                    <Groups userName={this.props.userName} />
                </Menu>
            </div>
        )
    }
}
