import React, { Component } from 'react'
import { Button, Header, Segment, Icon, Modal, Input, Progress } from 'semantic-ui-react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getDatabase, set, push, child, ref as refer } from "firebase/database";
import { app } from "../../firebaseConfig"


class ImageModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            file: "",
            progress: ""
        }
    }


    handleImage = (e) => {
        this.setState({ file: e.target.files[0] })
    }

    handleUpload = () => {
        if (this.state.file) {
            const storage = getStorage(app)
            const storageRef = ref(storage, `files/${this.state.file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, this.state.file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    console.log('Upload is ' + progress + '% done');
                    this.setState({ progress: progress })
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                        const db = getDatabase(app);
                        const postListRef = refer(db, 'files');
                        const newPostRef = push(child(postListRef, `${this.props.groupid.id}`));
                        set(newPostRef, {
                            fileurl: downloadURL,
                            date: Date(),
                            sender: this.props.userid.uid,
                            group: this.props.groupid.id,
                            username: this.props.userid.displayName
                        }).then(() => {
                            console.log("File uploaded to database");
                            this.props.close();
                            this.setState({ progress: "" })
                        })

                    });
                }
            );
        } else {
            console.log("Data nai");
        }
    }

    render() {
        return (
            <Modal
                basic
                onClose={false}
                onOpen={true}
                open={this.props.modal}
                size='small'
            >
                <Header icon style={{ background: "red !important" }}>
                    <Icon name='group' />
                    Upload Files
                </Header>

                <Modal.Content>
                    <Segment>
                        <Input onChange={this.handleImage} icon='upload' placeholder='Search...' type='file' style={{ width: "100%" }} />
                    </Segment>
                </Modal.Content>

                {
                    this.state.progress ?
                        <Progress percent={this.state.progress} inverted progress success>
                            Uploading....
                        </Progress>
                        :
                        ""
                }

                <Modal.Actions>
                    <Button color='green' inverted onClick={this.handleUpload}>
                        <Icon name='checkmark' /> Upload
                    </Button>
                    <Button color='green' inverted onClick={this.props.close}>
                        <Icon name='checkmark' /> Close
                    </Button>
                </Modal.Actions>
            </Modal>

        )
    }
}

export default ImageModal; 