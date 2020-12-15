import React from 'react';
import ReactDOM from 'react-dom';
import Hostlayout from '@src/host/host_layout';

class Hostproperty extends React.Component {

  render () {
   
    return (
      <Hostlayout>
       <p>Host properties page</p>
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