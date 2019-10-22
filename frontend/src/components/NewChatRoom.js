import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import PrivateHOC from './PrivateHOC';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import useForm from "react-hook-form";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Container } from '@material-ui/core';


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

function NewChatRoom(props) {
    const classes = useStyles();
    const { register, handleSubmit, errors } = useForm();


    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Tooltip title="Create new chat room">
                        <IconButton
                            aria-label="create new chat room"
                            aria-controls="menu-appbar"
                            color="inherit"
                        >
                            <ArrowBackIcon />
                        </IconButton>
                    </Tooltip>
                    <Typography variant="h6" className={classes.title}>
                        New chat room
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container className={classes.container}>
                <form noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                error={Boolean(errors.name)}
                                label="Name"
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
                        <Grid style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }} item xs={12}>
                            <img src={"https://picsum.photos/200/200"}></img>
                            <Typography variant="h6">
                                Click in the image to change
                            </Typography>
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Sign Up
                    </Button>
                </form>
            </Container>
        </div>
    )
}

export default PrivateHOC(NewChatRoom);