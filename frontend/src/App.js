import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from './components/SignIn';


const SignUp = React.lazy(() => import('./components/SignUp'));
const Dashboard = React.lazy(() => import('./components/Dashboard'));

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
    <Router>
      <Switch>
        <Route path="/signup">
          <Suspense fallback={<div> Loading ...</div>}>
            <Container className={classes.root} component="main" maxWidth="xs">
              <SignUp />
            </Container>
          </Suspense>
        </Route>
        <Route path="/dashboard">
          <Suspense fallback={<div> Loading ...</div>}>
            <Dashboard />
          </Suspense>
        </Route>
        <Route path="/">
          <Container className={classes.root} component="main" maxWidth="xs">
            <SignIn />
          </Container>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
