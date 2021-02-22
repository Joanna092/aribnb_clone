import React from "react";
import ReactDOM from "react-dom";
import Layout from "@src/user/layout";
import { safeCredentials, handleErrors } from "../utils/fetchHelper";

import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

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


  submitBooking = (id, startDate, endDate) => {
    //if (e) { e.preventDefault(); }
    console.log(startDate, endDate);

    fetch(`/api/bookings`, safeCredentials({
      method: 'POST',
        body: JSON.stringify({
          booking: {
            property_id: id,
            start_date: startDate,
            end_date: endDate,
          }
        })
    }))
      .then(handleErrors)
      .then(response => {
        return this.initiateStripeCheckout(response.booking.id)
      })
      .catch(error => {
        console.log(error);
      })
  }

  initiateStripeCheckout = (id) => {
    return fetch(`/api/charges?booking_id=${id}&cancel_url=${window.location.pathname}`, safeCredentials({
      method: 'POST',
    }))
      .then(handleErrors)
      .then(response => {

        const stripe = Stripe(process.env.STRIPE_PUBLISHABLE_KEY);
      
       
        stripe.redirectToCheckout({
          // Make the id field from the Checkout Session creation API response
          // available to this file, so you can provide it as parameter here
          // instead of the {{CHECKOUT_SESSION_ID}} placeholder.

           sessionId: response.charge.checkout_session_id,
        }).then((result) => {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer
          // using `result.error.message`.
        });
      })
      .catch(error => {
        console.log(error);
      })
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
                    {
                    booking.paid ? <p className="mb-0">PAID</p> : 
                    <button onClick={() => this.submitBooking(booking.id, booking.start_date, booking.end_date)}
                    >Finish payment process</button>
                    }
                  

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
