import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/user/layout';
import { handleErrors } from './utils/fetchHelper';

import './home.scss';

class PaymentSuccess extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    property: {},
    user: {},
    loading: true,
    }
    this.handleClick = this.handleClick.bind(this);
  }

    componentDidMount() {
      const property_id = window.location.pathname.replace('/booking/', '').replace('/success','');
      console.log(property_id)
      fetch(`/api/properties/${property_id}`) 
        .then(handleErrors)
        .then(data => {
          console.log(data)
          this.setState({
            property: data.property,
            user: data.user,
            loading: false,
          })
        })
    }

    handleClick() {
      window.location = "/userpage";
    }
      
  render () {

    const {
      id,
      title,
      description,
      city,
      country,
      property_type,
      price_per_night,
      max_guests,
      bedrooms,
      beds,
      baths,
      image_url
    } = this.state.property

    const {
      username
    } = this.state.user

    return (
      <Layout>
        <div className="container">
      
      <div className="booking_completed">
        <h1 className="text-center">Thank You!</h1>
        <p className="text-center">Your payment is complete.</p>
        <p className="text-center">Booked property: <h5 className="text-center">{title}</h5></p>
      </div>
        
        <div className="row">
          
<div className="col">

              <div className="mb-3">
                <h3 className="mb-0"></h3>            
                <img className="img-fluid" src={image_url} alt="property image" />   
                <p className="text-uppercase mb-0 text-secondary"><small>{country}, {city}</small></p>
                <p className="mb-0"><small>Hosted by <b>{username}</b></small></p>
              </div>

              </div>
              <div className="col">

              <div>
                <p className="mb-0 text-capitalize"><b>{property_type}</b></p>
                <p>Price per night: {price_per_night}</p>
                <p>
                  <span className="mr-3">{max_guests} guests</span>
                  <span className="mr-3">{bedrooms} bedroom</span>
                  <span className="mr-3">{beds} bed</span>
                  <span className="mr-3">{baths} bath</span>
                </p>
              </div>
              <hr />
              <p>{description}</p>

              <button 
              className="btn btn-primary"
              onClick={this.handleClick}
              >Go to your bookings</button>
            </div>
          </div>

          </div>
        
      </Layout>
    )
  }
}


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <PaymentSuccess />,
    document.body.appendChild(document.createElement('div')),
  )
})