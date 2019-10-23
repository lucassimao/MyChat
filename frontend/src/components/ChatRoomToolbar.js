import IconButton from '@material-ui/core/IconButton';
import { fade, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import React from 'react';
import { useHistory } from 'react-router-dom';
import chatRoomService from '../services/ChatroomService';


const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        display: 'none',
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
            display: 'block'
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    grow: {
        flexGrow: 1,
    },
}));



export default function ChatRoomToolbar(props) {
    const classes = useStyles();
    const { roomName, roomId, userId } = props;
    const history = useHistory();

    const onExit = async () => {
        // TODO handle errros
        await chatRoomService.exitChatRoom(roomId, userId);
        history.push('/dashboard');
    }

    return (
        <Toolbar>

            <Typography variant="h6" className={classes.title}>
                {` :: ${roomName} ::`}
            </Typography>

            <div className={classes.grow} />

            <Tooltip title="Start private chat">
                <IconButton
                    aria-label="start private chat"
                    aria-controls="menu-appbar"
                    color="inherit"
                >
                    <QuestionAnswerIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Exit chat room">
                <IconButton
                    aria-label="exit application"
                    aria-controls="menu-appbar"
                    color="inherit"
                    onClick={onExit}
                >
                    <ExitToAppIcon />
                </IconButton>
            </Tooltip>

        </Toolbar>
    );
}