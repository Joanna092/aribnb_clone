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
          className="btn btn-danger"
          onClick={this.handleClick}
        >
          Log Out
        </button>
      </Layout>
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
 // const node = document.getElementById('params');
 // const user_data = JSON.parse(node.getAttribute('data-user'));

 ReactDOM.render(
   <Userpage /*user_data={user_data} */ />,
   document.body.appendChild(document.createElement("div"))
 );
});

