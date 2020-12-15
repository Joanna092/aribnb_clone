import React from 'react';
import ReactDOM from 'react-dom';
import Hostlayout from '@src/host/host_layout';

class Addproperty extends React.Component {

  render () {
   
    return (
      <Hostlayout>
       <p>Add property page</p>
      </Hostlayout>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Addproperty />,
    document.body.appendChild(document.createElement('div')),
  )
})