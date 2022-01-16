import React, { Component } from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar, Divider, Button } from 'semantic-ui-react'
import "./colorpanel.css"

export default class ColorPanel extends Component {
    render() {
        return (
            <>
                <Sidebar
                    as={Menu}
                    animation='overlay'
                    icon='labeled'
                    inverted
                    vertical
                    visible
                    width='very thin'
                >
                    <Menu.Item as='a'>
                        <Icon name='add' />
                        Add
                    </Menu.Item>
                    {/* <Button primary icon="add" /> */}
                </Sidebar>
            </>
        )
    }
}
