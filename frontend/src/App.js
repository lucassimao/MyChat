import React, {Suspense} from 'react';
import './App.css';
import SignIn from './components/SignIn'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


const SignUp = React.lazy(() => import('./components/SignUp'));

const useStyles = makeStyles(theme => ({
  root: {
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
      <Router>
        <Switch>
          <Route path="/signup">
            <Suspense fallback={<div> Loading ...</div>}>
              <SignUp />
            </Suspense>
          </Route>
          <Route path="/">
            <SignIn />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
