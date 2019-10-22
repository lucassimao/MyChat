import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useState } from "react";
import useForm from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { signup } from "../services/SignUpService";
import AlertDialog, { INFORMATION_ALERT, ERROR_ALERT } from "./AlertDialog";
import { useHistory } from "react-router-dom";

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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignInLink = React.forwardRef((props, ref) => <RouterLink to="/signin" innerRef={ref} {...props} />);
// eslint-disable-next-line
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function SignUp(props) {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const [alert, setAlert] = useState();
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const history = useHistory();

  const onSubmit = async data => {
    try {
      await signup(data);
      setAlert({
        text: "Your account was successfully created! You're all set to login",
        type: INFORMATION_ALERT,
        title: "Success"
      });
      setSignUpSuccess(true);
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

  const getEmailError = () => {
    if (errors && errors.email) {
      if (errors.email.type === "pattern") {
        return "Invalid email format";
      } else {
        return "Email is required";
      }
    }
  };
  const clearAlert = () => {
    setAlert(null);
    if (signUpSuccess){
        history.push("/signin");
    }
  };

  return (
    <div className={classes.root}>
      {alert && (
        <AlertDialog
          onClose={clearAlert}
          title={alert.title}
          text={alert.text}
          type={alert.type}
        />
      )}
      
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h3">
        Sign up
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              error={Boolean(errors.nickname)}
              label="Nickname"
              autoComplete="nickname"
              helperText={errors.email && "Nickname is required"}
              name="nickname"
              inputRef={register({ required: true })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              error={Boolean(errors.email)}
              label="Email Address"
              helperText={errors.email && getEmailError()}
              inputRef={register({ required: true, pattern: emailRegex })}
              autoComplete="email"
              name="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              error={Boolean(errors.password)}
              helperText={errors.password && "Password is required"}
              label="Password"
              type="password"
              autoComplete="current-password"
              name="password"
              inputRef={register({ required: true })}
            />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
          Sign Up
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link component={SignInLink} variant="subtitle1">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
