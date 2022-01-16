import React, { Component } from 'react'
import MessageHeader from './MessageHeader'
import MessageFooter from './MessageFooter'
import { Segment, Comment, Image } from 'semantic-ui-react'
import moment from "moment"
import "./message.css"
import { getDatabase, ref, onChildAdded, onChildChanged, onChildRemoved } from "firebase/database";
import { app } from "../../firebaseConfig"

export default class Message extends Component {

    state = {
        groupmsg: [],
        groupfiles: [],
        usercount: [],
        searchterm: "",
        searchloading: "",
        searchresult: []
    }

    componentDidUpdate(prevProps) {
        let msgarr = [];
        let user = [];

        const db = getDatabase(app);
        const commentsRef = ref(db, 'messages/');
        onChildAdded(commentsRef, (data) => {
            data.forEach((item) => {
                msgarr.push(item.val());
                if (user.indexOf(item.val().sender) === -1 && this.props.groupid.id === item.val().group) {
                    user.push(item.val().sender)
                }
            })
            if (prevProps.groupid) {
                if (prevProps.groupid.groupname !== this.props.groupid.groupname) {
                    this.setState({ groupmsg: msgarr });
                    this.setState({ usercount: user });
                }
            } else {
                this.setState({ groupmsg: msgarr });
                this.setState({ usercount: user });
            }
        });
        onChildChanged(commentsRef, (data) => {
            msgarr = []
            data.forEach((item) => {
                msgarr.push(item.val())
                if (user.indexOf(item.val().sender) === -1 && this.props.groupid.id === item.val().group) {
                    user.push(item.val().sender)
                }
            })
            if (prevProps.groupid) {
                if (prevProps.groupid.groupname !== this.props.groupid.groupname) {
                    this.setState({ groupmsg: msgarr })
                    this.setState({ usercount: user });
                }
            } else {
                this.setState({ groupmsg: msgarr })
                this.setState({ usercount: user });
            }
        });

        // -----Image Upload 

        let filearr = [];

        const filesRef = ref(db, 'files/');
        onChildAdded(filesRef, (data) => {
            data.forEach((item) => {
                filearr.push(item.val())
                if (user.indexOf(item.val().sender) === -1 && this.props.groupid.id === item.val().group) {
                    user.push(item.val().sender)
                }
            })
            if (prevProps.groupid) {
                if (prevProps.groupid.groupname !== this.props.groupid.groupname) {
                    this.setState({ groupfiles: filearr })
                    this.setState({ usercount: user });
                }
            } else {
                this.setState({ groupfiles: filearr })
                this.setState({ usercount: user });
            }
        });
        onChildChanged(filesRef, (data) => {
            filearr = []
            data.forEach((item) => {
                filearr.push(item.val())
                if (user.indexOf(item.val().sender) === -1 && this.props.groupid.id === item.val().group) {
                    user.push(item.val().sender)
                }
            })
            if (prevProps.groupid) {
                if (prevProps.groupid.groupname !== this.props.groupid.groupname) {
                    this.setState({ groupfiles: filearr })
                    this.setState({ usercount: user });
                }
            } else {
                this.setState({ groupfiles: filearr })
                this.setState({ usercount: user });
            }
        });
    }


    handleSearchChange = (e) => {
        this.setState({ searchterm: e.target.value, searchloading: true }, () => this.handleSearchMessage());

    }

    handleSearchMessage = () => {
        let groupmsg = [...this.state.groupmsg];
        let regex = new RegExp(this.state.searchterm, "gi");
        let searchresult = groupmsg.reduce((initvalue, message) => {
            if (message.msg && message.msg.match(regex)) {
                initvalue.push(message)
            }
            return initvalue;
        }, [])

        this.setState({ searchresult: searchresult })
    }

    render() {

        console.log(this.state.searchresult);
        return (
            <div className='hello' style={{ background: "rgba(0,0,0,.5) !important" }}>
                <MessageHeader totaluser={this.state.usercount} handleSearchChange={this.handleSearchChange} />
                <Segment className='overflow'>
                    <Comment.Group>
                        {
                            this.state.searchterm ?
                                this.state.searchresult.map(item => (

                                    item.group == this.props.groupid.id ?
                                        <>
                                            <Comment className={this.props.userid.uid == item.sender ? "right-aligned" : "left-aligned"}>
                                                <Comment.Content>
                                                    <Comment.Author as='a'>{item.username}</Comment.Author>
                                                    <Comment.Metadata>
                                                        <div>{moment(item.date).fromNow()}</div>
                                                    </Comment.Metadata>
                                                    <Comment.Text>{item.msg}</Comment.Text>
                                                </Comment.Content>
                                            </Comment>
                                        </>
                                        :
                                        ""
                                ))
                                :
                                this.state.groupmsg.map(item => (

                                    item.group == this.props.groupid.id ?
                                        <>
                                            <Comment className={this.props.userid.uid == item.sender ? "right-aligned" : "left-aligned"}>
                                                <Comment.Content>
                                                    <Comment.Author as='a'>{item.username}</Comment.Author>
                                                    <Comment.Metadata>
                                                        <div>{moment(item.date).fromNow()}</div>
                                                    </Comment.Metadata>
                                                    <Comment.Text>{item.msg}</Comment.Text>
                                                </Comment.Content>
                                            </Comment>
                                        </>
                                        :
                                        ""
                                ))
                        }

                        {/* ----Image Upload  */}

                        {
                            this.state.groupfiles.map(item => (

                                item.group == this.props.groupid.id ?
                                    <>
                                        <Comment className={this.props.userid.uid == item.sender ? "right-aligned right-aligned img" : "left-aligned"}>
                                            <Comment.Content>
                                                <Comment.Author as='a'>{item.username}</Comment.Author>
                                                <Comment.Metadata>
                                                    <div>{moment(item.date).fromNow()}</div>
                                                </Comment.Metadata>
                                                <Image src={item.fileurl} size='small' />
                                            </Comment.Content>
                                        </Comment>
                                    </>
                                    :
                                    ""
                            ))
                        }

                    </Comment.Group>
                </Segment>
                <MessageFooter userid={this.props.userid} groupid={this.props.groupid} />

            </div >
        )
    }
}
