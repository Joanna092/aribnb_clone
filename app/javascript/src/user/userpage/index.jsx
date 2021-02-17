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
      user_bookings: [],
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
        fetch(`/api/users/${this.state.username}/bookings`) 
          .then(handleErrors)
          .then((data) => {
            console.log(data);
            this.setState({
              user_bookings: data.bookings,
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

  deleteBooking(id) {
    console.log(`deleted booking with id: ${id}`);
    fetch(
      `/api/users/${this.state.username}/bookings/${id}`,   
      safeCredentials({
        method: "DELETE",
      })
    )
      .then(handleErrors)
      .catch((error) => {
        this.setState({
          error: "Could not delete booking",
        });
        console.log("Could not delete bookings");
      })
      .then(() => {
        fetch(`/api/users/${this.state.username}/bookings`)
          .then(handleErrors)
          .then((data) => {
            this.setState({ user_bookings: data.bookings });
          });
      });
  }

  render() {
    const { user_bookings } = this.state;
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
            {user_bookings.map(booking => {
              return (
                <div key={booking.id} className="col-6 col-lg-4 mb-4 property">
                  <h6 className="mb-0">{booking.property.title}</h6>
                  <b><a href={`/property/${booking.property.id}`} className="text-body text-decoration-none">See your property</a></b>
                {/* <div className="property-image mb-1 rounded" style={{ backgroundImage: `url(${booking.property.image_url})` }} /> */}
                    <p className="text-uppercase mb-0 text-secondary">{booking.start_date}</p>
                    <p className="text-uppercase mb-0 text-secondary">{booking.end_date}</p>
                    {booking.paid ? <p className="mb-0">PAID</p> : <span><p>not paid yet</p><button>Finish payment process</button></span>}
                  

                  <button
                      onClick={() => this.deleteBooking(booking.id)}
                      type="button"
                      className="btn btn-danger"
                    >
                      Delete your booking
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
