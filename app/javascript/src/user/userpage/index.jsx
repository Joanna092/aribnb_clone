import React from 'react'
import ReactDOM from 'react-dom'
import Userpage from './userpage';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Userpage />,
    document.body.appendChild(document.createElement('div')),
  )
})