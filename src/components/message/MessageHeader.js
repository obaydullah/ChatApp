import React, { Component } from 'react'
import { Header, Segment, Input } from 'semantic-ui-react'

export default class MessageHeader extends Component {


    render() {
        return (
            <div style={{ marginTop: "1rem" }}>
                <Segment>
                    <Header as='h2' icon='star' content={this.props.totaluser.length > 1 ? `${this.props.totaluser.length} users` : `${this.props.totaluser.length} user`} />
                    <Input onChange={this.props.handleSearchChange} icon='search' placeholder='Search...' style={{ width: "100%" }} />

                </Segment>
            </div >
        )
    }
}