import React, { Component } from 'react'
import './register.css'
import { Button, Segment, Message, Header, Icon, Container, Grid, Checkbox, Form } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { app } from '../firebaseConfig'
import { getAuth, updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";


export default class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            email: "",
            password: "",
            confirmpassword: "",
            errorMsg: "",
            successMsg: "",
            loader: false
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    isFormEmpty = ({ username, email, password, confirmpassword, errorMsg }) => {
        if (!username || !email || !password || !confirmpassword) {
            this.setState({ errorMsg: "Please fill all the Data" })
        } else if (password.length && confirmpassword.length < 7) {
            this.setState({ errorMsg: "Password should be at least 8" })
        } else if (password !== confirmpassword) {
            this.setState({ errorMsg: "Password Doesn't Match" })
        } else {
            return true;
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.isFormEmpty(this.state)) {
            const auth = getAuth();
            this.setState({ loader: true })
            createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
                .then((userCredential) => {
                    updateProfile(auth.currentUser, {
                        displayName: this.state.username
                    }).then(() => {
                        this.writeUserData(userCredential.user.uid)
                    }).then(() => {
                        this.setState({ username: "" });
                        this.setState({ email: "" });
                        this.setState({ password: "" });
                        this.setState({ confirmpassword: "" });
                        this.setState({ errorMsg: "" });
                        this.setState({ successMsg: "Account Created Successfully" })
                        this.setState({ loader: false });
                        this.setState({ errorMsg: "" })
                    }).catch((error) => {
                        this.setState({ loader: false });
                        this.setState({ errorMsg: "Username is not valid" })
                    })
                })
                .catch((error) => {
                    this.setState({ loader: false });
                    this.setState({ errorMsg: "Email already exist" })
                    this.setState({ successMsg: "" })
                    console.log(error);
                });
        }
    }

    writeUserData = (userId) => {
        const db = getDatabase(app);
        set(ref(db, 'users/' + userId), {
            username: this.state.username,
            email: this.state.email
        });
    }

    render() {

        const { username, email, password, confirmpassword, errorMsg, successMsg, loader } = this.state;

        return (
            <div className="register">
                <Container>
                    <Grid textAlign="center" verticalAlign="middle">
                        <Grid.Column width="8">
                            <Segment>
                                <Header color="blue" as='h2' icon textAlign='center'>
                                    <Icon name='users' circular />
                                    Lets Join MERN ADDA
                                </Header>

                                {errorMsg ? <Message negative>
                                    <Message.Header>{errorMsg}</Message.Header>
                                </Message> : ""}

                                {successMsg ? <Message positive>
                                    <Message.Header>{successMsg}</Message.Header>
                                </Message> : ""}

                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Field>
                                        <label style={{ fontSize: "1.2rem", color: "#333" }}> <Icon icon name="user"></Icon>User Name</label>
                                        <input value={username} name="username" onChange={this.handleChange} type="text" style={{ fontSize: "1.3rem" }} placeholder='Type your Name' />
                                    </Form.Field>
                                    <Form.Field className={errorMsg.match(/email/i) ? "error" : ""}>
                                        <label style={{ fontSize: "1.2rem" }}>
                                            <Icon icon name="mail"></Icon>
                                            Email</label>
                                        <input value={email} name="email" onChange={this.handleChange} type="email" style={{ fontSize: "1.3rem" }} placeholder='Type your Email' />
                                    </Form.Field>
                                    <Form.Field className={errorMsg.match(/password/i) ? "error" : ""}>
                                        <label style={{ fontSize: "1.2rem" }}>
                                            <Icon icon name="lock"></Icon>
                                            Password</label>
                                        <input value={password} name="password" onChange={this.handleChange} type="password" style={{ fontSize: "1.3rem" }} placeholder='Your Password' />
                                    </Form.Field>
                                    <Form.Field className={errorMsg.match(/password/i) ? "error" : ""}>
                                        <label style={{ fontSize: "1.2rem", color: "#333" }}>
                                            <Icon icon name="repeat"></Icon>
                                            Confirm Password</label>
                                        <input value={confirmpassword} name="confirmpassword" onChange={this.handleChange} type="password" style={{ fontSize: "1.3rem" }} placeholder='Confirm your password' />
                                    </Form.Field>
                                    <Button className={!loader ? "primary" : "disabled loading"} type='submit'>Submit</Button>
                                </Form>
                            </Segment>
                            <Message>
                                <Message.Header>Allready have an account ? <Link to="/login">Log In</Link> </Message.Header>
                            </Message>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        )
    }
}
