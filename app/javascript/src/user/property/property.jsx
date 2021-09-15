import React from 'react';
import Layout from '@src/user/layout';
import BookingWidget from './bookingWidget';
import { handleErrors } from '../utils/fetchHelper';

class Property extends React.Component {
  state = {
    property: {},
    user: {},
    loading: true,
  }

  componentDidMount() {
    console.log(process.env.STRIPE_PUBLISHABLE_KEY)
    fetch(`/api/properties/${this.props.property_id}`)
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

  render () {
    const { user, property, loading } = this.state;
    if (loading) {
      return <p>loading...</p>;
    };

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
    } = property

    const {
      username
    } = user

    return (
      <Layout>

        <div className="container">
          <div className="mt-5 mb-5">
        <h3 className="mt-3 mb-3 text-center">{property.title}</h3>  
          </div>
          <div className="row"> 
            <div className="col-md-4">
                <img className="img-fluid" src={property.image_url} alt="property image" />   
                <div className="centered">
                
                <p className="mb-0"><small>Hosted by <b>{username}</b></small></p>
                </div>
            </div>          
            <div className="col-md-4">     
                <p className=""><b>{property.property_type}</b></p>
                <p className>{property.country}, {property.city}</p>
                <p>Price per night: {property.price_per_night}</p>
                <p>
                  <span className="mr-3">{property.max_guests} guests</span>
                  <span className="mr-3">{property.bedrooms} bedroom</span>
                  <span className="mr-3">{property.beds} bed</span>
                  <span className="mr-3">{property.baths} bath</span>
                </p>
              <hr />
              <p>{property.description}</p>
</div>

            <div className="col-md-4">
              <BookingWidget property_id={id} price_per_night={price_per_night} />
            </div>
            </div>
        </div>

      </Layout>
    )
  }
}

export default Property