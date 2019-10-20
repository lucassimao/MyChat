import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PeopleIcon from '@material-ui/icons/People';
import React from 'react';


const useStyles = makeStyles(theme => ({
    card: {
        marginTop: theme.spacing(1)
    },
    cardHeaderTitle: {
        fontWeight: 'bold',
        fontSize: theme.typography.subtitle1.fontSize
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btnJoinRoom: {
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function ChatRoomWidget(props) {
    const classes = useStyles();
    const { title, subheader, content, image } = props;

    return (
        <Card className={classes.card}>
            <CardHeader
                classes={{
                    title: classes.cardHeaderTitle
                }}
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        +18
                    </Avatar>
                }
                title={title}
                subheader={subheader}
            />
            <CardMedia
                className={classes.media}
                image={image}
                title="Group image"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {content}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions} disableSpacing>
                <Button className={classes.btnJoinRoom} size="small" color="primary">
                    Join room
                </Button>

                <IconButton aria-label="4 pending messages">
                    <Badge anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} badgeContent={4} color="primary">
                        <PeopleIcon fontSize="large" />
                    </Badge>
                </IconButton>

            </CardActions>
        </Card>
    );
}