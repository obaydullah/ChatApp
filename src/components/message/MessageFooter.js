import React, { Component } from 'react'
import { Input, Button, Message } from 'semantic-ui-react'
import { getDatabase, ref, set, push, child } from "firebase/database";
import { app } from '../../firebaseConfig'
import ImageModal from './ImageModal';

class MessageFooter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            message: "",
            error: "",
            modal: false
        }
    }

    openModal = () => {
        this.setState({ modal: true });
    }

    closeModal = () => {
        this.setState({ modal: false })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.state.message) {
            this.setState({ error: "Type something" })
            setTimeout(() => {
                this.setState({ error: "" })
            }, 3000)
        } else {
            const db = getDatabase(app);
            const postListRef = ref(db, 'messages');
            const newPostRef = push(child(postListRef, `${this.props.groupid.id}`));
            set(newPostRef, {
                msg: this.state.message,
                date: Date(),
                sender: this.props.userid.uid,
                group: this.props.groupid.id,
                username: this.props.userid.displayName
            }).then(() => {
                this.setState({ message: "" })
            })
        }
    }


    render() {

        return (
            <>
                <Input name="message" value={this.state.message} placeholder='Type your message' style={{ width: "100%" }} onChange={this.handleChange} />


                {
                    this.state.error ?
                        <Message warning>
                            <Message.Header>{this.state.error}</Message.Header>
                        </Message>

                        :

                        ""
                }



                <div style={{ display: "flex" }}>
                    <Button primary onClick={this.handleSubmit}>Add Message</Button>
                    <Button secondary onClick={this.openModal}>Add Media</Button>
                    <ImageModal userid={this.props.userid} groupid={this.props.groupid} modal={this.state.modal} close={this.closeModal} />
                </div>
            </>
        )
    }
}

export default MessageFooter; 