import React, { Component } from 'react'
import './register.css'
import { Button, Segment, Image, Message, Header, Icon, Container, Grid, Form } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { app } from '../firebaseConfig'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./login.css"
import Avatar from "../img/avatar.png";

export default class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
            errorMsg: "",
            successMsg: "",
            loader: false
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    handleSubmit = (e) => {
        e.preventDefault();

        const auth = getAuth();
        this.setState({ loader: true })

        signInWithEmailAndPassword(auth, this.state.email, this.state.password)
            .then((userCredential) => {
                console.log(userCredential);
                this.setState({ loader: false });
                this.setState({ email: "" });
                this.setState({ password: "" });
                this.setState({ successMsg: "Login Successfully" });

                this.setState({ errorMsg: "" })

            })
            .catch((error) => {
                this.setState({ loader: false })
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                console.log(errorMessage);
                if (errorCode.includes("user-not-found")) {
                    this.setState({ errorMsg: "Email is not found" })
                } else if (errorCode.includes("wrong-password")) {
                    this.setState({ errorMsg: "Password is not valid" })
                } else if (!this.state.email || !this.state.password) {
                    this.setState({ errorMsg: "Please Fill All The Data" })
                }

                this.setState({ successMsg: "" })

            });

    }


    render() {

        const { email, password, errorMsg, successMsg, loader } = this.state;

        return (
            <div className="register login">
                <Container>
                    <Grid textAlign="center" verticalAlign="middle">
                        <Grid.Column width="8">
                            <Segment>
                                <div className="awesomeStyle">
                                    <Header as='h2' color="blue" as='h2' icon textAlign='center'>
                                        <Image circular src={Avatar} /> <br />
                                        Login Page
                                    </Header>

                                    {errorMsg ? <Message negative>
                                        <Message.Header>{errorMsg}</Message.Header>
                                    </Message> : ""}

                                    {successMsg ? <Message positive>
                                        <Message.Header>{successMsg}</Message.Header>
                                    </Message> : ""}

                                    <Form onSubmit={this.handleSubmit}>

                                        <Form.Field >
                                            <label style={{ fontSize: "1.2rem" }}>
                                                <Icon icon name="mail"></Icon>
                                                Email</label>
                                            <input value={email} name="email" onChange={this.handleChange} type="email" style={{ fontSize: "1.3rem" }} placeholder='Type your Email' />
                                        </Form.Field>

                                        <Form.Field >
                                            <label style={{ fontSize: "1.2rem" }}>
                                                <Icon icon name="lock"></Icon>
                                                Password</label>
                                            <input value={password} name="password" onChange={this.handleChange} type="password" style={{ fontSize: "1.3rem" }} placeholder='Your Password' />
                                        </Form.Field>
                                        <Button className={!loader ? "primary" : "disabled loading"} type='submit'>Submit</Button>
                                    </Form>
                                </div>
                            </Segment>
                            <Message>
                                <Message.Header>If don't have an account ? <Link to="/register">Sign up</Link> </Message.Header>
                            </Message>
                            <h2 className="verticalText">Secure Chat</h2>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        )
    }
}
