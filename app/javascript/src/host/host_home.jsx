import React from 'react';
import ReactDOM from 'react-dom';
import Hostlayout from '@src/host/host_layout';

class Hosthome extends React.Component {

  render () {
   
    return (
      <Hostlayout>
       <p>Host home page</p>
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