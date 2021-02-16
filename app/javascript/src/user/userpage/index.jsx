import React from "react";
import ReactDOM from "react-dom";
import Layout from "@src/user/layout";
import { safeCredentials, handleErrors } from "../utils/fetchHelper";

class Userpage extends React.Component {
  constructor() {
    super();
    this.state = {
      properties: [],
      loading: true,
      user_properties: [],
      username: " ",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch("/api/authenticated")
      .then(handleErrors)
      .then((data) => {
        console.log(data);
        this.setState({
          username: data.username,
        });
      })
      .then(() => {
        fetch(`/api/users/${this.state.username}/properties`) 
          .then(handleErrors)
          .then((data) => {
            console.log(data);
            this.setState({
              user_properties: data.properties,
            });
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

  render() {
    const { user_properties } = this.state;
    return (
      <Layout>
        <div className="container">
        <h3 className="text-center">Your profile</h3>
          <div className="row">
            <div className="col-10">
              <p>Username: {this.state.username}</p>
            </div>
            <div className="col-2">
              <button className="btn btn-danger" onClick={this.handleClick}>
                Log Out
              </button>
            </div>
          </div>
        </div>

        <h3 className="text-center">Your bookings</h3>
        <div className="container pt-4">
          <div className="row">
            {user_properties.map(property => {
              return (
                <div key={property.id} className="col-6 col-lg-4 mb-4 property">
                  <a href={`/property/${property.id}`} className="text-body text-decoration-none">
                    <div className="property-image mb-1 rounded" style={{ backgroundImage: `url(${property.image_url})` }} />
                    <p className="text-uppercase mb-0 text-secondary"><small><b>{property.city}</b></small></p>
                    <h6 className="mb-0">{property.title}</h6>
                    <p className="mb-0"><small>${property.price_per_night} USD/night</small></p>
                  </a>
                  <button
                      onClick={() => this.editProperty(property.id)}
                      type="button"
                      className="btn btn-warning"
                    >
                      Edit
                    </button>

                  <button
                      onClick={() => this.deleteProperty(property.id)}
                      type="button"
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                </div>
              )
            })}
          </div>
        </div>
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
