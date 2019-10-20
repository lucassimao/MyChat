import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddCommentIcon from '@material-ui/icons/AddComment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';


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

export default function DashboardToolbar(props) {
    const classes = useStyles();

    return (
        <Toolbar>

            <Typography variant="h6" className={classes.title}>
                MyChat
            </Typography>

            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                />
            </div>
            <div className={classes.grow} />


            <Tooltip title="Create new chat room">
                <IconButton
                    aria-label="create new chat room"
                    aria-controls="menu-appbar"
                    color="inherit"
                >
                    <AddCommentIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Your profile">
                <IconButton
                    aria-label="your profile"
                    aria-controls="menu-appbar"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
            </Tooltip>
            <Tooltip title="Exit application">
                <IconButton
                    aria-label="exit application"
                    aria-controls="menu-appbar"
                    color="inherit"
                >
                    <ExitToAppIcon />
                </IconButton>
            </Tooltip>

        </Toolbar>
    );
}