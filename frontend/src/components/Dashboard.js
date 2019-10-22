import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FiberNewIcon from "@material-ui/icons/FiberNew";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import React, { useEffect, useState } from "react";
import chatroomService from "../services/ChatroomService";
import ChatRoomWidget from "./ChatRoomWidget";
import DashboardToolbar from "./DashboardToolbar";
import PrivateHOC from "./PrivateHOC";
import chatRoomService from "../services/ChatroomService";
import AlertDialog, { ERROR_ALERT, INFORMATION_ALERT } from "./AlertDialog";
import {
  useHistory
} from "react-router-dom";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  sectionTitle: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  sectionIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.light
  }
}));

function Dashboard() {
  const classes = useStyles();
  const [refreshChatRooms, setRefreshChatRooms] = useState(true);
  const [roomsByLoggedInUser, setRoomsByLoggedInUser] = useState([]);
  const [roomsByOtherUsers, setRoomsByOtherUsers] = useState([]);
  const [alert, setAlert] = useState();
  const history = useHistory();

  const clearAlert = () => {
    setAlert(null);
  };
  // loading chat rooms created by the logged in user
  useEffect(() => {
    if (refreshChatRooms) {
      async function loadChatRooms() {
        const {
          data: { chatrooms }
        } = await chatroomService.getChatRoomsCreatedByLoggedInUser();
        setRoomsByLoggedInUser(chatrooms);
        setRefreshChatRooms(false);
      }
      loadChatRooms();
    }
  }, [refreshChatRooms]);

  // loading chat rooms created by other users
  useEffect(() => {
    async function loadChatRooms() {
      const {
        data: { chatrooms }
      } = await chatroomService.getOthersChatrooms();
      setRoomsByOtherUsers(chatrooms);
    }
    loadChatRooms();
  }, []);

  const joinRoom = async roomId => {
    try {
      await chatRoomService.joinChatRoom(roomId);
      history.push(`/chatroom/${roomId}`);
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

  const deleteRoom = async roomId => {
    try {
      await chatRoomService.deleteRoom(roomId);
      setAlert({ text: "Room deleted", type: INFORMATION_ALERT, title: "Success" });
      setRefreshChatRooms(true);
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
        <DashboardToolbar />
      </AppBar>

      <Container className={classes.container} component="main">
        <Typography variant="h4" className={classes.sectionTitle} color="textPrimary" component="h1">
          <QuestionAnswerIcon className={classes.sectionIcon} /> Your chat rooms
        </Typography>

        <Grid container spacing={2}>
          {roomsByLoggedInUser.map((chatRoom, idx) => {
            return (
              <Grid key={idx} item xs={12} sm={6} md={3} xl={2}>
                <ChatRoomWidget
                  image={chatRoom.pic}
                  participants={chatRoom.participants.length}
                  title={chatRoom.name}
                  onDelete={() => deleteRoom(chatRoom._id)}
                  onJoin={() => joinRoom(chatRoom._id)}
                  content={chatRoom.description}
                  subheader={new Date(chatRoom.dateCreated).toLocaleDateString()}
                />
              </Grid>
            );
          })}
        </Grid>

        <Typography variant="h4" className={classes.sectionTitle} color="textPrimary" component="h2">
          <FiberNewIcon className={classes.sectionIcon} /> Newest chat rooms
        </Typography>

        <Grid container spacing={2}>
          {roomsByOtherUsers.map((chatRoom, idx) => {
            return (
              <Grid key={idx} item xs={12} sm={6} md={3} xl={2}>
                <ChatRoomWidget
                  image={chatRoom.pic}
                  participants={chatRoom.participants.length}
                  title={chatRoom.name}
                  onJoin={() => joinRoom(chatRoom._id)}
                  content={chatRoom.description}
                  subheader={new Date(chatRoom.dateCreated).toLocaleDateString()}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default PrivateHOC(Dashboard);
