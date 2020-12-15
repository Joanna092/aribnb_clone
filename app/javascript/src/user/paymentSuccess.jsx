import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/user/layout';
import { handleErrors } from './utils/fetchHelper';


class PaymentSuccess extends React.Component {
 
  render () {
    return (
      <Layout>
       <p>Payment Success Page</p>
      </Layout>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <PaymentSuccess />,
    document.body.appendChild(document.createElement('div')),
  )
})