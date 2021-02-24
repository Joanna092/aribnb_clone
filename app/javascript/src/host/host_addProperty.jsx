import React from "react";
import ReactDOM from "react-dom";
import Hostlayout from "@src/host/host_layout";
import { handleErrors, safeCredentialsForm } from './utils/fetchHelper';


class Addproperty extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "Joanna092",
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
      images: [],
      property_id: ""
    };

    this.submit= this.submit.bind(this);

  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submit = (e) => {
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
    formData.set('property[property_id]', this.state.property_id);
    formData.set('property[title]', this.state.title);
    formData.set('property[description]', this.state.description);
    formData.set('property[country]', this.state.country);
    formData.set('property[city]', this.state.city);
    formData.set('property[property_type]', this.state.property_type);
    formData.set('property[description]', this.state.description);
    formData.set('property[price_per_night]', this.state.price_per_night);
    formData.set('property[max_guests]', this.state.max_guests);
    formData.set('property[bedrooms]', this.state.bedrooms);
    formData.set('property[beds]', this.state.beds);
    formData.set('property[baths]', this.state.baths);

    fetch(
      '/api/properties',
      safeCredentialsForm ({
        method: "POST",
        body: formData,
      })
    ) .then(handleErrors)
      .then((data) => {
        console.log(data);
        if (data.success !== false) {
          this.setState({
            error: false,
            successMessage: "Signup successfull! You can login now.",
          })
         window.location = `/hosting/${data.property.property_id}/success`;
        } else {
          this.setState({
            error: true,
            failureMessage:
              "Signup failed. Please check if your email address is correct and your password has at least 8 characters.",
          });
        }
      });
  };


  render() {
    const {
      id,
      title,
      description,
      country,
      city,
      property_type,
      price_per_night,
      max_guests,
      bedrooms,
      beds, 
      baths,
      image,
      user,    
    } = this.state;

    return (
      <Hostlayout>
        <div className="container">
          <form onSubmit={this.submit}>
            <div className="form-group">
              <div className="row">
                <div className="col-3">
                  <label for="exampleFormControlInput1">Property name</label>
                </div>

                <div className="col-9">
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="property"
                    name="title"
                    value={title}
                    onChange={this.handleChange}
                    required
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
                    value={description}
                    onChange={this.handleChange}
                    required
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
                    placeholder="country"
                    name="country"
                    value={country}
                    onChange={this.handleChange}
                    required
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
                    placeholder="city"
                    name="city"
                    value={city}
                    onChange={this.handleChange}
                    required
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
                    placeholder="type"
                    name="property_type"
                    value={property_type}
                    onChange={this.handleChange}
                    required
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
                    placeholder="price"
                    name="price_per_night"
                    value={price_per_night}
                    onChange={this.handleChange}
                    required
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
                    placeholder="guests"
                    name="max_guests"
                    value={max_guests}
                    onChange={this.handleChange}
                    required
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
                    placeholder="bedrooms"
                    name="bedrooms"
                    value={bedrooms}
                    onChange={this.handleChange}
                    required
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
                    placeholder="beds"
                    name="beds"
                    value={beds}
                    onChange={this.handleChange}
                    required
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
                    placeholder="baths"
                    name="baths"
                    value={baths}
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-secondary tweet_button">
                Add new property
              </button>
          </form>
        </div>
      </Hostlayout>
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Addproperty />,
    document.body.appendChild(document.createElement("div"))
  );
});

