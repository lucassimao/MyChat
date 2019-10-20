import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import React from 'react';
import DashboardToolbar from './DashboardToolbar';
import ChatRoomWidget from './ChatRoomWidget';


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
    },
    container: {
        // marginTop: theme.spacing(2)
    },
}));




export default function Dashboard() {
    const classes = useStyles();

    const gridItems = [];

    for (let i = 0; i < 10; ++i)
        gridItems.push(<Grid key={i} item xs={12} sm={6} md={3} xl={2}>
            <ChatRoomWidget image="logo512.png" title="Amigos da bola" content="Grupo destinado a discutir futebol"
                subheader="September 14, 2016"/>
        </Grid>);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <DashboardToolbar/>
            </AppBar>

            <Container className={classes.container} component="main" >

                <Typography variant="h4" className={classes.sectionTitle} color="textPrimary" component="h1">
                    <QuestionAnswerIcon className={classes.sectionIcon} /> Your chat rooms
                </Typography>

                <Grid container spacing={2}>
                    {gridItems}
                </Grid>

                <Typography variant="h4" className={classes.sectionTitle} color="textPrimary" component="h2">
                    <FiberNewIcon className={classes.sectionIcon} /> Newest chat rooms
                </Typography>

                <Grid container spacing={2}>
                    {gridItems}
                </Grid>
            </Container>


        </div>
    );
}