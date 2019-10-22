import React from 'react';
import { Redirect } from 'react-router-dom';
import signInService from '../services/SignInService';

export default function PrivateHOC(Component) {
  return class extends React.Component {
    render() {
      return signInService.isLoggedIn() ? <Component {...this.props} /> : <Redirect to='/signin' />
    }
  }
}
