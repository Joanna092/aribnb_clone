import React from 'react'
import ReactDOM from 'react-dom'
import Hostlogin from './host_login';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Hostlogin />,
    document.body.appendChild(document.createElement('div')),
  )
})