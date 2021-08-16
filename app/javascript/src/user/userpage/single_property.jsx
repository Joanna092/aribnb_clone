import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/user/layout';
import { handleErrors } from '../utils/fetchHelper';

import '../home.scss';

class SingleProperty extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        property: {},
        user: {},
        loading: true,
        booking: {}
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    console.log(process.env.STRIPE_PUBLISHABLE_KEY)
    const user_id =  window.location.pathname.replace('/yourproperty/', '');
    console.log(user_id)

    const url = window.location.pathname
    const booking_id = url.substring(url.lastIndexOf("/") + 1);
    console.log(booking_id); 

    fetch(`/api/users/${user_id}/bookings/${booking_id}`) //${this.props.user_data.username} ${booking_id}
      .then(handleErrors)
      .then(data => {
        console.log(data)
        this.setState({
          booking: data.booking,
          user: data.booking.property.user,
          loading: false,
        })
      })
  }

    handleClick() {
      window.location = "/userpage";
    }
      
  render () {

    const { user, loading, booking } = this.state;
    if (loading) {
      return <p>loading...</p>;
    };

    const {
      paid,
    } = booking

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
        image_url,
      } = booking.property 

      const {
        username
      } = user

    return (
      <Layout>
        <div className="container">
      
      <div className="booking_completed">
        <span className="text-center">Your property: <h5 className="text-center">{title}</h5></span>
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
                <p>Price per night: ${price_per_night}</p>
                <p>
                  <span className="mr-3">{max_guests} guests</span>
                  <span className="mr-3">{bedrooms} bedroom</span>
                  <span className="mr-3">{beds} bed</span>
                  <span className="mr-3">{baths} bath</span>
                </p>
              </div>
              <hr />
              <p>{description}</p>

              {
                    paid ? 
                    
                    <button 
                    className="btn btn-warning narrow">PAID
                    </button> 
                    
                    : 
                   
                    <button 
                    className="btn btn-secondary wide"
                    >Finish payment process</button>
                    }


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
    <SingleProperty />,
    document.body.appendChild(document.createElement('div')),
  )
})