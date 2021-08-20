import React from "react";
import ReactDOM from "react-dom";
import Layout from "@src/user/layout";
import { safeCredentials, handleErrors } from "../utils/fetchHelper";
import '../home.scss';
import dayjs from "dayjs";

class Userpage extends React.Component {
  constructor() {
    super();
    this.state = {
      properties: [],
      startDate: null,
      endDate: null,
      loading: true,
      user_bookings: [],
      booking_id: 32,
    };
  }

  componentDidMount() {
        fetch(`/api/users/${this.props.user_data.username}/bookings`) 
          .then(handleErrors)
          .then((data) => {
            console.log(data);
            this.setState({
              user_bookings: data.bookings,
            });
      });
  }

  deleteBooking(id) {
    console.log(`deleted booking with id: ${id}`);
    fetch(
      `/api/users/${this.props.user_data.username}/bookings/${id}`,   
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
        fetch(`/api/users/${this.props.user_data.username}/bookings`)
          .then(handleErrors)
          .then((data) => {
            this.setState({ user_bookings: data.bookings });
          });
      });
  }


 submitBooking = (property_id, booking_id, startDate, endDate) => {

    console.log(property_id)
    console.log(booking_id)
    console.log(startDate)
    console.log(endDate)
    console.log(dayjs(startDate).format('MMM DD YYYY'))
    console.log(process.env.STRIPE_PUBLISHABLE_KEY) 

    fetch(`/api/users/${this.props.user_data.username}/bookings/`, safeCredentials({
      method: 'POST',
        body: JSON.stringify({
          booking: {
            property_id: property_id,
            start_date: dayjs(startDate).format('MMM DD YYYY'),
            end_date: dayjs(endDate).format('MMM DD YYYY')
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

  initiateStripeCheckout = (booking_id) => {
    return fetch(`/api/charges?booking_id=${booking_id}&cancel_url=${window.location.pathname}`, safeCredentials({
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
        
        <div className="text-left ml-2 mt-2">
              <p><b>Your username:</b> {this.props.user_data.username}</p>
              <p><b>Your email:</b> {this.props.user_data.email}</p>
            </div>
          

        <h2 className="text-center">Your bookings</h2>
        <div className="container pt-4">
          <div className="row">
            {user_bookings.map(booking => {
              return (
                <div key={booking.id} className="col-6 col-lg-4 mb-4 property">
                  <h6 className="mb-2 text-center">{booking.property.title}</h6>
                  <a href={`/property/${booking.property.id}`}><div className="property-image mb-1 rounded" style={{ backgroundImage: `url(${booking.property.image_url})` }} /> </a>
                    <p className="text-uppercase mb-0 text-secondary text-center">{booking.start_date} - {booking.end_date}</p>
                    <p className="text-center text-base"><b><a href={`/${this.props.user_data.username}/yourproperty/${booking.id}`}>See your property</a></b></p>
                    <div className="grid">
                    <div className="grid-row">
                    {
                    booking.paid ? 
                    
                    <button 
                    className="btn btn-warning narrow">PAID
                    </button> 
                    
                    : 
                   
                    <button 
                    onClick={() => this.submitBooking(booking.property.id, booking.id, booking.start_date, booking.end_date)}
                    className="btn btn-secondary wide"
                    >Finish payment process</button>
                    }
                   
                  <button
                      onClick={() => this.deleteBooking(booking.id)}
                      type="button"
                      className="btn btn-danger wide"
                    >
                      Delete your booking
                    </button>
                    </div>
                  </div>
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
   const node = document.getElementById('params');
   const user_data = JSON.parse(node.getAttribute('data-user'));

  ReactDOM.render(
    <Userpage user_data={user_data} />,
    document.body.appendChild(document.createElement("div"))
  );
});
