import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useEffect, useState } from "react";
import useForm from "react-hook-form";
import { Link as RouterLink, useHistory } from "react-router-dom";
import authService from "../services/AuthService";
import AlertDialog, { ERROR_ALERT } from "./AlertDialog";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 4)
  },
  bottomGrid: {
    fontSize: theme.typography.subtitle1.fontSize
  }
}));

const SignUpLink = React.forwardRef((props, ref) => <RouterLink to="/signup" innerRef={ref} {...props} />);

function SignIn(props) {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const [signInSuccess, setSignInSuccess] = useState(false);
  const [alert, setAlert] = useState();
  const history = useHistory();

  const onSubmit = async data => {
    try {
      const response = await authService.signin(data);
      authService.storeCredentials({...data, authorizationToken: response.headers.authorization});
      setSignInSuccess(true);
    } catch (error) {
      if (error.response) {
        // server responded with a status code that falls out of the range of 2xx
        setAlert({ text: error.response.data, type: ERROR_ALERT, title: "Error" });
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        setAlert({
          text: "Are you online? We weren't able to connect to the server",
          type: ERROR_ALERT,
          title: "Error"
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        setAlert({
          text: `Something really bad happened: ${error.message}`,
          type: ERROR_ALERT,
          title: "Error"
        });
      }
    }
  };

  useEffect(() => {
    if (signInSuccess) {
      history.push("/dashboard");
    }
    // eslint-disable-next-line
  }, [signInSuccess]);

  const clearAlert = () => {
    setAlert(null);
  };

  return (
    <div className={classes.root}>
      {alert && <AlertDialog onClose={clearAlert} title={alert.title} text={alert.text} type={alert.type} />}
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography className={classes.title} component="h1" variant="h3">
        Sign in
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Nick name"
          name="nickname"
          inputRef={register({})}
          autoComplete="nick"
          autoFocus
        />

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          inputRef={register({})}
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        {/* <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                /> */}
        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
          Sign In
        </Button>
        <Grid container justify="center" className={classes.bottomGrid}>
          {/* <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid> */}
          <Grid item>
            <Link component={SignUpLink}>{"Don't have an account? Sign Up"}</Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default SignIn;
