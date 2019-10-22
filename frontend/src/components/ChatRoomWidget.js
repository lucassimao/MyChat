import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { red } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PeopleIcon from "@material-ui/icons/People";
import props from "prop-types";
import React from "react";

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: theme.spacing(1)
  },
  cardHeaderTitle: {
    fontWeight: "bold",
    fontSize: theme.typography.subtitle1.fontSize
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  btnJoinRoom: {},
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

function ChatRoomWidget(props) {
  const classes = useStyles();
  const { title, subheader, content, image, onDelete, onJoin, participants } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia className={classes.media} image={image} title="Group image" />

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions} disableSpacing>
        <Button onClick={onJoin} className={classes.btnJoinRoom} size="small" color="primary">
          Join room
        </Button>

        <div>
          <IconButton aria-label={`${participants} participants`}>
            <Badge
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              badgeContent={participants}
              color="primary"
            >
              <PeopleIcon fontSize="large" />
            </Badge>
          </IconButton>

          {onDelete && (
            <IconButton onClick={onDelete} aria-label="delete">
              <DeleteForeverIcon fontSize="large" />
            </IconButton>
          )}
        </div>
      </CardActions>
    </Card>
  );
}
ChatRoomWidget.propTypes = {
  title: props.string.isRequired,
  subheader: props.string.isRequired,
  content: props.string,
  image: props.string,
  onDelete: props.func,
  participants: props.number.isRequired,
  onJoin: props.func
};
export default ChatRoomWidget;
