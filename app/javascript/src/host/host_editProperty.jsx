import React from 'react';
import ReactDOM from "react-dom";
import Hostlayout from "@src/host/host_layout";
import { handleErrors, safeCredentialsForm } from './utils/fetchHelper';
import '../user/home.scss';

class Editproperty extends React.Component {
  state = {
    property: {},
    user: {},
    loading: true,
  }

  componentDidMount() {
    console.log(process.env.STRIPE_PUBLISHABLE_KEY)
    const property_id = window.location.pathname.replace('/hosting/edit/property/', '');
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
      image_url,
     // user,
    } = property

    const {
      username
    } = user

    return (
      <Hostlayout>
        <div className="container">
          <div className="row">
            <div className="info col-12 col-lg-7">
              <div className="mb-3">
                <h3 className="mb-0">{title}</h3>               
                <img src={image_url} alt="property image" />   
                <p className="text-uppercase mb-0 text-secondary"><small>{city}</small></p>
                <p className="mb-0"><small>Hosted by <b>{username}</b></small></p>
              </div>
              <div>
                <p className="mb-0 text-capitalize"><b>{property_type}</b></p>
                <p>
                  <span className="mr-3">{max_guests} guests</span>
                  <span className="mr-3">{bedrooms} bedroom</span>
                  <span className="mr-3">{beds} bed</span>
                  <span className="mr-3">{baths} bath</span>
                </p>
              </div>
              <hr />
              <p>{description}</p>
            </div>
          </div>
        </div>
      </Hostlayout>
    )
  }
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
      <Editproperty />,
      document.body.appendChild(document.createElement("div"))
    );
  });


