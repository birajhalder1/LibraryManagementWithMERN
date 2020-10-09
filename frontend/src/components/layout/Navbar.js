import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
//import Link from '@material-ui/core/Link';
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
// import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
// import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
//import SendIcon from '@material-ui/icons/Send';

// import MyRoute from "../../MyRoute";

import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import ForumIcon from "@material-ui/icons/Forum";
import PostAddIcon from "@material-ui/icons/PostAdd";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// import { red } from '@material-ui/core/colors';
import img from "../../static/images/avatar/1.jpg";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    backgroundColor: "black",
    opacity: 0.9,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    backgroundColor: "blue",
    opacity: 0.6,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "flex-end",
    // padding: theme.spacing(0, 0, 0, 0),
    textAlign: "center",
    // marginTop: 5,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  avater: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 8),
  },
  avaterText: {
    color: "white",
    padding: theme.spacing(1),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
  arrowBackIcon: {
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0.5, 4),
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  // const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        // color="secondary"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" noWrap>
            Library Management System
          </Typography> */}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        style={{ backgroundColor: "white" }}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
          //[classes.drawerBG]:open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.arrowBackIcon}>
          <ArrowBackIcon onClick={handleDrawerClose} />
        </div>

        <div className={classes.avater}>
          <Avatar alt="Remy Sharp" src={img} />
          <span className={classes.avaterText}> BIRAJ HALDER</span>
        </div>

        <Divider />
        <List>
          <Link className={classes.link} to="/dashboard">
            <ListItem button onClick={handleDrawerClose}>
              <ListItemIcon>
                <AutorenewIcon style={{ color: "#66ccff" }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>

          <Link className={classes.link} to="/createUser">
            <ListItem button onClick={handleDrawerClose}>
              <ListItemIcon>
                <AssignmentIndIcon style={{ color: "#66ff99" }} />
              </ListItemIcon>
              <ListItemText primary="User Register" />
            </ListItem>
          </Link>

          <Link className={classes.link} to="/createBook">
            <ListItem button onClick={handleDrawerClose}>
              <ListItemIcon>
                <PostAddIcon style={{ color: "#ffb399" }} />
              </ListItemIcon>
              <ListItemText primary="Create Book" />
            </ListItem>
          </Link>
        </List>

        <List>
          <Link className={classes.link} to="/allUser">
            <ListItem button onClick={handleDrawerClose}>
              <ListItemIcon>
                <RecentActorsIcon style={{ color: "#ff4000" }} />
              </ListItemIcon>
              <ListItemText primary="All User" />
            </ListItem>
          </Link>

          <Link className={classes.link} to="/allBook">
            <ListItem button onClick={handleDrawerClose}>
              <ListItemIcon>
                <PlaylistAddCheckIcon style={{ color: "green" }} />
              </ListItemIcon>
              <ListItemText primary="All Book" />
            </ListItem>
          </Link>

          <Link className={classes.link} to="/transaction">
            <ListItem button onClick={handleDrawerClose}>
              <ListItemIcon>
                <ForumIcon style={{ color: "#00b3b3" }} />
              </ListItemIcon>
              <ListItemText primary="Daily Transaction" />
            </ListItem>
          </Link>
        </List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar}>
          {/* <h1> Welcome to Library Management System </h1> */}
        </div>
      </main>
    </div>
  );
}
