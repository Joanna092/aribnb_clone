import React from "react";
import ReactDOM from "react-dom";
import Layout from "@src/user/layout";
import { safeCredentials, handleErrors } from "../utils/fetchHelper";

class Userpage extends React.Component {
  constructor() {
    super();
    this.state = {
      host_properties: [], //this should be user properties 
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch(`/api/users/Joanna092/properties`)
      .then(handleErrors)
      .then((data) => {
        console.log(data)
        this.setState({
          user_properties: data.properties, //I need to get normal user properties, not host's
       });      
  }) 
}

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
        <div className="container">
        <h3 className="text-center">Your profile</h3>
          <div className="row">
            <div className="col">
              <p>Username: </p>
              <p>Email:</p>
            </div>
            <div className="col">
              <button className="btn btn-danger" onClick={this.handleClick}>
                Log Out
              </button>
            </div>
          </div>
        </div>

        <h3 className="text-center">Your bookings</h3>
      </Layout>
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // const node = document.getElementById('params');
  // const user_data = JSON.parse(node.getAttribute('data-user'));

  ReactDOM.render(
    <Userpage /*user_data={user_data}*/ />,
    document.body.appendChild(document.createElement("div"))
  );
});
