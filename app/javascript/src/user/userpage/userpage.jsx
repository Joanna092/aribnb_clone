import React from "react";
import ReactDOM from "react-dom";
import Layout from "@src/user/layout";
import { safeCredentials, handleErrors } from "../utils/fetchHelper";

class Userpage extends React.Component {

  constructor() {
    super();
    this.state = {
     // authenticated: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  /*
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
  */

  handleClick() {
    fetch("/api/logout")
      .then(handleErrors)
      .then(function (data) {
        console.log(data);
        window.location = "/";
      });
  }


  render() {
    return (
      <Layout>
        <p>User Page</p>
        <button
          className="btn btn-danger text-right"
          onClick={this.handleClick}
        >
          Log Out
        </button>
      </Layout>
    );
  }
}

export default Userpage;
