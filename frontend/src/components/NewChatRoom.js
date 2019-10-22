import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import React, { useRef, useState } from "react";
import PrivateHOC from "./PrivateHOC";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import useForm from "react-hook-form";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Container } from "@material-ui/core";
import chatRoomService from "../services/ChatroomService";
import AlertDialog, { ERROR_ALERT, INFORMATION_ALERT } from "./AlertDialog";
import { useHistory } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  container: {
    marginTop: theme.spacing(3)
  }
}));

const DashboardLink = React.forwardRef((props, ref) => <RouterLink to="/dashboard" innerRef={ref} {...props} />);



function NewChatRoom(props) {
  const classes = useStyles();
  const imgRef = useRef();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [alert, setAlert] = useState();
  const [closeWindow, setCloseWindow] = useState(false);

  const loadImage = evt => {
    const firstFile = evt.target.files[0];
    if (firstFile && firstFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (function(aImg) {
        return function(e) {
          aImg.file = firstFile;
          aImg.src = e.target.result;
        };
      })(imgRef.current);
      reader.readAsDataURL(firstFile);
    } else {
      imgRef.current.file = undefined;
      imgRef.current.src = "https://via.placeholder.com/200";
    }
  };

  const clearAlert = () => {
    setAlert(null);
    if (closeWindow) {
      history.push("/dashboard");
    }
  };

  const signup = async data => {
    try {
      data.base64EncodedImage = imgRef.current.src;
      await chatRoomService.registerNewChatroom(data);
      setAlert({ text: "Your new room is ready to be used", type: INFORMATION_ALERT, title: "Success" });
      setCloseWindow(true);
    } catch (error) {
      if (error.response) {
        // server responded with a status code that falls out of the range of 2xx
        setAlert({ text: error.response.data, type: ERROR_ALERT, title: "Error" });
      } else if (error.request) {
        // The request was made but no response was received
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

  return (
    <div className={classes.root}>
      {alert && <AlertDialog onClose={clearAlert} title={alert.title} text={alert.text} type={alert.type} />}
      <AppBar position="static">
        <Toolbar>
          <Tooltip title="Create new chat room">
            <IconButton component={DashboardLink} aria-label="create new chat room" aria-controls="menu-appbar" color="inherit">
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h6" className={classes.title}>
            New chat room
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.container} maxWidth="sm">
        <form onSubmit={handleSubmit(signup)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                error={Boolean(errors.name)}
                label="Name"
                autoComplete="off"
                helperText={errors.name && "Room name is required"}
                name="name"
                inputRef={register({ required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Description"
                multiline
                rows={3}
                inputRef={register({})}
                name="description"
              />
            </Grid>
            <Grid style={{ display: "flex", alignItems: "center", flexDirection: "column" }} item xs={12}>
                <Typography component="h6">
                    Choose a banner for your room
                </Typography>
              <img
                alt="chat room theme"
                style={{ maxWidth: "100%" }}
                ref={imgRef}
                src={"https://via.placeholder.com/200"}
              ></img>
              <input accept="image/*" onChange={loadImage} type="file"></input>
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Save
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default PrivateHOC(NewChatRoom);
