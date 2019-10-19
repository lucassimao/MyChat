import React from 'react';
import './App.css';
import SignIn from './components/SignIn'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%'
  }
}))
function App() {
  const classes = useStyles();

  return (
    <Container className={classes.root} component="main" maxWidth="xs">
        <SignIn/>
    </Container>
  );
}

export default App;
