// login.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Hostlayout from "@src/host/host_layout";
import LoginWidget from './loginWidget';
import SignupWidget from './signupWidget';
import { safeCredentials, handleErrors } from '../utils/fetchHelper';

import "./host_login.scss"

class Hostlogin extends React.Component {
  state = {
    authenticated: false,
    show_login: true,
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated,
        })
      })
  }

  toggle = () => {
    this.setState({
      show_login: !this.state.show_login,
    })
  }

  render () {
    const { authenticated, show_login } = this.state;
    if (authenticated) {
      return (
        <Hostlayout>
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
                <div className="border p-4">
                  <p className="mb-0">You are already logged in 🙂</p>
                </div>
              </div>
            </div>
          </div>
        </Hostlayout>
      );
    };

    return (
      <Hostlayout>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
              <div className="border p-4">
                {show_login ? <LoginWidget toggle={this.toggle} /> : <SignupWidget toggle={this.toggle} />}
              </div>
            </div>
          </div>
        </div>
      </Hostlayout>
    )
  }
}

export default Hostlogin;