import React, { Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import {
  Toolbar,
  Typography,
  Button,
  Dialog,
  IconButton,
} from "@material-ui/core";
import logo from "../../images/navlogo.png";
import PersonIcon from "@material-ui/icons/Person";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import SyntaxChat from "../SyntaxChat/SyntaxChat";
import copy from "copy-to-clipboard";
import About from "../About/About.js";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import ParticpantsList from "../SyntaxChat/ParticipantsList";
import { CallEnd } from "@material-ui/icons";
import { Link } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Navbar = (props) => {
  const Copytext = (value) => {
    copy(value);
    setPopup(true);
  };

  const [open, setOpen] = React.useState(false);
  const [popup, setPopup] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Dialog
        fullScreen
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Toolbar
          style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}
        >
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <About />
      </Dialog>

      <AppBar position="static" style={{ backgroundColor: "#000A29" }}>
        <Toolbar>
          <img
            src={logo}
            style={{ maxWidth: "50px", maxHeight: "50px" }}
            alt="SyntaxMeets"
          />
          <Typography
            variant="h5"
            style={{ color: "white", fontFamily: "poppins", fontWeight: "800" }}
          >
            &nbsp;Syntax<span style={{ color: "#FFD500" }}>Meets</span>
          </Typography>

          <Button
            variant="contained"
            startIcon={<PersonIcon />}
            onClick={() => Copytext(`Hi there! You have been invited by ${props.name} to join SyntaxMeets. \n \nClick on this link - https://syntaxmeets.vercel.app \n \nand join the room by providing your name and Room-Id: ${props.roomId}`)}
            color="primary"
            style={{
              fontFamily: "poppins",
              marginLeft: "auto",
              fontWeight: "600",
              color: "white",
            }}
          >
            RoomId : {props.roomId}
          </Button>
          <Snackbar
            open={popup}
            autoHideDuration={2000}
            onClose={() => {
              setPopup(false);
            }}
          >
            <Alert
              onClose={() => {
                setPopup(false);
              }}
              severity="success"
              variant="filled"
            >
              Invite created ! Share with your friends and have a meet.
            </Alert>
          </Snackbar>
          <SyntaxChat
            name={props.name}
            roomId={props.roomId}
            socket={props.socket}
          />
          <ParticpantsList socket={props.socket} users={props.users} />
          <Button
            variant="contained"
            onClick={handleClickOpen}
            color="secondary"
            style={{
              fontFamily: "poppins",
              marginLeft: "15px",
              fontWeight: "600",
              color: "white",
            }}
          >
            About Us
          </Button>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              startIcon={<CallEnd />}
              style={{
                fontFamily: "poppins",
                marginLeft: "15px",
                fontWeight: "600",
                color: "white",
                backgroundColor: "#fa1e0e",
              }}
              onClick={() => {
                props.socket.disconnect();
              }}
            >
              Leave
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default Navbar;
