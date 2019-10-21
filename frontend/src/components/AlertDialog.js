import React, { useState } from "react";
import props from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Divider from "@material-ui/core/Divider";
import { Typography } from "@material-ui/core";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";

export const INFORMATION_ALERT = 1;
export const ERROR_ALERT = 2;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog(props) {
  const { show, title, text, type, onClose } = props;
  const [open, setOpen] = useState(show);

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Typography style={{ display: "flex", alignItems:'center' }} component="p">
            {type === INFORMATION_ALERT && <InfoOutlinedIcon  fontSize="large" color="primary" />}
            {type === ERROR_ALERT && <ErrorOutlineOutlinedIcon fontSize="large" color="error" />}
            {text}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AlertDialog.propTypes = {
  title: props.string,
  text: props.string,
  type: props.number,
  show: props.bool,
  onClose: props.func
};
