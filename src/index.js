import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from './firebaseConfig'
import App from './App';
import Register from "./components/Register";
import Login from "./components/Login";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(() => { }, composeWithDevTools())


export default class Routing extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tracker: false
    }
  }

  componentDidMount() {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setState({ tracker: true })
      } else {
        this.setState({ tracker: false })
      }
    });
  }

  render() {
    return (
      <>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </>
    )
  }
}


ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Routing />
    </Provider>
  </Router>,
  document.getElementById('root')
);
