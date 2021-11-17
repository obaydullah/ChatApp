import React from 'react'
import { Link, Route } from "react-router-dom";
import './app.css'

export default function App() {
  return (
    <div>
      <Link style={{ background: "green", color: "#fff", display: "inline-block", padding: "1rem 2rem", textTransform: "uppercase", borderRadius: "1rem", fontWeight: "bold" }} to="/login">Click me to Login</Link>

    </div>
  )
}
