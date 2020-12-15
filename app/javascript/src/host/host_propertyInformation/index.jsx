import React from 'react'
import ReactDOM from 'react-dom'
import Hostproperty from './host_property';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Hostproperty />,
    document.body.appendChild(document.createElement('div')),
  )
})