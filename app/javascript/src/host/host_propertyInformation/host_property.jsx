import React from 'react';
import ReactDOM from 'react-dom';
import Hostlayout from '@src/host/host_layout';
import { handleErrors, safeCredentials } from '../utils/fetchHelper';
import '../../user/home.scss';

class Hostproperty extends React.Component {

  constructor() {
    super();
    this.state = {
      properties: [],
      total_pages: null,
      next_page: null,
      loading: true,
      user_properties: [],
      username: " ",
    };
   this.deleteProperty = this.deleteProperty.bind(this);
   this.editProperty = this.editProperty.bind(this);
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

  deleteProperty(id) {
    console.log("deleted");
    fetch(
      `/api/properties/${id}`,
      safeCredentials({
        method: "DELETE",
      })
    )
      .then(handleErrors)
      .catch((error) => {
        this.setState({
          error: "Could not delete property",
        });
        console.log("Could not delete property");
      })
      .then(() => {
        fetch(`/api/users/Jimmy/properties`)
          .then(handleErrors)
          .then((data) => {
            this.setState({ user_properties: data.properties });
          });
      });
  }

  editProperty(id) {
    window.location = `/hosting/edit/property/${id}`;
  }

  render () {
    const { user_properties, next_page, loading } = this.state;
    return (
      <Hostlayout>
        <div className="container pt-4">
          <h4 className="mb-1">Host properties page</h4>
          <p className="text-secondary mb-3">Explore some of the best-reviewed stays in the world</p>
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
      </Hostlayout>
    )
  }
}


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Hostproperty />,
    document.body.appendChild(document.createElement('div')),
  )
})