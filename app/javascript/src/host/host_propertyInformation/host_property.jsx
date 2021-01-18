import React from 'react';
import ReactDOM from 'react-dom';
import Hostlayout from '@src/host/host_layout';
import { handleErrors } from '../utils/fetchHelper';

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
   // this.deletePost = this.deletePost.bind(this);
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
        fetch(`/api/users/Jimmy/properties`) //${this.state.username}
          .then(handleErrors)
          .then((data) => {
            console.log(data);
            this.setState({
              user_properties: data.properties,
            });
          });
      });
  }

/*
  deletePost(id) {
    console.log("deleted");
    fetch(
      `/api/tweets/${id}`,
      safeCredentials({
        method: "DELETE",
      })
    )
      .then(handleErrors)
      .catch((error) => {
        this.setState({
          error: "Could not delete tweet",
        });
        console.log("Could not delete tweet");
      })
      .then(() => {
        fetch(`/api/users/${this.props.user_data.username}/tweets`)
          .then(handleErrors)
          .then((data) => {
            this.setState({ user_tweets: data.tweets });
          });
      });
  }
*/
  render () {
    const { user_properties, next_page, loading } = this.state;
    return (
      <Hostlayout>
       <p>Host properties page</p>
        <div className="container pt-4">
          <h4 className="mb-1">Top-rated places to stay</h4>
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
                  <button>EDIT</button><button>DELETE</button>
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