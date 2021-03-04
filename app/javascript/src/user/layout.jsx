import React from 'react';
import { safeCredentials, handleErrors } from "./utils/fetchHelper";

class Layout extends React.Component {

  constructor() {
    super();
    this.state = {
      authenticated: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
  }
  
  componentDidMount() {
    fetch("/api/authenticated")
      .then(handleErrors)
      .then((data) => {
        console.log(data)
        this.setState({
          authenticated: data.authenticated,
        });
      });
  }

  handleClick() {
    fetch("/api/logout")
      .then(handleErrors)
      .then(function (data) {
        console.log(data);
        window.location = "/";
      });
  }

  handleClick2() {
    window.location = "/userpage";
  }

  render() {
    const { authenticated } = this.state;
    if (!authenticated) {
      return (
    <React.Fragment>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <a href="/"><span className="navbar-brand mb-0 h1 text-danger">Airbnb</span></a>
        <a href="/hosting"><span className="navbar-brand mb-0 text-secondary">Rent property as a host</span></a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/login">Login / Signup</a>
            </li>
          </ul>
        </div>
      </nav>
      {this.props.children}
      <footer className="p-3 bg-light">
        <div>
          <p className="mr-3 mb-0 text-secondary">Airbnb Clone</p>
        </div>
      </footer>
    </React.Fragment>
  );
} else {
  return (
    <React.Fragment>
    <nav className="navbar navbar-expand navbar-light bg-light">
      <a href="/"><span className="navbar-brand mb-0 h1 text-danger">Airbnb</span></a>
      <a href="/hosting"><span className="navbar-brand mb-0 text-secondary">Rent property as a host</span></a>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
                  <button
                    className="btn btn-secondary float-right"
                    onClick={this.handleClick2}
                  >
                    Your profile
                  </button>
                  <button
                    className="btn btn-danger float-right ml-2"
                    id="log-out"
                    onClick={this.handleClick}
                  >
                    Log Out
                  </button>
        </ul>
      </div>
    </nav>
    {this.props.children}
    <footer className="p-3 bg-light">
      <div>
        <p className="mr-3 mb-0 text-secondary">Airbnb Clone</p>
      </div>
    </footer>
  </React.Fragment>
);
}
  }
}

export default Layout;