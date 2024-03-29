import React from 'react';
import { safeCredentials, handleErrors } from "./utils/fetchHelper";

class Hostlayout extends React.Component { 

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
    window.location = "/hosting/add_property";
  }

  render() {
    const { authenticated } = this.state;
    if (!authenticated) {
      return (

    <div className="d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand navbar-light bg-light">
        <a href="/hosting"><span className="navbar-brand mb-0 h1 text-danger">Airbnb - Host</span></a>
        <a href="/"><span className="navbar-brand mb-0 text-secondary">Book property as a guest</span></a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
          </ul>
        </div>
      </nav>
      {this.props.children}
      <footer className="p-3 bg-light mt-auto">
        <div>
          <p className="mr-3 mb-0 text-secondary">Airbnb Clone</p>
        </div>
      </footer>
    </div>
  );
 } else {
  return (
    <div className="d-flex flex-column min-vh-100">
    <nav className="navbar navbar-expand navbar-light bg-light">
      <a href="/hosting"><span className="navbar-brand mb-0 h1 text-danger">Airbnb - Host</span></a>
      <a href="/"><span className="navbar-brand mb-0 text-secondary">Book property as a guest</span></a>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
                  <button
                    className="btn btn-secondary float-right"
                    onClick={this.handleClick2}
                  >
                    Add property
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
    <footer className="p-3 bg-light mt-auto">
      <div>
        <p className="mr-3 mb-0 text-secondary">Airbnb Clone</p>
      </div>
    </footer>
  </div>
);
  }
 }
}

export default Hostlayout;