import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import React, { useEffect, useState } from 'react';
import chatroomService from '../services/ChatroomService';
import ChatRoomWidget from './ChatRoomWidget';
import DashboardToolbar from './DashboardToolbar';
import PrivateHOC from './PrivateHOC';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    sectionTitle: {
        display: 'flex', alignItems: 'center',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    sectionIcon: {
        marginRight: theme.spacing(1),
        color: theme.palette.primary.light
    }
}));


function Dashboard() {
    const classes = useStyles();
    const [roomsByLoggedInUser, setRoomsByLoggedInUser] = useState([]);
    const [roomsByOtherUsers, setRoomsByOtherUsers] = useState([]);

    // loading chat rooms created by the logged in user
    useEffect(() => {
        async function loadChatRooms() {
            const { data: { chatrooms } } = await chatroomService.getChatRoomsCreatedByLoggedInUser();
            setRoomsByLoggedInUser(chatrooms);
        }
        loadChatRooms();
    }, []);

    // loading chat rooms created by other users
    useEffect(() => {
        async function loadChatRooms() {
            const { data: { chatrooms } } = await chatroomService.getOthersChatrooms();
            setRoomsByOtherUsers(chatrooms);
        }
        loadChatRooms();
    }, []);


    return (
        <div className={classes.root}>
            <AppBar position="static">
                <DashboardToolbar />
            </AppBar>

            <Container className={classes.container} component="main" >

                <Typography variant="h4" className={classes.sectionTitle} color="textPrimary" component="h1">
                    <QuestionAnswerIcon className={classes.sectionIcon} /> Your chat rooms
                </Typography>

                <Grid container spacing={2}>
                    {roomsByLoggedInUser.map((chatRoom, idx) => {
                        return (<Grid key={idx} item xs={12} sm={6} md={3} xl={2}>
                            <ChatRoomWidget image={chatRoom.pic}
                                title={chatRoom.title}
                                content={chatRoom.description}
                                subheader={chatRoom.dateCreated} />
                        </Grid>)
                    })}
                </Grid>

                <Typography variant="h4" className={classes.sectionTitle} color="textPrimary" component="h2">
                    <FiberNewIcon className={classes.sectionIcon} /> Newest chat rooms
                </Typography>

                <Grid container spacing={2}>
                    {roomsByOtherUsers.map((chatRoom, idx) => {
                        return (<Grid key={idx} item xs={12} sm={6} md={3} xl={2}>
                            <ChatRoomWidget image={chatRoom.pic}
                                title={chatRoom.title}
                                content={chatRoom.description}
                                subheader={chatRoom.dateCreated} />
                        </Grid>)
                    })}                
                </Grid>
            </Container>


        </div>
    );
}

export default PrivateHOC(Dashboard)