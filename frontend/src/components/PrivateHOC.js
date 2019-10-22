import React from 'react';
import { Redirect } from 'react-router-dom';
import authService from '../services/AuthService';

export default function PrivateHOC(Component) {
  return class extends React.Component {
    render() {
      return authService.isLoggedIn() ? <Component {...this.props} /> : <Redirect to='/signin' />
    }
  }
}
