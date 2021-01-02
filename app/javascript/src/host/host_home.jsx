import React from 'react';
import ReactDOM from 'react-dom';
import Hostlayout from '@src/host/host_layout';
import { safeCredentials, handleErrors } from "./utils/fetchHelper";

class Hosthome extends React.Component {

  constructor() {
    super();
    this.state = {
      host_properties: [],
    };
  }

  componentDidMount() {
    fetch(`/api/users/Joanna092/properties`)
      .then(handleErrors)
      .then((data) => {
        console.log(data)
        this.setState({
          host_properties: data.properties, 
       });      
  })
}

  render () {
    const { host_properties } = this.state;
    return (
      <Hostlayout>
       <p>Host home page</p>

       <div>
            {host_properties.map((property) => {
              return (
                <div key={property.id}>
                  <p>{property.username}</p>
                  <p>{property.title}</p>
                 </div>
              );
            })}
          </div>

      </Hostlayout>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Hosthome />,
    document.body.appendChild(document.createElement('div')),
  )
})