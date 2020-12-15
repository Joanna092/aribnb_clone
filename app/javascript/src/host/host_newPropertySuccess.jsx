import React from 'react';
import ReactDOM from 'react-dom';
import Hostlayout from '@src/host/host_layout';

class Propertysuccess extends React.Component {

  render () {
   
    return (
      <Hostlayout>
       <p>Adding property was success</p>
      </Hostlayout>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Propertysuccess />,
    document.body.appendChild(document.createElement('div')),
  )
})