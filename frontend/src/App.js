import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignIn from './components/SignIn'
import Container from '@material-ui/core/Container';

function App() {
  return (
    <Container component="main" maxWidth="xs">
      <SignIn/>
    </Container>
  );
}

export default App;
