import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useRef, useEffect } from 'react';
import ChatRoomToolbar from './ChatRoomToolbar';

import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Telegram from '@material-ui/icons/Telegram';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import { Grid } from '@material-ui/core';
import {
    useParams
} from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import chatRoomService from '../services/ChatroomService';
import authService from '../services/AuthService';
import PrivateHOC from './PrivateHOC';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    input: {
        flexGrow: 1
    },
    messagesList: {
        overflowY: 'auto',
        maxWidth: '100%',
        overflowX: 'hidden',
        wordBreak: 'break-word'
    },
    onlineUsersList: {
        overflowY: 'auto',
        overflowX: 'hidden',
        borderRight: '1px solid #ccc',
    },
    grid: {
        overflow: 'hidden',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const OnlineUsers = React.forwardRef((props, ref) => {
    const { classes, users } = props;

    return (<List ref={ref} className={classes.onlineUsersList}>
        {users.map((user, idx) => <React.Fragment key={user._id}>
            <ListItem button alignItems="center" >
                <ListItemAvatar>
                    <Avatar className={classes.avatar} />
                </ListItemAvatar>
                <ListItemText primary={user.nickname} />
            </ListItem>
            {(idx < (users.length - 1)) && <Divider variant="inset" component="li" />}
        </React.Fragment>
        )}
    </List>);
});


function ChatRoom(props) {
    const classes = useStyles();
    const [message, setMessage] = useState('');
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [roomInfo, setRoomInfo] = useState({});
    const [messages, setMessages] = useState([]);
    const topBarRef = useRef();
    const bottomBarRef = useRef();
    const msgListRef = useRef();
    const onlineUsersListRef = useRef();
    const { roomId } = useParams();
    const userId = authService.getUserId();


    const handleUserTyping = (evt) => setMessage(evt.target.value);

    const sendMessage = async () => {
        await chatRoomService.sendMessage({ roomId, data: message, userId, event: 'message' });
        // TODO handle error
        setMessage('');
    }

    const onInputKeyDown = (evt) => {
        if (evt.keyCode === 13) {
            sendMessage();
            evt.preventDefault();
        }
    }

    // pulling messages
    useEffect(() => {

        const interval = setInterval(async () => {
            const results = await chatRoomService.readMoreMessages(roomId, userId);
            let newMessages = results
                .filter(({value:msg}) => msg.event === 'message' || (msg.event !== 'message' && msg.userId !== userId))
                .map(({value:msg}) => {

                    switch (msg.event) {
                        case 'message':
                            return msg;
                        case 'join':
                            return { ...msg, data: `user ${msg.userId} joined ...` }
                        case 'exit':
                            // setOnlineUsers(onlineUsers.filter(u => u._id !== msg.userId))
                            return { ...msg, data: `user ${msg.userId} exited ...` }
                        default:
                            throw Error('Unknown message type: ' + msg.event);
                    }
                })

            if (newMessages.length > 0)
                setMessages((currentMessages) => [...currentMessages, ...newMessages]);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // loading the chatroom details
    useEffect(() => {

        (async function load() {
            try {
                const { data: { chatroom, participants } } = await chatRoomService.getChatRoomInfo(roomId);
                setOnlineUsers(participants);
                setRoomInfo(chatroom);
            } catch (error) {
                // TODO handle this
                console.log(error);
                alert(error)
            }
        })(roomId)

    }, []);

    // set focus on the newest message received
    useEffect(() => {
        const lastChild = msgListRef.current.lastChild;
        if (lastChild) {
            lastChild.scrollIntoView(false)
        }
    }, [messages])

    // calculating the available height for the message list and online users containers
    useEffect(() => {

        const intViewportHeight = window.innerHeight;
        const topBarHeight = topBarRef.current.offsetHeight;
        const bottomBarHeight = bottomBarRef.current.offsetHeight;
        const gridHeight = intViewportHeight - topBarHeight - bottomBarHeight;

        msgListRef.current.style.height = `${gridHeight}px`;
        onlineUsersListRef.current.style.height = `${gridHeight}px`;


    }, []);



    return (
        <div className={classes.root}>
            <AppBar ref={topBarRef} position="static">
                <ChatRoomToolbar roomId={roomId} userId={userId} roomName={roomInfo.name} />
            </AppBar>

            <Grid container className={classes.grid}>
                {/* List of online users */}
                <Grid display={{ xs: 'none', sm: 'block' }} item sm={4} md={3} lg={2}>
                    <OnlineUsers users={onlineUsers} ref={onlineUsersListRef} classes={classes} />
                </Grid>


                {/* List of messages */}

                <Grid item xs={12} sm={8} md={9} lg={10}>
                    <List className={classes.messagesList} ref={msgListRef} >
                        {messages.map(({ data: message, authorId }, idx) => (
                            <ListItem button key={idx}>
                                <ListItemAvatar>
                                    <Avatar alt="Profile Picture" className={classes.avatar} />
                                </ListItemAvatar>
                                <ListItemText secondary={message} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>

            <AppBar ref={bottomBarRef} position="static" color="inherit" className={classes.bottomBar} >
                <Toolbar>
                    <InputBase
                        className={classes.input}
                        multiline
                        autoFocus
                        rowsMax="4"
                        value={message}
                        onKeyDown={onInputKeyDown}
                        onChange={handleUserTyping}
                        placeholder="Type a message" />

                    <IconButton onClick={sendMessage} color="primary">
                        <Telegram />
                    </IconButton>
                </Toolbar>
            </AppBar>

        </div>
    );
}

export default PrivateHOC(ChatRoom);