import React, { Component } from 'react'
import { connect } from 'react-redux'
import { set_current_group } from "../../actions/index"
import { Menu, Message, Button, Header, Segment, Icon, Modal, Form } from 'semantic-ui-react'
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { app } from '../../firebaseConfig'
import "./groups.css"

class Groups extends Component {
    constructor(props) {
        super(props)

        this.state = {
            groups: [],
            modal: false,
            groupname: "",
            grouptagline: "",
            error: "",
            firstload: true,
            active: ""
        }
    }

    openModal = () => {
        this.setState({ modal: true })
    }

    closeModal = () => {
        this.setState({ modal: false })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.isFormValid(this.state)) {
            const db = getDatabase();
            const postListRef = ref(db, 'groups');
            const newPostRef = push(postListRef);
            set(newPostRef, {
                groupname: this.state.groupname,
                grouptagline: this.state.grouptagline,
                createdBy: this.props.userName
            }).then(() => {
                this.setState({ modal: false })
                this.setState({ groupname: "" })
                this.setState({ grouptagline: "" })
                this.setState({ error: "" })
            })

        } else {
            this.setState({ error: "please fill all the data" })
        }
    }

    isFormValid = ({ groupname, grouptagline }) => {
        if (groupname && grouptagline) {
            return true
        } else {
            return false
        }
    }

    componentDidMount() {
        let groupAfterLoad = []
        const db = getDatabase(app);
        const starCountRef = ref(db, 'groups/');
        onValue(starCountRef, (snapshot) => {

            snapshot.forEach(item => {
                let groupdata = {
                    id: item.key,
                    groupname: item.val().groupname,
                    grouptagline: item.val().grouptagline,
                    createdBy: item.val().createdBy
                }
                groupAfterLoad.push(groupdata);
            });
            this.setState({ groups: groupAfterLoad }, this.addGroupOnLoad)

        });
    }

    addGroupOnLoad = () => {
        let firstGroup = this.state.groups[0]
        if (this.state.firstload && this.state.groups.length > 0) {
            this.props.set_current_group(firstGroup)
            this.setState({ active: firstGroup.id })
        }
        this.setState({ firstload: false })
    }

    groupChange = (group) => {
        this.props.set_current_group(group);
        this.setState({ active: group.id })
    }

    render() {
        return (
            <div>
                <Header as="h4" style={{ color: "#fff", marginLeft: "2rem", marginTop: "2rem" }}>Groups({this.state.groups.length})
                    <Icon onClick={this.openModal} style={{ marginLeft: "6rem", cursor: "pointer" }} name="add squire"></Icon>
                </Header>

                <Menu text vertical style={{ marginLeft: "2rem", marginTop: "2rem" }}>

                    {this.state.groups.map((item) => (

                        <Menu.Item className={item.id == this.state.active ? "active" : "normal"} onClick={() => this.groupChange(item)} header>{item.groupname}</Menu.Item >
                    ))}

                </Menu>

                <Modal
                    basic
                    onClose={false}
                    onOpen={true}
                    open={this.state.modal}
                    size='small'
                >
                    <Header icon style={{ background: "red !important" }}>
                        <Icon name='group' />
                        Add Group Details
                    </Header>

                    <Modal.Content>
                        <Segment>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Field>
                                    <label>Group Name</label>
                                    <input name="groupname" placeholder='Group Name' onChange={this.handleChange} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Group Tagline</label>
                                    <input name="grouptagline" onChange={this.handleChange} placeholder='Group Tagline' />
                                </Form.Field>
                            </Form>
                        </Segment>
                    </Modal.Content>
                    {this.state.error ? <Message warning>
                        <Message.Header>{this.state.error}</Message.Header>
                    </Message> : ""}

                    <Modal.Actions>
                        <Button color='green' inverted onClick={this.handleSubmit}>
                            <Icon name='checkmark' /> Add Group
                        </Button>
                        <Button color='green' inverted onClick={this.closeModal}>
                            <Icon name='checkmark' /> Close
                        </Button>
                    </Modal.Actions>
                </Modal>

            </div>

        )
    }
}

export default connect(null, { set_current_group })(Groups)