import React from 'react'
import { Link, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from './firebaseConfig'
import './app.css'

export default class App extends React.Component {

  componentDidMount() {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
      } else {
      }
    });
  }

  render() {
    return (
      <div>
        <Link style={{ background: "green", color: "#fff", display: "inline-block", padding: "1rem 2rem", textTransform: "uppercase", borderRadius: "1rem", fontWeight: "bold" }} to="/login">Click me to Login</Link>
      </div>
    )
  }
}
