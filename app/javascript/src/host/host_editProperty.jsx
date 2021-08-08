import React from 'react';
import ReactDOM from "react-dom";
import Hostlayout from "@src/host/host_layout";
import { handleErrors, safeCredentialsForm } from './utils/fetchHelper';
import '../user/home.scss';

class Editproperty extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    property: {},
    user: {},
    loading: true,
    bookings: [],
    username: "",
    error: "",
    successMessage: "",
    failureMessage: "",
    title: "",
    description: "",
    country: "",
    city: "",
    property_type: "",
    price_per_night: "",
    max_guests: "",
    bedrooms: "",
    beds: "",
    baths: "",
    images: []
  }
  this.submit= this.submit.bind(this);
  }


  componentDidMount() {
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
      }).then(() => {
        fetch(`/api/properties/${property_id}/bookings`) 
          .then(handleErrors)
          .then((data) => {
            console.log(data);
            this.setState({
              bookings: data.bookings,
            });
          });
      });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submit = (e) => {
    const property_id = window.location.pathname.replace('/hosting/edit/property/', '');
    if (e) {
      e.preventDefault();
    }

    let formData = new FormData();
    const fileInputElement = document.getElementById('image-select');
    console.log(fileInputElement.files);

    for (let i = 0; i < fileInputElement.files.length; i++) {
      formData.append('property[images][]', fileInputElement.files[i]);
    }

    // Set other params in the form data.
    formData.set('property[title]', this.state.title ? this.state.title : this.state.property.title);
    formData.set('property[description]', this.state.description ? this.state.description : this.state.property.description );
    formData.set('property[country]', this.state.country ? this.state.country : this.state.property.country );
    formData.set('property[city]', this.state.city ? this.state.city : this.state.property.city);
    formData.set('property[property_type]', this.state.property_type ? this.state.property_type : this.state.property.property_type);
    formData.set('property[description]', this.state.description ? this.state.description : this.state.property.description);
    formData.set('property[price_per_night]', this.state.price_per_night ? this.state.price_per_night : this.state.property.price_per_night);
    formData.set('property[max_guests]', this.state.max_guests ? this.state.max_guests : this.state.property.max_guests);
    formData.set('property[bedrooms]', this.state.bedrooms ? this.state.bedrooms : this.state.property.bedrooms);
    formData.set('property[beds]', this.state.beds ? this.state.beds : this.state.property.beds);
    formData.set('property[baths]', this.state.baths ? this.state.baths : this.state.property.baths);

  //  const property_id = window.location.pathname.replace('/hosting/edit/property/', '');
    fetch(
     `/api/properties/${property_id}`,
      safeCredentialsForm ({
        method: "PUT",
        body: formData,
      })
    ) .then(handleErrors)
      .then((data) => {
        console.log(data);
        if (data.success !== false) {
          this.setState({
            error: false,
            successMessage: "Edit successfull!",
          });
          window.location = `/hosting/${property_id}/edited_success`;
        } else {
          this.setState({
            error: true,
            failureMessage:
              "Edit failed.",
          });
        }
      });
  };

  

  render () {
    const { user, property, loading, image, bookings } = this.state;
    if (loading) {
      return <p>loading...</p>;
    };

    const {
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
    } = this.state;

    const {
      id,
  /* title,
      description,
      city,
      country,
      property_type,
      price_per_night,
      max_guests,
      bedrooms,
      beds,
      baths,
      image_url, */
     // user,
    } = property

    const {
      username
    } = user

    return (
      <Hostlayout>
           <h1 className="text-center mt-4">Property information</h1>
           <div className="container property_info">
           <h3 className="mt-3 mb-3 text-center">{property.title}</h3>   
          <div className="row text">
         
            <div className="col-12 col-lg-6">
                <img className="img-fluid property_info_img" src={property.image_url} alt="property image" />   
                <div className="centered">
                <p className="text-uppercase mb-0 text-secondary"><small>{property.country}, {property.city}</small></p>
                <p className="mb-0"><small>Hosted by <b>{username}</b></small></p>
                </div>
            </div>
             
            <div className="col-12 col-lg-6">
        
                <p className=""><b>{property.property_type}</b></p>
                <p>Price per night: {property.price_per_night}</p>
                <p>
                  <span className="mr-3">{property.max_guests} guests</span>
                  <span className="mr-3">{property.bedrooms} bedroom</span>
                  <span className="mr-3">{property.beds} bed</span>
                  <span className="mr-3">{property.baths} bath</span>
                </p>
            
              <hr />
              <p>{property.description}</p>
            
          
         
          {bookings.length != 0 ? <span><p>BOOKED</p><p>Booking information:</p></span> : <p>FREE TO BOOK</p>}

          {bookings.map(booking => {
              return (
              <div className="border" key={booking.id}>
                   <p>From: {booking.start_date} To: {booking.end_date}</p>
                   <p>By: {booking.user}</p>
                   <p>Contact: {booking.email}</p>
                   {booking.paid ? <p>PAID</p> : <p>not paid yet</p>}
                   </div>
              )
                   })}
                   </div>
                   </div>
        </div>




        <div className="container">
        <h1 className="text-center">Edit your property</h1>
          <form className="add_form" onSubmit={this.submit}>

            <div className="form-group">
              <div className="row">
                <div className="col-3">
                  <label for="exampleFormControlInput1">Property name:</label>
                </div>

                <div className="col-9">
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder={property.title}
                    name="title"
                    value={title}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-3">
                  <label for="image-select">Image</label>
                </div>

                <div className="col-9">
                  <input
                    value={image}
                    name="image"
                    ref={this.fileInputElement}
                    onChange={this.handleChange}
                    type="file"
                    class="form-control-file"
                    id="image-select"
                    multiple
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-3">
                  <label for="exampleFormControlTextarea1">Description</label>
                </div>

                <div className="col-9">
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    name="description"
                    placeholder={property.description}
                    value={description}
                    onChange={this.handleChange}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-3">
                  <label for="exampleFormControlInput1">Country</label>
                </div>

                <div className="col-9">
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder={property.country}
                    name="country"
                    value={country}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-3">
                  <label for="exampleFormControlInput1">City</label>
                </div>

                <div className="col-9">
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder={property.city}
                    name="city"
                    value={city}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-3">
                  <label for="exampleFormControlSelect1">Type</label>
                </div>

                <div className="col-9">
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder={property.property_type}
                    name="property_type"
                    value={property_type}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-3">
                  <label for="exampleFormControlSelect1">Price per night</label>
                </div>
                <div className="col-9">

                  <input
                    type="number"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder={property.price_per_night}
                    name="price_per_night"
                    value={price_per_night}
                    min="0"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-3">
                  <label for="exampleFormControlSelect1">Max guests</label>
                </div>

                <div className="col-9">
                  <input
                    type="number"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder={property.max_guests}
                    name="max_guests"
                    value={max_guests}
                    min="0"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-3">
                  <label for="exampleFormControlSelect1">Bedrooms</label>
                </div>
                <div className="col-9">
                  <input
                    type="number"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder={property.bedrooms}
                    name="bedrooms"
                    min="0"
                    value={bedrooms}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-3">
                  <label for="exampleFormControlSelect1">Beds</label>
                </div>

                <div className="col-9">
                  <input
                    type="number"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder={property.beds}
                    name="beds"
                    min="0"
                    value={beds}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-3">
                  <label for="exampleFormControlSelect1">Baths</label>
                </div>

                <div className="col-9">
                  <input
                    type="number"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder={property.baths}
                    name="baths"
                    min="0"
                    value={baths}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-secondary add_button">
                Update your property
              </button>
          </form>
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


